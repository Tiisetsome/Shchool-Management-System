<?php

    class Parents {

        // Database properties
        private $conn;
        private $table = 'parents';

        // Parent properties
        public $id;
        public $parent_id;
        public $fname;
        public $lname;
        public $gender;
        public $classes;
        public $address;
        public $age;
        public $email;
        public $created_at;

        // Constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // Add new parent
        public function add_parent(){

            // Create id
            $num = $this->get_identity() + 1;
            
            // Create query
            $query = 'INSERT INTO ' . $this->table . ' (parent_id, fname, lname, gender, age, classes, address, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?);';

            // Clean and sanitize data
            $this->parent_id = $num;
            $this->fname = htmlspecialchars(strip_tags($this->fname));
            $this->lname = htmlspecialchars(strip_tags($this->lname));
            $this->gender = htmlspecialchars(strip_tags($this->gender));
            $this->age = htmlspecialchars(strip_tags($this->age));
            $this->classes = htmlspecialchars(strip_tags($this->classes));
            $this->address = htmlspecialchars(strip_tags($this->address));
            $this->email = htmlspecialchars(strip_tags($this->email));
    

            // Prepare statement
            $stmt = $this->conn->prepare($query);

            //Bind and execute the statement
            if($stmt->execute([$this->parent_id, $this->fname, $this->lname, $this->gender, $this->age, $this->classes, $this->address, $this->email])){
                
                // Update identity
                $this->update_identity($num);

                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        // Update parent
        public function update_parent(){
            
            // Create query
            $query = 'UPDATE ' . $this->table . ' SET fname=?, lname=?, gender=?, age=?, address=?, email=?, classes=? WHERE id=?';

            // Clean and sanitize data
            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->fname = htmlspecialchars(strip_tags($this->fname));
            $this->lname = htmlspecialchars(strip_tags($this->lname));
            $this->gender = htmlspecialchars(strip_tags($this->gender));
            $this->age = htmlspecialchars(strip_tags($this->age));
            $this->address = htmlspecialchars(strip_tags($this->address));
            $this->email = htmlspecialchars(strip_tags($this->email));
            $this->classes = htmlspecialchars(strip_tags($this->classes));

            // Prepare statement
            $stmt = $this->conn->prepare($query);

            //Bind and execute the statement
            if($stmt->execute([$this->fname, $this->lname, $this->gender, $this->age, $this->address, $this->email, $this->classes, $this->id])){
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        // Get all parents
        public function getParents(){

            // Create query
            $sql = 'SELECT * FROM ' . $this->table ;

            // Prepare query
            $stmt = $this->conn->prepare($sql);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        // Get single parent
        public function getParent(){

            // Create query
            $query = 'SELECT * FROM ' . $this->table . ' WHERE id = ?';

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Sanitize input
            $this->id = htmlspecialchars(strip_tags($this->id));

            // Bind params and execute query
            $stmt->execute([$this->id]);

            // Get row
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // Properties
            extract($row);

            $this->id = $id;
            $this->parent_id = $parent_id;
            $this->fname = $fname;
            $this->lname = $lname;
            $this->gender = $gender;
            $this->classes = $classes;
            $this->address = $address;
            $this->age = $age;
            $this->email = $email;
            $this->created_at = $created_at;
        }

        // Delete student
        public function delete_parent(){

            // Create query
            $query = 'DELETE FROM ' . $this->table . ' WHERE id=?;';

            // Prepare the statement
            $stmt = $this->conn->prepare($query);

            //Clean data
            $this->id = htmlspecialchars(strip_tags($this->id));

            //Bind and execute the statement
            if($stmt->execute([$this->id])){
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        # METHODS CALLED WHEN ADDING NEW PARENTS
        # THEY ENSURE THERE'S NO CONFLICT ON PARENTS IDS

            // Get the last row from the table
            protected function get_identity(){

                // Create query
                $query = 'SELECT * FROM idreference WHERE id = 3';

                // Prepare statement
                $stmt = $this->conn->prepare($query);

                // Execute statement
                $stmt->execute();

                // Get rows
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                return $row['identity'];

            }

            protected function update_identity($newIdentity){
                // Create query
                $query = 'UPDATE idreference SET identity = ' . $newIdentity . ' WHERE id = 3';

                // Prepare statement
                $stmt = $this->conn->prepare($query);

                // Execute statement
                $stmt->execute();

            }

    }