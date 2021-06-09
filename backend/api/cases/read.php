<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Cases.php';

    // Instantiate database and connect
    $database = new Database();
    $db = $database->connection();

    // Instantiate cases
    $cases = new Cases($db);

    // Cases read query
    $results = $cases->get_cases();

    // Get row count
    $num = $results->rowCount();

    // Check if cases exist
    if($num > 0){

        // Cases array
        $cases_arr = array();
        $cases_arr['data'] = array();

        // Get all rows
        $row = $results->fetchAll(PDO::FETCH_ASSOC);

        // Create case item
        foreach($row as $case){
            $case_item = array(
                'id' => $case['id'],
                'fname' => $case['fname'],
                'lname' => $case['lname'],
                'grade' => $case['grade'],
                'message' => $case['message'],
                'student_id' => $case['student_id'],
                'created_at' => $case['created_at'],
            );

            // Push case into "data"
            array_push($cases_arr['data'], $case_item);
        }

        //Conver cases array into JSON and output results
        echo json_encode($cases_arr);

    }else{
        echo json_encode(
            array('message' => 'No cases found')
        );
    }