<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // Include required files
    require_once '../../../config/Database.php';
    require_once '../../../models/MissedTest.php';

    // Create database instance
    $database = new Database();
    $db = $database->connection();

    // Create missed tests instance
    $missedTests = new MissedTest($db);

    // Set student id
    $missedTests->student_id = isset($_GET['id']) ? $_GET['id'] : exit();

    // Missed test read query
    $results = $missedTests->get_missed_tests();

    // Get row count
    $num = $results->rowCount();

    // Check if there are any missed tests
    if($num > 0){
        // Create missed tests array
        $missed_tests_arr = array();
        $missed_tests_arr['data'] = array();

        while($row = $results->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            // Create missed test item
            $missed_test = array(
                'id' => $id,
                'student_id' => $student_id,
                'grade' => $grade,
                'subject' => $subject,
                'reason' => $reason,
                'created_at' => $created_at,
            );

            // Add missed test item into missed tests array
            array_push($missed_tests_arr['data'], $missed_test);
        }

        // Convert array into JSON and output results
        echo json_encode($missed_tests_arr);

    }else {
        echo json_encode(
            array("message" => "There are no missed tests")
        );
    }