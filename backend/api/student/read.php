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
$students = new Students($db);

// Student read query
$result = $students-> get_students();

// Get row count
$num = $result->rowCount();

// Check if student(s) exist
if($num > 0){

    // Students array
    $students_arr = array();
    $students_arr['data'] = array();

    while($row = $result->fetch(PDO::FETCH_ASSOC)){
        extract($row);

        $student_item = array(
            'id' => $id,
            'student_id' => $student_id,
            'fname' => $fname,
            'lname' => $lname,
            'gender' => $gender,
            'address' => $address,
            'age' => $age,
            'email' => $email,
            'phone' => $phone,
            'grade' => $grade,
            'subjects' => explode(',', $subjects),
            'created_at' => $created_at,
        );

        // Push to "data"
        array_push($students_arr['data'], $student_item);
    };

    //Turn array into JSON and output
    echo json_encode($students_arr);
} else{
    echo json_encode(
        array('message' => 'No students found')
    );
}