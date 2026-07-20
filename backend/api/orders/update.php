<?php
// Update order status (admin only)
header('Content-Type: application/json');
require_once __DIR__ . '/../../helpers/functions.php';

if ($request_method !== 'PUT') {
    error('Method not allowed', 405);
}

$order_id = $route_params[0] ?? null;
if (!$order_id) {
    error('Order ID required', 400);
}

if (empty($request_data['status'])) {
    error('Status required', 400);
}

$valid_statuses = ['pending', 'paid', 'completed', 'cancelled'];
if (!in_array($request_data['status'], $valid_statuses)) {
    error('Invalid status', 400);
}

try {
    $stmt = $db->prepare('UPDATE orders SET status = ? WHERE id = ?');
    $stmt->execute([$request_data['status'], $order_id]);
    
    log_action('ORDER_STATUS_UPDATED', ['order_id' => $order_id, 'status' => $request_data['status']]);
    
    success([], 'Order status updated successfully');
} catch (Exception $e) {
    error('Failed to update order', 500);
}
?>