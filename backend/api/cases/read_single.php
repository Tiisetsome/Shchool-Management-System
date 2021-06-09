<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Cases.php';

    // Instantiate database and connect
    $database = new Database();
    $db = $database->connection();

    // Instantiate cases
    $case = new Cases($db);

    // Get student id
    $case->student_id = isset($_GET['studentID'])? $_GET['studentID'] : die();

    // Single case query
    $case->get_case();

    // Create case array
    $case_arr = array(
        'id' => $case->id,
        'fname' => $case->fname,
        'lname' => $case->lname,
        'message' => $case->message,
        'grade' => $case->grade,
        'created_at' => $case->created_at,
    );

    // Convert case array into JSON
    echo json_encode($case_arr);