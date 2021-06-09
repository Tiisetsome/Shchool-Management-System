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
    include_once '../../models/Students.php';

    // Instantiate DB & connect;
    $database = new Database();
    $db = $database->connection();

    // Instantiate students
    $new_student = new Students($db);

    // Assign properties
    $new_student->fname = $data->fname;
    $new_student->lname = $data->lname;
    $new_student->gender = $data->gender;
    $new_student->age = $data->age;
    $new_student->address = $data->address;
    $new_student->email = $data->email;
    $new_student->phone = $data->phone;
    $new_student->grade = $data->grade;

    if($data->grade === "Grade 10" || $data->grade === "Grade 11" || $data->grade === "Grade 12"){
        $compulsary = ",Life Seciences,Life Orientation,Sepedi,English";
        $new_student->subjects = $data->subjects . $compulsary;
    }else{
        $new_student->subjects = $data->subjects;
    }

    //  Add new student
    if($new_student->add_student()){
        echo json_encode(
            array(
                'message' => 'New Student Added',
                'status' => true
            )
        );
    }else{
        echo json_encode(
            array(
                'message' => 'Something Went Wrong, Student Not Added',
                'status' => false
            )
        );
    }
}