<?php
    // Headers
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json');
    header('Access-Control-Allow-Methods: PUT');
    header('Access-Control-Allow-Headers: Access-Control-Allow-Headers, Content-Type, Access-Control-Allow-Methods, Authorization, X-Requested-With');

    // Get raw data
    $data = json_decode(file_get_contents("php://input"));

    if($_SERVER['REQUEST_METHOD'] == 'PUT' && !empty($data->id)){

        // Include required files
        include_once '../../config/Database.php';
        include_once '../../models/Marks.php';

        // Create database instance
        $database = new Database();
        $db = $database->connection();

        // Create marks instance
        $student_mark = new Marks($db);
        $student_mark->id = $data->id;

        // Delete marks
        if($student_mark->delete_student_marks()){
            echo json_encode(
                array(
                    "message" => "Mark deleted",
                    "deleted" => true
                )
            );
        }else{
            echo json_encode(
                array(
                    "message" => "Something went wrong, mark not deleted",
                    "deleted" => false
                )
            );
        }
    }
