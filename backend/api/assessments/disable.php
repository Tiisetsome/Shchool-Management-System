<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Get raw data
    $data = json_decode(file_get_contents("php://input"));

    if($_SERVER['REQUEST_METHOD'] == 'PUT' && !empty($data->privilege_id)){

        // Include required files
        include_once '../../config/Database.php';
        include_once '../../models/Assessments.php';

        // Create database instance
        $database = new Database();
        $db = $database->connection();

        // Create privilege instance
        $disable_privilege = new Assessments($db);

        // Set privilege properties
        $disable_privilege->student_id = $data->student_id;
        $disable_privilege->privilege_id = $data->privilege_id;
        
        // Update privilege
        if($disable_privilege->update_privileges()){
            echo json_encode(
                array(
                    "message" => "Privilege updated",
                )
            );
        }else{
            echo json_encode(
                array(
                    "message" => "Something went wrong, privilege not added",
                )
            );
        }
    }
