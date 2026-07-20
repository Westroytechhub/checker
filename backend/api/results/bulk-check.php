<?php
// Bulk check results for multiple index numbers
header('Content-Type: application/json');
require_once __DIR__ . '/../../helpers/functions.php';

if ($request_method !== 'POST') {
    error('Method not allowed', 405);
}

if (empty($request_data['index_numbers']) || !is_array($request_data['index_numbers'])) {
    error('Array of index numbers required', 400);
}

try {
    $results = [];
    
    foreach ($request_data['index_numbers'] as $index_number) {
        $stmt = $db->prepare("
            SELECT id, student_name, index_number, exam_type, exam_year, result_data
            FROM results
            WHERE index_number = ?
            ORDER BY created_at DESC
            LIMIT 1
        ");
        $stmt->execute([$index_number]);
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($result) {
            if ($result['result_data']) {
                $result['result_data'] = json_decode($result['result_data'], true);
            }
            $results[] = $result;
        }
    }
    
    success($results, 'Results retrieved successfully');
} catch (Exception $e) {
    error('Failed to retrieve results: ' . $e->getMessage(), 500);
}
?>