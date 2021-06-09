<?php
//Headers
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');

include_once '../../config/Database.php';
include_once '../../models/Students.php';

// Instantiate DB & connect;
$database = new Database();
$db = $database->connection();

// Instantiate students
$student = new Students($db);

// Get ID
$student->id = isset($_GET['id'])? $_GET['id'] : die();

// Get single student
$student->get_student();

// Create array
$student_arr  = array(
    'id' => $student->id,
    'student_id' => $student->student_id,
    'fname' => $student->fname,
    'lname' => $student->lname,
    'gender' => $student->gender,
    'age' => $student->age,
    'address' => $student->address,
    'email' => $student->email,
    'phone' => $student->phone,
    'grade' => $student->grade,
    'subjects' => explode(',', $student->subjects),
    'created_at' => $student->created_at
);

// Convert the array to JSON
echo json_encode($student_arr);

