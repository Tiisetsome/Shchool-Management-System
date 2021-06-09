<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Get the raw data
    $data = json_decode(file_get_contents('php://input'));

    if($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($data->teacher_id)){

        // Include required files
        include_once '../../config/Database.php';
        include_once '../../models/Events.php';

        // Create database instance
        $database = new Database();
        $db = $database->connection();

        // Create add event instance
        $add_event = new Events($db);
        

        // Set event properties
        $add_event->teacher_id = $data->teacher_id;
        $add_event->title = $data->title;
        $add_event->start_date = $data->startTime;
        $add_event->end_date = $data->endTime;
        $add_event->message = $data->message;

        if($add_event->add_event()){
            echo json_encode(
                array(
                    'message' => 'New event has been added',
                    'status' => true
                )
            );
        }else{
            echo json_encode(
                array(
                    'message' => 'Something went wrong, event not added',
                    'status' => false
                )
            );
        }
    }