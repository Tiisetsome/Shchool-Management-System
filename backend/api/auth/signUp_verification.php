<?php

     // Headers
     header('Access-Control-Allow-Origin: *');
     header('Content-Type: application/json');
     header('Access-Control-Allow-Methods: POST');
     header('Access-Control-Allow-Headers: Access-Control-Allow-Origin, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Required files
    include_once '../../config/Database.php';
    include_once '../../models/Login.class.php';

    // Get raw data
    $data = json_decode(file_get_contents("php://input"));

    // Sanitize inputs
    function sanitizeData($input) {
        return htmlspecialchars(strip_tags($input));
    }

    // Check Empty fields
    function isFieldInputEmpty($input){
        if(empty($input)){
            echo json_encode(
                array(
                    "errorMsg" => "Fill in all inputs"
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

    // Determine person role
    function checkRole($personID) {
        // Get the first value from the id
        $compareChar = substr($personID, 0, 1);

        switch($compareChar){
            case "2":
                return "student";
            case "3":
                return "teacher";
            case "5":
                return "parent";
            default:
            // NB YOU NEED TO STOP THE SCRIPT IF ID FORMAT DOES NOT MATCH
                return "none";
        }
    }

    if($_SERVER['REQUEST_METHOD'] === 'POST'){

        // Clean and store data
        $person_id = sanitizeData($data->person_id);

        // Check empty inputs
        isFieldInputEmpty($person_id);

        // Check correct id format
        checkId($person_id);

        // Check person role
        $person_role = checkRole($person_id);

        // Create database instance
        $database = new Database();
        $db = $database->connection();

        // Create person instance
        $person = new Login($db);

        // Get person email
        $email = $person->get_single_person($person_role, $person_id);

        // Generate number token
        $tokenID = rand(1000, 5000);
        //echo $tokenID;

        // NB: YOU NEED TO ADD TOKEN AND EMAIL INTO THE DATABASE LATER
        if($person->add_token($person_id, $tokenID)){
            // Send mail
            require_once '../index.php';
            //$tokenID = rand(1000, 5000);
        } else{
            echo json_encode(
                array("errorMsg" => "token does not exists")
            );
        }

    }
