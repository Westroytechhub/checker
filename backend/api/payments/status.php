<?php
// Get payment status by transaction ID
header('Content-Type: application/json');
require_once __DIR__ . '/../../helpers/functions.php';

$transaction_id = $route_params[0] ?? null;

if (!$transaction_id) {
    error('Transaction ID required', 400);
}

try {
    $stmt = $db->prepare("
        SELECT id, order_id, amount, status, payment_method, phone_number, transaction_id
        FROM payments
        WHERE transaction_id = ?
    ");
    $stmt->execute([$transaction_id]);
    $payment = $stmt->fetch(PDO::FETCH_ASSOC);
    
    if (!$payment) {
        error('Payment not found', 404);
    }
    
    success($payment, 'Payment status retrieved');
} catch (Exception $e) {
    error('Failed to retrieve payment status', 500);
}
?>