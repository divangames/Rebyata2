<?php
/**
 * Заявки «Свои ребята» в Telegram.
 * POST multipart: text (HTML), photos[] (до 4 файлов, JPG/PNG/WEBP/HEIC, до 10 МБ).
 * Текст и фото уходят одним сообщением (sendPhoto / sendMediaGroup).
 */
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['ok' => false, 'error' => 'Method not allowed']);
    exit;
}

$configPath = __DIR__ . '/config.php';
if (!is_file($configPath)) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'config.php not found']);
    exit;
}

$config = require $configPath;
$token  = trim($config['bot_token'] ?? '');
$chatId = trim($config['chat_id'] ?? '');

if ($token === '' || $chatId === '') {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => 'Telegram not configured']);
    exit;
}

require_once __DIR__ . '/smartcaptcha.php';
requireSmartCaptcha($config);

$text = trim($_POST['text'] ?? '');
if ($text === '') {
    http_response_code(400);
    echo json_encode(['ok' => false, 'error' => 'Empty message']);
    exit;
}

////////////////////////////////////////////////////////
//
// Telegram Bot API
//
////////////////////////////////////////////////////////

/** Отправляет запрос в Telegram Bot API. */
function tgRequest(string $token, string $method, array $payload): array
{
    $url = 'https://api.telegram.org/bot' . $token . '/' . $method;
    $ch  = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_POST           => true,
        CURLOPT_POSTFIELDS     => $payload,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 60,
    ]);
    $response = curl_exec($ch);
    $code     = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($response === false || $code < 200 || $code >= 300) {
        return ['ok' => false];
    }

    $result = json_decode($response, true);
    return is_array($result) ? $result : ['ok' => false];
}

/** Проверяет загруженное фото: тип, размер, ошибка загрузки. */
function isAllowedPhoto(array $file): bool
{
    if (($file['error'] ?? UPLOAD_ERR_NO_FILE) !== UPLOAD_ERR_OK) {
        return false;
    }
    if (($file['size'] ?? 0) > 10 * 1024 * 1024) {
        return false;
    }

    $allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];
    $mime    = mime_content_type($file['tmp_name']);
    if ($mime && in_array($mime, $allowed, true)) {
        return true;
    }

    $ext = strtolower(pathinfo($file['name'] ?? '', PATHINFO_EXTENSION));
    return in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'heic', 'heif'], true);
}

/** Собирает валидные фото из multipart photos[]. */
function collectPhotos(): array
{
    $uploads = $_FILES['photos'] ?? null;
    if (!is_array($uploads) || !isset($uploads['name']) || !is_array($uploads['name'])) {
        return [];
    }

    $photos = [];
    $count  = min(count($uploads['name']), 4);
    for ($i = 0; $i < $count; $i++) {
        $file = [
            'name'     => $uploads['name'][$i] ?? '',
            'type'     => $uploads['type'][$i] ?? '',
            'tmp_name' => $uploads['tmp_name'][$i] ?? '',
            'error'    => $uploads['error'][$i] ?? UPLOAD_ERR_NO_FILE,
            'size'     => $uploads['size'][$i] ?? 0,
        ];
        if (isAllowedPhoto($file)) {
            $photos[] = $file;
        }
    }

    return $photos;
}

/** Caption для фото: не длиннее лимита Telegram. */
function clipCaption(string $text): string
{
    if (mb_strlen($text) <= 1024) {
        return $text;
    }
    return mb_substr($text, 0, 1021) . '…';
}

$photos  = collectPhotos();
$caption = clipCaption($text);

if (count($photos) === 0) {
    $result = tgRequest($token, 'sendMessage', [
        'chat_id'                  => $chatId,
        'text'                     => $text,
        'parse_mode'               => 'HTML',
        'disable_web_page_preview' => true,
    ]);
} elseif (count($photos) === 1) {
    $file   = $photos[0];
    $result = tgRequest($token, 'sendPhoto', [
        'chat_id'    => $chatId,
        'photo'      => new CURLFile(
            $file['tmp_name'],
            $file['type'] ?: 'application/octet-stream',
            $file['name'] ?: 'photo.jpg'
        ),
        'caption'    => $caption,
        'parse_mode' => 'HTML',
    ]);
} else {
    // Несколько фото — одна медиагруппа, текст в caption первого кадра
    $media   = [];
    $payload = ['chat_id' => $chatId];

    foreach ($photos as $index => $file) {
        $attachName = 'photo' . $index;
        $item       = [
            'type'  => 'photo',
            'media' => 'attach://' . $attachName,
        ];
        if ($index === 0) {
            $item['caption']    = $caption;
            $item['parse_mode'] = 'HTML';
        }
        $media[] = $item;
        $payload[$attachName] = new CURLFile(
            $file['tmp_name'],
            $file['type'] ?: 'application/octet-stream',
            $file['name'] ?: ($attachName . '.jpg')
        );
    }

    $payload['media'] = json_encode($media, JSON_UNESCAPED_UNICODE);
    $result           = tgRequest($token, 'sendMediaGroup', $payload);
}

if (empty($result['ok'])) {
    http_response_code(502);
    echo json_encode(['ok' => false, 'error' => 'Telegram send error']);
    exit;
}

echo json_encode(['ok' => true]);
