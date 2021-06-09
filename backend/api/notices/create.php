<?php

    //Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once '../../config/Database.php';
    include_once '../../models/Notices.php';

    // Instantiate DB & connect;
    $database = new Database();
    $db = $database->connection();

    // Instantiate notice
    $notice = new Notices($db);

    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    // Assign properties
    $notice->teacher_id = $data->teacher_id;
    $notice->message = $data->message;

    // Add notice query
    if($notice->add_notice()){
        echo json_encode(
            array(
                'message' => 'New Notice Added',
                'status' => true
            )
        );
    }else{
        echo json_encode(
            array(
                'message' => 'Something Went Wrong, Notice Not Added',
            )
        );
    }
  