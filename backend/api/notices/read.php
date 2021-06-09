<?php

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    include_once '../../config/Database.php';
    include_once '../../models/Notices.php';

    // Instantiate database and connect
    $database = new Database();
    $db = $database->connection();

    // Instantiate notice
    $notices = new Notices($db);

    // Notices read query
    $result = $notices->get_notices();

    // Get row count
    $num = $result->rowCount();

    // Check if there are any notices
    if($num > 0){

        // Notices array
        $notices_arr = array();
        $notices_arr['data'] = array();

        while($row = $result->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            // Notice
            $notice = array(
                'id' => $id,
                'p_fname' => $p_fname,
                'p_lname' => $p_lname,
                'message' => $message,
                'created_at' => $created_at,
            );

            // Push noticce to "data"
            array_push($notices_arr['data'], $notice);
        }

        // Convert array to JSON and output results
        echo json_encode($notices_arr);
        
    } else{
        echo json_encode(
            array('message' => 'No Notice Found')
        );
    }