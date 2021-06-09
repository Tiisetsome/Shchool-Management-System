<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Teachers.php';

    // Instantiate DB and connect
    $database = new Database();
    $db = $database->connection();

    // Instantiate teacher
    $teacher = new Teachers($db);

    // Assign ID property 
    $teacher->teacher_id = isset($_GET['id'])? $_GET['id'] : die();

    // Get signle teacher
    $teacher->get_teacher();

    // Create teacher array
    $teacher_arr = array(
        'id' => $teacher->id,
        'teacher_id' => $teacher->teacher_id,
        'fname' => $teacher->fname,
        'lname' => $teacher->lname,
        'gender' => $teacher->gender,
        'age' => $teacher->age,
        'classes' => explode(',', $teacher->classes),
        'sections' => explode(',', $teacher->sections),
        'address' => $teacher->address,
        'email' => $teacher->email,
        'phone' => $teacher->phone,
        'role' => $teacher->role,
        'subjects' => explode(',', $teacher->subjects),
        'created_at' => $teacher->created_at,
    );

    // Convert array to JSON and outpu results
    echo json_encode($teacher_arr);