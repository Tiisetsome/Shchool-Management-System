<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    include_once '../../config/Database.php';
    include_once '../../models/Login.class.php';

    // Get the raw data
    $data = json_decode(file_get_contents("php://input"));

    // Sanitize inputs
    function sanitizeData($input) {
        return htmlspecialchars(strip_tags($input));
    }

    // Check Empty fields
    function isEmpty($input){
        if(empty($input)){
            echo json_encode(
                array(
                    "errorMsg" => "Fill all inputs"
                )
            );
            die();
        }
    }

    // Check Correct id format
    function checkId($input){

        $output = preg_match('/^[0-9]+$/', $input);
        if(!$output){
            echo json_encode(
                array(
                    "errorMsg" => "ID can only contain numbers"
                )
            );
            die();
        }

        return null;
    }

    if($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($data->person_id)){

        // Clean and store data
        $person_id = sanitizeData($data->person_id);
        $pwd = strval(sanitizeData($data->pwd));

        // Check empty inputs
        isEmpty($person_id);
        isEmpty($pwd);

        // Check person id
        checkId($person_id);

        /* Check person existance from DB
           1 Create database instance 
        */
        $database = new Database();
        $db = $database->connection();

        /* 2 Create login instance */
        $login_person = new Login($db);

        echo $login_person->check_person($person_id, $pwd);
    }
