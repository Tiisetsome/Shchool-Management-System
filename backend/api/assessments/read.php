<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Assessments.php';

    // Instatiate database and connect
    $database = new Database();
    $db = $database->connection();

    // Instatiate tests
    $assessments = new Assessments($db);

    // Tests read query
    $results = $assessments->get_assessments();

    // Get rows
    $num = $results->rowCount();

    // Check if tests exist
    if($num > 0){

        // Create tests array
        $assessment_arr = array();
        $assessment_arr['data'] = array();

        while($row = $results->fetch(PDO::FETCH_ASSOC)){
            
            // Extracts rows
            extract($row);

            // Create test item
            $assessment_item = array(
                'id' => $id,
                'student_id' => $student_id,
                'privilege_id' => $privilege_id,
                'assessment_status' => $assessment_status === "1" ? true : false,
                'grade' => $grade,
                'subject' => $subject,
                'duration' => $duration,
                'sub_date' => $sub_date,
                'assessment' => json_decode(stripslashes($assessment)),
            );

            // Add test to "data"
            array_push($assessment_arr['data'], $assessment_item);
        }

        // Convert tests array into JSON and output results
        echo json_encode($assessment_arr);
    } else{
        echo json_encode(
            array('message' => 'No assessment found')
        );
    }