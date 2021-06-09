<?php 

    class Events{
        // Database properties
        private $conn;
        private $table = "events";

        // Event properties
        public $fname;
        public $lname;
        public $teacher_id;
        public $title;
        public $start_date;
        public $end_date;
        public $message;
        public $created_at;

        // Constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // Get all events
        public function get_events(){

            // Create query
            $sql = 'SELECT * FROM ' . $this->table . ' ORDER BY created_at DESC';

            // Prepare query
            $stmt = $this->conn->prepare($sql);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        // Create event
        public function add_event(){

            // Create query
            $sql = 'INSERT INTO ' . $this->table . '(teacher_id, title, start_date, end_date, message) VALUES(?, ?, ?, ?, ?)';

            // Sanitize inputs
            $this->teacher_id = htmlspecialchars(strip_tags($this->teacher_id));
            $this->title = htmlspecialchars(strip_tags($this->title));
            $this->message = htmlspecialchars(strip_tags($this->message));

            // Prepare query
            $stmt = $this->conn->prepare($sql);

            // Bind and execute query
            if($stmt->execute([$this->teacher_id, $this->title, $this->start_date, $this->end_date, $this->message])){
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }
    }