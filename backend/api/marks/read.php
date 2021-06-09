<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Marks.php';

    // Instantiate database and connect
    $database = new Database();
    $db = $database->connection();

    // Instantiate marks
    $marks = new Marks($db);

    // Marks read query
    $result = $marks->get_student_marks();

    // Get row count
    $num = $result->rowCount();

    // Check if marks exist
    if($num > 0){

        // Create marks array
        $student_marks_arr = array();
        $student_marks_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){

            // Extract keys
            extract($row);

            // Create marks item
            $marks_arr = array(
                "id" => $id,
                "type" => $type,
                "score" => $score,
                "subject" => $subject,
                "student_id" => $student_id,
                "created_at" => $created_at
            );

            // Push marks item into "data"
            array_push($student_marks_arr['data'], $marks_arr);
        }

        //Conver student marks array into JSON and output results
        echo json_encode($student_marks_arr);

    } else{
        echo json_encode(
            array(
                'message' => 'No marks found'
            )
            );
    }