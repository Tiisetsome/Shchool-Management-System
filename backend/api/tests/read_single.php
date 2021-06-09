<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Tests.php';

    // Instatiate database and connect
    $database = new Database();
    $db = $database->connection();

    // Instatiate tests
    $test = new Tests($db);

    // Set id property
    $test->id = isset($_GET['id'])? $_GET['id'] : die();

    // Test read query
    $test->get_test();

    // Get test
    $test_arr = array(
        'id' => $test->id,
        'test_date' => $test->test_date,
        'grade' => $test->grade,
        'section' => $test->section,
        'type' => $test->type,
        'subject' => $test->subject,
        'created_at' => $test->created_at,
    );

    // Convert array into JSON and output results
    echo json_encode($test_arr);
