<?php 

    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');

    // Include required files
    include_once '../../config/Database.php';
    include_once '../../models/Events.php';

    // Create database instance
    $database = new Database();
    $db = $database->connection();

    // Create event instance
    $events = new Events($db);

    // Read query
    $results = $events->get_events();

    // Count rows
    $num = $results->rowCount();

    // Check if there are any rows
    if($num > 0){

        // Events array
        $event_array = array();
        $event_array['data'] = array();

        while($row = $results->fetch(PDO::FETCH_ASSOC)){
            extract($row);

            // Event item
            $event_item = array(
                'id' => $id,
                'teacher_id' => $teacher_id,
                'title' => $title,
                'Subject' => $title,
                'StartTime' => $start_date,
                'EndTime' => $end_date,
                'message' => $message,
                'created_at' => $created_at
            );

            // Add item into event array 'data'
            array_push($event_array['data'], $event_item);
        }

        // Conver array into JSON and output
        echo json_encode($event_array);

    }else {
        echo json_encode(
            array(
                "message" => "There are no events"
            )
        );
    }