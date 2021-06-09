<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Get raw data
    $data = json_decode(file_get_contents("php://input"));

    if($_SERVER['REQUEST_METHOD'] === 'PUT' && !empty($data->student_id)){

        // Include required files
        include_once '../../../config/Database.php';
        include_once '../../../models/Students.php';

        // Create database instance
        $database = new Database();
        $db = $database->connection();

        // Create student instance
        $student = new Students($db);

        // Set student properties
        $student->student_id = $data->student_id;

        if($student->promote_student($data->grade)){
            echo json_encode(
                array(
                    "message" => "Student promoted successfully",
                    "updated" => true
                    )
            );
        }else{
            echo json_encode(
                array(
                    "msessage" => "Something went wrong, student not promoted",
                    "updated" => false
                    )
            );
        }
    }