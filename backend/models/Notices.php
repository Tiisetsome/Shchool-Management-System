<?php

    class Notices{

        // DB properties
        private $conn;
        private $table = 'notices';

        // Notice properties
        public $id;
        public $teacher_id;
        public $p_fname;
        public $p_lname;
        public $message;
        public $created_at;

        // Constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // Get teacher creating notice
        protected function get_teacher_details($table, $teacher_id){
            
            // Create query
            $query = 'SELECT fname, lname FROM ' . $table . ' WHERE teacher_id=?';

            // Preapare query
            $stmt = $this->conn->prepare($query);

            // Bind params and execute query
            $stmt->execute([$teacher_id]);

            // Get row count
            $num = $stmt->rowCount();

            // Check if user with id exists
            if($num > 0){
                
                // Fetch teacher
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                // Extract keys
                extract($row);

                // Assign values to properties
                $this->p_fname = $fname;
                $this->p_lname = $lname;
            }
        }

        // Get all notices
        public function get_notices(){

            // Create query
            $query = 'SELECT * FROM ' . $this->table . ' ORDER BY created_at DESC';

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        // Add notice
        public function add_notice(){

            // Create query
            $query = 'INSERT INTO ' . $this->table . ' (p_fname, p_lname, message) VALUES (?, ?, ?)';

            // Clean and sanitize input data
            $this->teacher_id = htmlspecialchars(strip_tags($this->teacher_id));
            $this->message = htmlspecialchars(strip_tags($this->message));

            // Get teacher name and surname and assign to properties
            $this->get_teacher_details('teachers', $this->teacher_id);

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Bind params and execute query
            if($stmt->execute([$this->p_fname, $this->p_lname, $this->message])){
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        // Delete notice
        public function delete_notice(){

            // Create query
            $query = 'DELETE FROM ' . $this->table . ' WHERE id=?';

            // Clean and sanitize input fields
            $this->id = htmlspecialchars(strip_tags($this->id));

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Bind params and execute query
            if($stmt->execute([$this->id])){
                return true;
            }

            // Print error if something went wrong
            printf('Error: %s.\n', $stmt->error);

            return false;
        }
    }