<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

if($_SERVER['REQUEST_METHOD'] == 'POST' && !empty($data->fname)){
    include_once '../../config/Database.php';
    include_once '../../models/Parents.php';

    // Instantiate DB & connect;
    $database = new Database();
    $db = $database->connection();

    // Instantiate Parents
    $new_parent = new Parents($db);

    // Assign properties
    $new_parent->fname = $data->fname;
    $new_parent->lname = $data->lname;
    $new_parent->gender = $data->gender;
    $new_parent->age = $data->age;
    $new_parent->address = $data->address;
    $new_parent->email = $data->email;
    $new_parent->classes = $data->classes;

    //  Add new student
    if($new_parent->add_parent()){
        echo json_encode(
           array(
               'message' => 'New parent added',
               'status' => true
           )
        );
    }else{
        echo json_encode(
            array(
                'message' => 'Something went wrong, parent not added',
                'status' => false
            )
        );
    }
}