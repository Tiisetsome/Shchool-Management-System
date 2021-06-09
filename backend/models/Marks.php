<?php

    class Marks{

        // Database properties
        private $conn;
        private $table = 'student_marks';

        // Marks properties
        public $id;
        public $type;
        public $score;
        public $subject;
        public $student_id;
        public $created_at;

        // Constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // Get all student marks
        public function get_student_marks(){

            // Create query
            $query = 'SELECT * FROM ' . $this->table . ' ORDER BY created_at DESC';

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        // Get single student marks
        public function get_student_single_marks(){

            // Create query
            $query = 'SELECT * FROM ' . $this->table . ' WHERE student_id = ? ORDER BY created_at DESC';

            // Clean and sanitize data inputs
            $this->student_id = htmlspecialchars(strip_tags($this->student_id));

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Bind params and execute query
            $stmt->execute([$this->student_id]);

            // Get rows
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // Assign properties
            extract($row);

            $this->id =$id;
            $this->type =$type;
            $this->score =$score;
            $this->subject =$subject;
            $this->student_id =$student_id;
        }

        // Add student marks
        public function add_student_marks(){

            // Create query
            $query = 'INSERT INTO ' . $this->table . ' (type, score, subject, student_id) VALUES (?, ?, ?, ?)';

            // Clean and sanitize input data
            $this->type = htmlspecialchars(strip_tags($this->type));
            $this->score = htmlspecialchars(strip_tags($this->score));
            $this->subject = htmlspecialchars(strip_tags($this->subject));
            $this->student_id = htmlspecialchars(strip_tags($this->student_id));

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Bind paramas and execute query
            if($stmt->execute([$this->type, $this->score, $this->subject, $this->student_id])){
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        // Update student marks
        public function update_marks(){

            // Create query
            $query = 'UPDATE ' . $this->table . ' SET type = ?, score = ?, subject = ? WHERE id = ?';

            // Clean and sanitize data
            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->type = htmlspecialchars(strip_tags($this->type));
            $this->score = htmlspecialchars(strip_tags($this->score));
            $this->subject = htmlspecialchars(strip_tags($this->subject));
            $this->student_id = htmlspecialchars(strip_tags($this->student_id));

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Bind paramas and execute query
            if($stmt->execute([$this->type, $this->score, $this->subject, $this->id])){
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        // Delete student marks
        public function delete_student_marks(){
            $this->id = htmlspecialchars(strip_tags($this->id));
            $query = 'DELETE FROM ' . $this->table . ' WHERE id = ?';
            $stmt = $this->conn->prepare($query);

            if($stmt->execute([$this->id])) return true;

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }
    }