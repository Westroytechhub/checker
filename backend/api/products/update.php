<?php
// Update a product (admin only)
header('Content-Type: application/json');
require_once __DIR__ . '/../../helpers/functions.php';

if ($request_method !== 'PUT') {
    error('Method not allowed', 405);
}

$product_id = $route_params[0] ?? null;
if (!$product_id) {
    error('Product ID required', 400);
}

try {
    $updates = [];
    $values = [];
    
    if (isset($request_data['name'])) {
        $updates[] = 'name = ?';
        $values[] = $request_data['name'];
    }
    if (isset($request_data['description'])) {
        $updates[] = 'description = ?';
        $values[] = $request_data['description'];
    }
    if (isset($request_data['is_active'])) {
        $updates[] = 'is_active = ?';
        $values[] = $request_data['is_active'];
    }
    
    if (empty($updates)) {
        error('No fields to update', 400);
    }
    
    $values[] = $product_id;
    
    $stmt = $db->prepare('UPDATE products SET ' . implode(', ', $updates) . ' WHERE id = ?');
    $stmt->execute($values);
    
    success([], 'Product updated successfully');
} catch (Exception $e) {
    error('Failed to update product', 500);
}
?>