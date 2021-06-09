<?php

    class Tests{

        // Database properties
        private $conn;
        private $table = 'tests';

        // Test properties
        public $id;
        public $test_date;
        public $grade;
        public $section;
        public $type;
        public $subject;
        public $created_at;

        // Constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // Get all tests
        public function get_tests(){

            // Create query
            $query = 'SELECT * FROM ' . $this->table;

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        // Get single test
        public function get_test(){

            // Create query
            $query = 'SELECT * FROM ' . $this->table . ' WHERE id=?';

            // Clean and sanitize data
            $this->id = htmlspecialchars(strip_tags($this->id));

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Bind params and execute query
            $stmt->execute([$this->id]);

            // Get rows
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // Extract keys
            extract($row);

            // Set properties
            $this->id = $id;
            $this->test_date = $test_date;
            $this->grade = $grade;
            $this->section = $section;
            $this->type = $type;
            $this->subject = $subject;
            $this->created_at = $created_at;

        }

        // Add test
        public function add_test(){

            // Create query
            $query = 'INSERT INTO ' . $this->table . ' (test_date, grade, section, type, subject) 
                        VALUES (?,?,?,?,?)';

            // Clean and sanitize data
            $this->test_date = htmlspecialchars(strip_tags($this->test_date));
            $this->grade = htmlspecialchars(strip_tags($this->grade));
            $this->section = htmlspecialchars(strip_tags($this->section));
            $this->type = htmlspecialchars(strip_tags($this->type));
            $this->subject = htmlspecialchars(strip_tags($this->subject));

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Bind params and execute query
            if($stmt->execute([$this->test_date, $this->grade, $this->section, $this->type, $this->subject])){
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }
    }