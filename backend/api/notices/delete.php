<?php

    //Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Get raw posted data
    $data = json_decode(file_get_contents("php://input"));

    if($_SERVER['REQUEST_METHOD'] == 'PUT' && !empty($data->id)){

        // Required files
        include_once '../../config/Database.php';
        include_once '../../models/Notices.php';

        // Instantiate DB & connect;
        $database = new Database();
        $db = $database->connection();

        // Instantiate notice
        $notice = new Notices($db);

        // Set id property
        $notice->id = $data->id;

        // Delete notice query
        if($notice->delete_notice()){
            echo json_encode(
                array(
                    'message' => 'Notice deleted',
                    'deleted' => true
                )
                );
        }else{
            echo json_encode(
                array(
                    'message' => 'Something went wrong, Notice not deleted',
                    'deleted' => false
                )
            );
        }
    }