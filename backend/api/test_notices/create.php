<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: POST');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Include required files
    include_once '../../Database.php';
    include_once '../../TestNotices';

    // Get raw posted data
    $data = json_decode(file_get_contents('php://input'));
    
    // Instantiate database connection
    $database = new Database();
    $db = $database->connection();

    // Instantiate test notice
    $test_notice = new TestNotices($db);

    // Set test notices properties
    $test_notice->person_id = $data->person_id;
    $test_notice->fname = $data->fname;
    $test_notice->lname = $data->lname;
    $test_notice->subject = $data->subject;
    $test_notice->message = $data->message;
    $test_notice->test_date = $data->test_date;
    $test_notice->grade = $data->grade;

    if($test_notice->add_test_notice()){
        echo json_encode(
            array("message" => "New test notice added")
        );
    }else{
        echo json_encode(
            array("message" => "Something went wrong, test notice not added")
        );
    }


