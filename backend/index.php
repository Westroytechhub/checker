<?php
// Backend API Entry Point

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Load environment variables
if (file_exists(__DIR__ . '/config/.env')) {
    $env = parse_ini_file(__DIR__ . '/config/.env');
    foreach ($env as $key => $value) {
        putenv("$key=$value");
    }
}

// Database connection
try {
    $db = new PDO(
        'mysql:host=' . getenv('DB_HOST') . ';dbname=' . getenv('DB_NAME'),
        getenv('DB_USER'),
        getenv('DB_PASSWORD')
    );
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}

// Route the request
$request_uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$request_method = $_SERVER['REQUEST_METHOD'];
$request_data = json_decode(file_get_contents('php://input'), true);

// Remove base path
$base = '/api';
if (strpos($request_uri, $base) === 0) {
    $request_uri = substr($request_uri, strlen($base));
}

// Route handling
$routes = [
    // Products
    'GET:/products' => 'api/products/index.php',
    'GET:/products/([0-9]+)' => 'api/products/show.php',
    'POST:/products' => 'api/products/store.php',
    'PUT:/products/([0-9]+)' => 'api/products/update.php',
    'GET:/products/([0-9]+)/pricing' => 'api/products/pricing.php',

    // Orders
    'POST:/orders' => 'api/orders/create.php',
    'GET:/orders/([a-zA-Z0-9]+)' => 'api/orders/show.php',

    // Payments
    'POST:/payments/initiate' => 'api/payments/initiate.php',
    'GET:/payments/([0-9]+)/verify' => 'api/payments/verify.php',
    'GET:/payments/status/([a-zA-Z0-9]+)' => 'api/payments/status.php',

    // Results
    'POST:/results/check' => 'api/results/check.php',
    'GET:/results/([0-9]+)' => 'api/results/show.php',
    'POST:/results/bulk-check' => 'api/results/bulk-check.php',
];

$matched = false;
foreach ($routes as $route => $file) {
    list($method, $path) = explode(':', $route);
    
    if ($request_method === $method && preg_match('#^' . $path . '$#', $request_uri, $matches)) {
        $matched = true;
        $route_params = array_slice($matches, 1);
        require $file;
        break;
    }
}

if (!$matched) {
    http_response_code(404);
    echo json_encode(['error' => 'Endpoint not found']);
}
?>
