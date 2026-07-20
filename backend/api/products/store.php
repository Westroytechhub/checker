<?php
// Create a new product (admin only)
header('Content-Type: application/json');
require_once __DIR__ . '/../../helpers/functions.php';

if ($request_method !== 'POST') {
    error('Method not allowed', 405);
}

$required = ['name', 'description', 'category', 'quantity_min', 'quantity_max'];
if (!validate_input($request_data, $required)) {
    error('Missing required fields', 400);
}

try {
    $stmt = $db->prepare("
        INSERT INTO products (name, description, category, quantity_min, quantity_max)
        VALUES (?, ?, ?, ?, ?)
    ");
    
    $stmt->execute([
        $request_data['name'],
        $request_data['description'],
        $request_data['category'],
        $request_data['quantity_min'],
        $request_data['quantity_max']
    ]);
    
    $product_id = $db->lastInsertId();
    
    success(['id' => $product_id], 'Product created successfully');
} catch (Exception $e) {
    error('Failed to create product', 500);
}
?>