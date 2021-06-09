<?php

    // Headers 
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Get posted raw data
    $data = json_decode(file_get_contents("php://input"));

    if($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($data->student_id)){

        // Include required files
        include_once '../../../config/Database.php';
        include_once '../../../models/MissedTest.php';


        // Create database instance
        $database = new Database();
        $db = $database->connection();

        // Create missed test instance
        $missed_test = new MissedTest($db);

        // Set missed test properties
        $missed_test->student_id = $data->student_id;
        $missed_test->grade = $data->grade;
        $missed_test->subject = $data->subject;
        $missed_test->reason = $data->reason;

        // Add new missed test
        if($missed_test->add_missed_test()){
            echo json_encode(
                array(
                    "message" => "Missed test added",
                    "status" => true
                )
            );
        }else {
            echo json_encode(
                array(
                    "message" => "Something went wrong, missed test not added",
                    "status" => false
                )
            );
        }
    }