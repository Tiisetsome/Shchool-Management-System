<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: PUT');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

include_once '../../config/Database.php';
include_once '../../models/Students.php';

// Instantiate DB & connect;
$database = new Database();
$db = $database->connection();

// Instantiate students
$update_student = new Students($db);

// Get raw posted data
$data = json_decode(file_get_contents("php://input"));

// Set id to update
$update_student->id = $data->id;

// Assign properties
$update_student->fname = $data->fname;
$update_student->lname = $data->lname;
$update_student->gender = $data->gender;
$update_student->age = $data->age;
$update_student->address = $data->address;
$update_student->email = $data->email;
$update_student->phone = $data->phone;
$update_student->grade = $data->grade;

if($data->grade === "Grade 10" || $data->grade === "Grade 11" || $data->grade === "Grade 12"){
    $compulsary = ",Life Seciences,Life Orientation,Sepedi,English";
    $update_student->subjects = $data->subjects . $compulsary;
}else{
    $update_student->subjects = $data->subjects;
}

//  Update student
if($update_student->update_student()){
    echo json_encode(
        array('message' => 'Student Info Updated')
    );
}else{
    echo json_encode(
        array('message' => 'Something went wrong, data not updated')
    );
}