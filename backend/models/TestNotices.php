<?php

    class TestNotices{
        // Database Properties
        private $conn;
        private $table = "test_notices";

        // Test notices properties
        public $id;
        public $person_id;
        public $fname;
        public $lname;
        public $subject;
        public $message;
        public $test_date;
        public $grade;
        public $created_at;

        // Constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // Get all test notices
        public function get_test_notices(){
            // Create query
            $sql = 'SELECT * FROM ' . $this->table . ' ORDER BY created_at DESC';

            // Prepare query
            $stmt = $this->conn->prepare($sql);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        // Add test notice
        public function add_test_notice(){
            // Create query
            $sql = 'INSERT INTO ' . $table . ' VALUES (person_id=?, fname=?, lname=?, subject=?, message=?, $test_date=?, grade=?)';

            // Prepate query
            $stmt = $this->conn->prepare($sql);

            // Sanitize inputs
            $this->person_id = htmlspecialchars(strip_tags($this->person_id));
            $this->fname = htmlspecialchars(strip_tags($this->fname));
            $this->lname = htmlspecialchars(strip_tags($this->lname));
            $this->subject = htmlspecialchars(strip_tags($this->subject));
            $this->message = htmlspecialchars(strip_tags($this->message));
            $this->test_date = htmlspecialchars(strip_tags($this->test_date));
            $this->grade = htmlspecialchars(strip_tags($this->grade));

            // Execute query
            if($stmt->execute([$this->person_id, $this->fname, $this->lname, $this->subject, $this->message, $this->test_date, $this->grade])){
                return true;
            }

             // Print error if something went wrong
             printf("Error: %s.\n", $stmt->error);

             return false;
        }
    }