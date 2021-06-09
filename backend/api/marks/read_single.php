<?php

    // Headers
    header('Acess-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Marks.php';

    // Instantiate database and connect
    $database = new Database();
    $db = $database->connection();

    // Instantiate student marks
    $student_marks = new Marks($db);

    // Assign student id
    $student_marks->student_id = isset($_GET['studentID'])? $_GET['studentID'] : die();

    // Get student marks
    $student_marks->get_student_single_marks();

    // Create student marks array
    $student_marks_arr = array(
        'id' => $student_marks->id,
        'type' => $student_marks->type,
        'score' => $student_marks->score,
        'subject' => $student_marks->subject,
        'student_id' => $student_marks->student_id,
        'created_at' => $student_marks->created_at
    );

    // Convert student marks array into JSON and execute
    echo json_encode($student_marks_arr);