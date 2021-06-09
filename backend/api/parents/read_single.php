<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // Import required files
    require_once '../../config/Database.php';
    require_once '../../models/Parents.php';

    // Instantiate database and create connection
    $database = new Database();
    $db = $database->connection();

    // Instantiate parent
    $parent = new Parents($db);

    // Get teacher id from query
    $parent->id = isset($_GET['id'])? $_GET['id'] : die();

    // Get single parent
    $parent->getParent();

    // Create array
    $parent_arr = array(
        'id' => $parent->id,
        'parent_id' => $parent->parent_id,
        'fanme' => $parent->fname,
        'lname' => $parent->lname,
        'gender' => $parent->gender,
        'address' => $parent->address,
        'age' => $parent->age,
        'classes' => $parent->classes,
        'email' => $parent->email,
        'created_at' => $parent->created_at,
    );

    // Conver array into JSON and output
    echo json_encode($parent_arr);

