<?php

    class Teachers{
        
        // DB properties
        private $conn;
        private $table = 'teachers';

        // Teacher properties
        public $id;
        public $teacher_id;
        public $fname;
        public $lname;
        public $gender;
        public $age;
        public $classes;
        public $sections;
        public $address;
        public $email;
        public $phone;
        public $role;
        public $subjects;
        public $created_at;

        // Constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // Get teachers
        public function get_teachers(){

            // Create query
            $query = 'SELECT * FROM ' . $this->table;

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        // Get single teacher
        public function get_teacher(){

            // Create query
            $query = 'SELECT * FROM ' . $this->table . ' WHERE teacher_id=? OR id=?';

            // Prepate query
            $stmt = $this->conn->prepare($query);

            // Bind params and execute query
            $stmt->execute([$this->teacher_id, $this->id]);

            // Get row
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // Assign properties
            $this->id = $row['id'];
            $this->teacher_id = $row['teacher_id'];
            $this->fname = $row['fname'];
            $this->lname = $row['lname'];
            $this->gender = $row['gender'];
            $this->age = $row['age'];
            $this->classes = $row['classes'];
            $this->sections = $row['sections'];
            $this->address = $row['address'];
            $this->email = $row['email'];
            $this->phone = $row['phone'];
            $this->role = $row['role'];
            $this->subjects = $row['subjects'];
            $this->created_at = $row['created_at'];
        }

        // Add new teacher
        public function add_teacher(){

            // Create id
            $num = $this->get_identity() + 1;

            // Create query
            $query = 'INSERT INTO ' . $this->table . ' (teacher_id, fname, lname, gender, age, classes, subjects, sections, address, email, phone, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';

            // Clean and sanitize input data
            $this->teacher_id = $num;
            $this->fname = htmlspecialchars(strip_tags($this->fname));
            $this->lname = htmlspecialchars(strip_tags($this->lname));
            $this->gender = htmlspecialchars(strip_tags($this->gender));
            $this->age = htmlspecialchars(strip_tags($this->age));
            $this->classes = htmlspecialchars(strip_tags($this->classes));
            $this->subjects = htmlspecialchars(strip_tags($this->subjects));
            $this->sections = htmlspecialchars(strip_tags($this->sections));
            $this->address = htmlspecialchars(strip_tags($this->address));
            $this->email = htmlspecialchars(strip_tags($this->email));
            $this->phone = htmlspecialchars(strip_tags($this->phone));
            $this->role = htmlspecialchars(strip_tags($this->role));
            //DON'T FORGET TO ADD SUBJECTS

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Execute query
            if($stmt->execute([$this->teacher_id, $this->fname, $this->lname, $this->gender, $this->age, $this->classes, $this->subjects, $this->sections, $this->address, $this->email, $this->phone, $this->role])){
                
                // Update identity
                $this->update_identity($num);

                // Add to athentication table
                $this->add_auth($num, null);

                return true;
            }

            // Print error if something went wrong
            printf('Error: %s.\n', $stmt->error);

            return false;
        }

        // Update teacher data
        public function update_teacher(){
             
            // Create query
            $query = 'UPDATE ' . $this->table . ' SET fname=?, lname=?, gender=?, age=?, classes=?, sections=?, address=?, email=?, phone=?, role=?, subjects=? WHERE id=?';

            // Clean and sanitize data
            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->fname = htmlspecialchars(strip_tags($this->fname));
            $this->lname = htmlspecialchars(strip_tags($this->lname));
            $this->classes = htmlspecialchars(strip_tags($this->classes));
            $this->sections = htmlspecialchars(strip_tags($this->sections));
            $this->gender = htmlspecialchars(strip_tags($this->gender));
            $this->age = htmlspecialchars(strip_tags($this->age));
            $this->address = htmlspecialchars(strip_tags($this->address));
            $this->email = htmlspecialchars(strip_tags($this->email));
            $this->phone = htmlspecialchars(strip_tags($this->phone));
            $this->role = htmlspecialchars(strip_tags($this->role));
            $this->subjects = htmlspecialchars(strip_tags($this->subjects));
            
            // Prepare statement
            $stmt = $this->conn->prepare($query);

            //Bind and execute the statement
            if($stmt->execute([$this->fname, $this->lname, $this->gender, $this->age, $this->classes, $this->sections, $this->address, $this->email, $this->phone, $this->role, $this->subjects, $this->id])){
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        // Delete teacher
        public function delete_teacher(){

            // Get teacher details first before deleting
            $this->get_teacher();

            // Create query
            $query = 'DELETE FROM ' . $this->table . ' WHERE id=?';

            // Clean and sanitize id
            $this->id = htmlspecialchars(strip_tags($this->id));

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Bind param and execute query
            if($stmt->execute([$this->id])){

                // Delete teacher from auth table
                $this->delete_auth($this->teacher_id);

                return true;
            }

            // Print error if something went wrong
            printf('Error: %s.\n', $stmt->error);

            return false;
        }

        # METHODS CALLED WHEN ADDING NEW TEACHER, UPDATING AND DELETEING
        
            // Get the last row from the table
            protected function get_identity(){

                // Create query
                $query = 'SELECT * FROM idreference WHERE id = 1';

                // Prepare statement
                $stmt = $this->conn->prepare($query);

                // Execute statement
                $stmt->execute();

                // Get rows
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                return $row['identity'];

            }

            // Update reference id for the next individual
            protected function update_identity($newIdentity){
                // Create query
                $query = 'UPDATE idreference SET identity = ' . $newIdentity . ' WHERE id = 1';

                // Prepare statement
                $stmt = $this->conn->prepare($query);

                // Execute statement
                $stmt->execute();

            }

            // Add the individual to authetication table
            protected function add_auth($person_id, $pwd){
                // Crete query
                $sql = 'INSERT INTO authenticated_persons(person_id, pwd) VALUES (?, ?)';

                // Prepare query
                $stmt = $this->conn->prepare($sql);

                // Execute query
                $stmt->execute([$person_id, $pwd]);
            }

             // Delete the individual from authetication table
             protected function delete_auth($person_id){
                // Crete query
                $sql = 'DELETE FROM authenticated_persons WHERE person_id = ' . $person_id;

                // Prepare query
                $stmt = $this->conn->prepare($sql);

                // Execute query
                $stmt->execute();
            }
    }