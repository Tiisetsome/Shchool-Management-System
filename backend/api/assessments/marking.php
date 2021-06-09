<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Get raw data
    $data = json_decode(file_get_contents("php://input"));

    if($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($data->myAnswers)){

        // Include required files
        include_once '../../config/Database.php';
        include_once '../../models/Assessments.php';

        // Create database instance
        $database = new Database();
        $db = $database->connection();

        // Create student case instance
        $marking = new Assessments($db);

        // Set student case properties
        $marking->id = $data->id;
        $marking->myAnswers = $data->myAnswers;
        
        $results = $marking->mark_assessment();
        echo json_encode(array(
            "assessement_id" => $marking->id,
            "student_score" => $results,
            "marked" => true
        ));
        // Add student case
        // if($assessment->add_assessment()){
        //     echo json_encode(
        //         array(
        //             "message" => "New assessment has been added",
        //             "status" => true
        //         )
        //     );
        // }else{
        //     echo json_encode(
        //         array(
        //             "message" => "Something went wrong, assessment not added",
        //             "status" => false,
        //         )
        //         );
        // }
    }
