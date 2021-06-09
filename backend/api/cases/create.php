<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Get raw data
    $data = json_decode(file_get_contents("php://input"));

    if($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($data->student_id)){

        // Include required files
        include_once '../../config/Database.php';
        include_once '../../models/Cases.php';

        // Create database instance
        $database = new Database();
        $db = $database->connection();

        // Create student case instance
        $student_case = new Cases($db);

        // Set student case properties
        $student_case->student_id = $data->student_id;
        $student_case->message = $data->message;

        // Add student case
        if($student_case->add_case()){
            echo json_encode(
                array(
                    "message" => "New case has been added",
                    "status" => true
                )
            );
        }else{
            echo json_encode(
                array(
                    "message" => "Something went wrong, case not added",
                    "status" => false,
                )
                );
        }
    }
