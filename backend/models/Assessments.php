<?php

    class Assessments{

        // Database properties
        private $conn;
        private $table = 'assessments';

        // Test properties
        public $id;
        public $student_id;
        public $privilege_id;
        public $grade;
        public $subject;
        public $duration;
        public $sub_date;
        public $questions;
        public $correct_answers;
        public $myAnswers;

        // Constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // Get all assessments
        public function get_assessments(){
            $current_date = strtotime(date('Y-m-d'));
            // Create query
            $query = "SELECT assessments.id, student_id, privilege_id, assessment_status, grade, subject, duration, assessments.sub_date, JSON_UNQUOTE(JSON_EXTRACT(questions, '$.test')) AS assessment FROM assessments JOIN student_assessment_privilege ON assessments.id = student_assessment_privilege.id WHERE assessments.sub_date >= $current_date";
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        // Get single assessment
        protected function get_assessment(){

            // Create query
            $sql = 'SELECT correct_answers->>"$.answers" AS assAnswers FROM ' . $this->table . ' WHERE id = ' .$this->id;

            // Prepare query
            $stmt = $this->conn->prepare($sql);

            // Execute query
            if($stmt->execute()){
                $results = $stmt->fetch(PDO::FETCH_ASSOC);
                $results = json_decode($results["assAnswers"]);
                return $results;
            }
        }

        // Add assessment
        public function add_assessment(){
            $current_date = strtotime(date('Y-m-d'));
            
            // Create query
            $query = 'INSERT INTO ' . $this->table . ' (grade, subject, duration, sub_date, questions, correct_answers) 
            VALUES (?, ?, ?, ?, ?, ?)';
            
            // Clean and sanitize data
            echo json_encode($this->questions);
            
            // Prepare query
            $stmt = $this->conn->prepare($query);
            
            // Bind params and execute query
            if($stmt->execute([$this->grade, $this->subject, $this->duration, $this->sub_date, $this->questions, $this->correct_answers])){
                $last_id = $this->conn->lastInsertId();
                $this->assessment_privileges($last_id, $current_date);
                $this->delete_assessments($current_date);
                return true;
            }
            
            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        // Delete old assessments
        function delete_assessments($current_date) {
            $query = 'DELETE FROM ' . $this->table . ' WHERE sub_date < ' . $current_date;
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
        }

        // Do marking
        public function mark_assessment(){
           $ass_answers = $this->get_assessment();
           $counter = 0;

           for($i = 0; $i < count($ass_answers); $i++){
               if($ass_answers[$i] === $this->myAnswers[$i]){
                   $counter++;
               }
           }

           return $counter;
        }

        // Add assessment privileges
        public function assessment_privileges($assessment_id){
             $student_grade = $this->grade;
            // Read query
            $sql = "SELECT * FROM students WHERE grade = '$student_grade'";
            // Prepare query
            $stmt = $this->conn->prepare($sql);

            // Execute query
            if($stmt->execute()){
                // Create student ids array
                $student_ids_arr = array();
                while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
                    extract($row);

                    $student_id_item = array(
                        "student_id" => $student_id
                    );

                    array_push($student_ids_arr, $student_id_item);
                }
            }

            for($i = 0; $i < count($student_ids_arr); $i++){
                $sql = 'INSERT INTO student_assessment_privilege(student_id, sub_date, assessment_status, id) VALUES (' .$student_ids_arr[$i]["student_id"] . ', ' .$this->sub_date. ', false, '.$assessment_id.')';

                $stmt = $this->conn->prepare($sql);

                $stmt->execute();
            }

        }

        public function update_privileges(){
    
            $sql = 'UPDATE student_assessment_privilege SET assessment_status = true WHERE student_id = ' . $this->student_id . ' AND privilege_id = ' . $this->privilege_id;

            $stmt = $this->conn->prepare($sql);

            if($stmt->execute()){
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }
    }