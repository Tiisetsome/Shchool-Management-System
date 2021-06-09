<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Get raw data
    $data = json_decode(file_get_contents("php://input"));

    if($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($data->grade)){

        // Include required files
        include_once '../../config/Database.php';
        include_once '../../models/Assessments.php';

        // Create database instance
        $database = new Database();
        $db = $database->connection();

        // Create student case instance
        $assessment = new Assessments($db);

        // Set student case properties
        $assessment->grade = $data->grade;
        $assessment->subject = $data->subject;
        $assessment->duration = $data->duration;
        $assessment->sub_date = strtotime(date($data->sub_date));
        $assessment->questions = '{"test":' . json_encode($data->assessmentData) . '}';
        $assessment->correct_answers = '{"answers":' . json_encode($data->finalCorrectAns) . '}';

        // Add student case
        if($assessment->add_assessment()){
            echo json_encode(
                array(
                    "message" => "New assessment has been added",
                    "status" => true
                )
            );
        }else{
            echo json_encode(
                array(
                    "message" => "Something went wrong, assessment not added",
                    "status" => false,
                )
                );
        }
    }
