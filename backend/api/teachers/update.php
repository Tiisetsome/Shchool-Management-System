<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Teachers.php';

// Instantiate DB & connect;
$database = new Database();
$db = $database->connection();

// Instantiate teachers
$teacher = new Teachers($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

// Set id to update
$teacher->id = $data->id;

// Assign properties
$teacher->fname = $data->fname;
$teacher->lname = $data->lname;
$teacher->gender = $data->gender;
$teacher->age = $data->age;
$teacher->classes = $data->classes;
$teacher->subjects = $data->subjects;
$teacher->sections = $data->sections;
$teacher->address = $data->address;
$teacher->email = $data->email;
$teacher->phone = $data->phone;
$teacher->role = $data->role;
$teacher->subjects = $data->subjects;
//  Update student
if($teacher->update_teacher()){
    echo json_encode(
        array('message' => 'Teacher Info Updated')
    );
}else{
    echo json_encode(
        array('message' => 'Something went wrong, data not updated')
    );
}