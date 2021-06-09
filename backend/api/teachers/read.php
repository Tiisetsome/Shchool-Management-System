<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Teachers.php';

    // Instatiate the DB and connect
    $database = new Database();
    $db = $database->connection();

    // Instantiate teachers
    $teachers = new Teachers($db);

    // Teacher read query
    $results = $teachers->get_teachers();

    // Get number of rows
    $num = $results->rowCount();

    // Check if teachers exist
    if($num > 0){

        // Teachers array
        $teachers_arr = array();
        $teachers_arr['data'] = array();

        while($row = $results->fetch(PDO::FETCH_ASSOC)){
            extract($row);
            
            $teacher_item = array(
                'id' => $id,
                'teacher_id' => $teacher_id,
                'fname' => $fname,
                'lname' => $lname,
                'gender' => $gender,
                'age' => $age,
                'classes' => explode(',', $classes),
                'subjects' => explode(',', $subjects),
                'sections' => explode(',', $sections),
                'address' => $address,
                'email' => $email,
                'phone' => $phone,
                'role' => $role,
                'created_at' => $created_at,
            );

            // Push to 'data'
            array_push($teachers_arr['data'], $teacher_item);

        }

        // Turn array into JSON and output results
        echo json_encode($teachers_arr);
    }else{
        
        // Error message
        echo json_encode(
            array('message' => 'No Teachers Found')
        );
    }
