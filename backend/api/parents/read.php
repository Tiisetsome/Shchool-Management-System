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

    //Instantiate parents
    $parents = new Parents($db);

    // Read query
    $results = $parents->getParents();

    // Get row count
    $num = $results->rowCount();

    // Check if parents exists
    if($num > 0){

        // Parents array
        $parents_arr = array();
        $parents_arr['data'] = array();

        while($row = $results->fetch(PDO::FETCH_ASSOC)){
            // Extract keys
            extract($row);

            $parent_item = array(
                'id' => $id,
                'parent_id' => $parent_id,
                'fname' => $fname,
                'lname' => $lname,
                'gender' => $gender,
                'classes' => explode(',', $classes),
                'address' => $address,
                'age' => $age,
                'email' => $email,
                'created_at' => $created_at,
            );

            // Add item array to "data"
            array_push($parents_arr['data'], $parent_item);
            
        }

        // Convert array into JSON and output
        echo json_encode($parents_arr);

    }else {
        echo json_encode(
            array(
                "message" => "No parents found"
            )
            );
    }