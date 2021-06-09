<?php
    
    class Cases{

        // Database properties
        private $conn;
        private $table = 'cases';

        // Case properties
        public $id;
        public $fname;
        public $lname;
        public $student_id;
        public $message;
        public $grade;
        public $created_at;

        // Constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // Get all cases
        public function get_cases(){
        
            // Create query
            $query = 'SELECT cases.id, cases.student_id, fname, lname, grade, message, cases.created_at 
                        FROM students
                        JOIN ' . $this->table . ' ON students.student_id = cases.student_id';
            
            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        // Get single case
        public function get_case(){

            // Create query
            $query = 'SELECT cases.id, fname, lname, grade, message, cases.created_at 
                        FROM students
                            JOIN ' . $this->table . ' ON students.student_id = ?';
            
            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Bind params and execute query
            $stmt->execute([$this->student_id]);

            // Get rows
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // Extract keys
            extract($row);

            // Assign case properties
            $this->id = $id;
            $this->fname = $fname;
            $this->lname = $lname;
            $this->message = $message;
            $this->grade = $grade;
            $this->created_at = $created_at;
        }

        // Add new case
        public function add_case(){

            // Create query
            $sql = 'INSERT INTO ' . $this->table . ' (student_id, message) VALUES(?, ?)';

            // Sanitize input data
            $this->student_id = htmlspecialchars(strip_tags($this->student_id));
            $this->message = htmlspecialchars(strip_tags($this->message));

            // Prepare query
            $stmt = $this->conn->prepare($sql);

            // Bind params and execute query
            if($stmt->execute([$this->student_id, $this->message])){
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

    }