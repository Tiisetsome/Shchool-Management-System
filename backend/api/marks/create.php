<?php

   //Headers
   header('Access-Control-Allow-Origin: *');
   header('Content-Type: application/json');
   header('Access-Control-Allow-Methods: POST');
   header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

   // Get raw posted data
   $data = json_decode(file_get_contents("php://input"));

   if($_SERVER['REQUEST_METHOD'] === 'POST' && !empty($data->student_id)){
       
        include_once '../../config/Database.php';
        include_once '../../models/Marks.php';
    
        // Instantiate database and connect
        $database = new Database();
        $db = $database->connection();
    
        // Instantiate marks
        $add_marks = new Marks($db);
    
    
        // Assign marks properties
        $add_marks->type = $data->type;
        $add_marks->score = $data->score;
        $add_marks->subject = $data->subject;
        $add_marks->student_id = $data->student_id;
    
        // Add marks
        if($add_marks->add_student_marks()){
        echo json_encode(
                array(
                    'message' => 'Student mark added',
                    'status' => true
                )
            );
        } else{
        echo json_encode(
            array(
                'message' => 'Something went wrong, marks not added',
                'status' => false
            )
        );
        }

   }
   