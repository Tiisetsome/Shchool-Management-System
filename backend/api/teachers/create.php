<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

  // Get raw posted data
$data = json_decode(file_get_contents("php://input"));

if(isset($_SERVER['REQUEST_METHOD']) == 'POST' && !empty($data->fname)){

    include_once '../../config/Database.php';
    include_once '../../models/Teachers.php';

    // Instantiate DB & connect;
    $database = new Database();
    $db = $database->connection();

    // Instantiate teacher
    $new_teacher = new Teachers($db);

    $new_teacher->fname = $data->fname;
    $new_teacher->lname = $data->lname;
    $new_teacher->gender = $data->gender;
    $new_teacher->age = $data->age;
    $new_teacher->classes = $data->classes;
    $new_teacher->subjects = $data->subjects;
    $new_teacher->sections = $data->sections;
    $new_teacher->address = $data->address;
    $new_teacher->email = $data->email;
    $new_teacher->phone = $data->phone;
    $new_teacher->role = $data->role;

    // Add new teacher
    if($new_teacher->add_teacher()){
        echo json_encode(
            array(
                'message' => 'New Teacher Added',
                'status' => true
            )
        );
    }else{
        echo json_encode(
            array(
                'message' => 'Something Went Wrong, Teacher Not Added',
                'status' => false
            )
        );
    }
}