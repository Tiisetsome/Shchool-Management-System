<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');


// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

if($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($data->grade)){
    
    include_once '../../config/Database.php';
    include_once '../../models/Tests.php';

    // Instantiate DB & connect;
    $database = new Database();
    $db = $database->connection();

    // Instantiate test
    $new_test = new Tests($db);

    // Set test properties
    $new_test->test_date = $data->test_date;
    $new_test->grade = $data->grade;
    $new_test->section = $data->section;
    $new_test->type = $data->type;
    $new_test->subject = $data->subject;

    // Add new test
    if($new_test->add_test()){
        echo json_encode(array(
            'message' => 'New test notice added',
            'status' => true
        ));
    }else{
        echo json_encode(array(
            'message' => 'Something went wrong, test notice not added'
        ));
    }
}