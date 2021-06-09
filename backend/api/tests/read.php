<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Tests.php';

    // Instatiate database and connect
    $database = new Database();
    $db = $database->connection();

    // Instatiate tests
    $tests = new Tests($db);

    // Tests read query
    $results = $tests->get_tests();

    // Get rows
    $num = $results->rowCount();

    // Check if tests exist
    if($num > 0){

        // Create tests array
        $tests_arr = array();
        $tests_arr['data'] = array();

        while($row = $results->fetch(PDO::FETCH_ASSOC)){
            
            // Extracts rows
            extract($row);

            // Create test item
            $test_item = array(
                'id' => $id,
                'test_date' => $test_date,
                'grade' => $grade,
                'section' => $section,
                'type' => $type,
                'subject' => $subject,
                'created_at' => $created_at,
            );

            // Add test to "data"
            array_push($tests_arr['data'], $test_item);
        }

        // Convert tests array into JSON and output results
        echo json_encode($tests_arr);
    } else{
        echo json_encode(
            array('message' => 'No tests found')
        );
    }