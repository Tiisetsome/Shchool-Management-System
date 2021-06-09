<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Teachers.php';

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

if($_SERVER['REQUEST_METHOD'] == 'PUT' && !empty($data->id)){
    // Instantiate DB & connect;
    $database = new Database();
    $db = $database->connection();

    // Instantiate Teacher
    $teacher = new Teachers($db);

    // Set id to delete
    $teacher->id = $data->id;

    //  delete teacher
    if($teacher->delete_teacher()){
        echo json_encode(
            array('message' => 'Teacher Removed From The Database')
        );
    }else{
        echo json_encode(
            array('message' => 'Something Went Wrong, Teacher Not Removed!')
        );
    }
}

