<?php

   //Headers
   header('Access-Control-Allow-Origin: *');
   header('Content-Type: application/json');
   header('Access-Control-Allow-Methods: PUT');
   header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');
   
   // Get raw posted data
   $data = json_decode(file_get_contents("php://input"));
   
   if($_SERVER['REQUEST_METHOD'] == 'PUT' && !empty($data->student_id)){
        // Required files
        include_once '../../config/Database.php';
        include_once '../../models/Marks.php';
    
        // Instantiate database and connect
        $database = new Database();
        $db = $database->connection();
    
        // Instantiate marks
        $update_marks = new Marks($db);
    
        // Assign marks properties
        $update_marks->id = $data->id;
        $update_marks->type = $data->type;
        $update_marks->score = $data->score;
        $update_marks->subject = $data->subject;
        $update_marks->student_id = $data->student_id;
    
        // Update marks
        if($update_marks->update_marks()){
            echo json_encode(
                    array(
                        'message' => 'Marks updated',
                        'updated' => true
                    )
                );
        } else{
            echo json_encode(
                array(
                    'message' => 'Something went wrong, marks not updated',
                    'updated' => false
                )
            );
        }
   }