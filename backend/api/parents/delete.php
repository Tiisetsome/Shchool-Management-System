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

// Instantiate Parent
$delete_parent = new Parents($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

// Set id to delete
$delete_parent->id = $data->id;

//  delete student
if($delete_parent->delete_parent()){
    echo json_encode(
        array('message' => 'Parent Removed From The Database')
    );
}else{
    echo json_encode(
        array('message' => 'Something Went Wrong, Parent Not Removed!')
    );
}