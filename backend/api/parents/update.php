<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Parents.php';

// Instantiate DB & connect;
$database = new Database();
$db = $database->connection();

// Instantiate Parents
$update_parent = new Parents($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

// Set id to update
$update_parent->id = $data->id;

// Assign properties
$update_parent->fname = $data->fname;
$update_parent->lname = $data->lname;
$update_parent->gender = $data->gender;
$update_parent->age = $data->age;
$update_parent->address = $data->address;
$update_parent->email = $data->email;
$update_parent->classes = $data->classes;

//  Update student
if($update_parent->update_parent()){
    echo json_encode(
        array('message' => 'Parent Info Updated')
    );
}else{
    echo json_encode(
        array('message' => 'Something went wrong, data not updated')
    );
}