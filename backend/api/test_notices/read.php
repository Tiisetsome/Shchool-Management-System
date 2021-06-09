<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // Include required files
    include_once '../../config/Database.php';
    include_once '../../models/TestNotices.php';

    // Create database instance
    $database = new Database();
    $db = $database->connection();

    // Create test notice instance
    $test_notices = new TestNotices($db);

    // Test notices read query
    $results = $test_notices->get_test_notices();

    // Get row count
    $num = $results->rowCount();

    // Check if there are any test notices
    if($num > 0){
        // Test notices array
        $test_notices_arr = array();
        $test_notices_arr['data'] = array();
        
        while($row = $results->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            // Test Notice
            $test_notice = array(
                'id' => $id,
                'person_id' => $person_id,
                'fname' => $fname,
                'lname' => $lname,
                'subject' => $subject,
                'message' => $message,
                'test_date' => $test_date,
                'grade' => $grade,
                'created_at' => $created_at
            );

            // Push test notice into data
            array_push($test_notices_arr['data'], $test_notice);
        }

        // Convert array to JSON and ouput results
        echo json_encode($test_notices_arr);
    }else{
        echo json_encode(
            array(
                'message' => 'No Test Notices'
            )
        );
    }
