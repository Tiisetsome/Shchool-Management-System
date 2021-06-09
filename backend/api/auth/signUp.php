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
                    "errorMsg" => "Fill in all inputs"
                )
            );
            die();
        }
    }

    // Check Correct number format
    function checkValidNumber($input){
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

    // Check pwds match
    function checkPwd($pwd, $pwd_confirm){
        if($pwd !== $pwd_confirm){
            echo json_encode(
                array(
                    "errorMsg" => "Password does not match"
                )
            );
            die();
        }
        return null;
    }

    if($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($data->person_id)){

        // Clean and store data
        $person_id = sanitizeData($data->person_id);
        $otp_code = sanitizeData($data->otp_code);
        $pwd = sanitizeData($data->pwd);
        $pwd_confirm = sanitizeData($data->pwd_confirm);

        // Check empty inputs
        isEmpty($person_id);
        isEmpty($otp_code);
        isEmpty($pwd);
        isEmpty($pwd_confirm);

        // Check if person id and otp code contains numbers only
        checkValidNumber($person_id);
        checkValidNumber($otp_code);

        // Check if pwds match
        checkPwd($pwd, $pwd_confirm);

        // Create or update person credentials
        $database = new Database();
        $db = $database->connection();

        $signup_person = new Login($db);

        if($signup_person->update_credentials($person_id, $pwd_confirm, $otp_code)){
            echo json_encode(
                array(
                    "message" => "Password updated",
                    "updated" => true
                )
            );
        } else{
            echo json_encode(
                array(
                    "message" => "Something went wrong, resend id to get new OTP",
                    "updated" => false
                )
            );
        }
    }
