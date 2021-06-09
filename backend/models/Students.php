<?php

    class Students{
        // DB properties
        private $conn;
        private $table = 'students';

        // Student properties
        public $id;
        public $student_id;
        public $fname;
        public $lname;
        public $gender;
        public $age;
        public $address;
        public $email;
        public $grade;
        public $phone;
        public $subjects;
        public $created_at;

        // Constructor with Db
        public function __construct($db){
            $this->conn = $db;
        }

        // Get students
        public function get_students(){
            // Create query
            $query = 'SELECT * FROM students ORDER BY lname;';

            // Prepare statement
            $stmt = $this->conn->prepare($query);

            // Execute query
            $stmt->execute();

            return $stmt;
        }

        // Get single student
        public function get_student(){

            // Create query
            $query = 'SELECT * FROM students WHERE id = ? OR student_id = ?;';

            // Prepare statement
            $stmt = $this->conn->prepare($query);

            // Execute statement
            $stmt->execute([$this->id, $this->student_id]);

            // Get rows
            $row = $stmt->fetch(PDO::FETCH_ASSOC);

            // Set properties
            $this->id = $row['id'];
            $this->student_id = $row['student_id'];
            $this->fname = $row['fname'];
            $this->lname = $row['lname'];
            $this->gender = $row['gender'];
            $this->age = $row['age'];
            $this->address = $row['address'];
            $this->email = $row['email'];
            $this->grade = $row['grade'];
            $this->subjects = $row['subjects'];
            $this->created_at = $row['created_at'];

        }

        // Add new student
        public function add_student(){

            // Create id
            $num = $this->get_identity() + 1;
            
            // Create query
            $query = 'INSERT INTO ' . $this->table . ' (student_id, fname, lname, gender, age, address, email, grade, subjects, phone) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?);';

            // Clean and sanitize data
            $this->student_id = $num;
            $this->fname = htmlspecialchars(strip_tags($this->fname));
            $this->lname = htmlspecialchars(strip_tags($this->lname));
            $this->gender = htmlspecialchars(strip_tags($this->gender));
            $this->age = htmlspecialchars(strip_tags($this->age));
            $this->address = htmlspecialchars(strip_tags($this->address));
            $this->email = htmlspecialchars(strip_tags($this->email));
            $this->grade = htmlspecialchars(strip_tags($this->grade));
            $this->subjects = htmlspecialchars(strip_tags($this->subjects));
            $this->phone = htmlspecialchars(strip_tags($this->phone));

            // Prepare statement
            $stmt = $this->conn->prepare($query);

            //Bind and execute the statement
            if($stmt->execute([$this->student_id, $this->fname, $this->lname, $this->gender, $this->age, $this->address, $this->email, $this->grade, $this->subjects, $this->phone])){
                
                 // Update identity
                 $this->update_identity($num);

                 // Add to athentication table
                $this->add_auth($num, null);
                
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        // Update student
        public function update_student(){
            
            // Create query
            $query = 'UPDATE ' . $this->table . ' SET fname=?, lname=?, gender=?, age=?, address=?, email=?, grade=?, subjects=?, phone=? WHERE id=?';

            // Clean and sanitize data
            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->fname = htmlspecialchars(strip_tags($this->fname));
            $this->lname = htmlspecialchars(strip_tags($this->lname));
            $this->gender = htmlspecialchars(strip_tags($this->gender));
            $this->age = htmlspecialchars(strip_tags($this->age));
            $this->address = htmlspecialchars(strip_tags($this->address));
            $this->email = htmlspecialchars(strip_tags($this->email));
            $this->grade = htmlspecialchars(strip_tags($this->grade));
            $this->subjects = htmlspecialchars(strip_tags($this->subjects));
            $this->phone = htmlspecialchars(strip_tags($this->phone));

            // Prepare statement
            $stmt = $this->conn->prepare($query);

            //Bind and execute the statement
            if($stmt->execute([$this->fname, $this->lname, $this->gender, $this->age, $this->address, $this->email, $this->grade, $this->subjects, $this->phone, $this->id])){
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        // Promote student to the next grade
        public function promote_student($grade){

            // Sanitize entries
            $grade = htmlspecialchars(strip_tags($grade));
            $this->student_id = htmlspecialchars(strip_tags($this->student_id));

            // Create query
            $query = "UPDATE " . $this->table . " SET grade = ? WHERE student_id = ?";

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Bind params and execute the query
            if($stmt->execute([$grade, $this->student_id])){
                $this->moveStudentToArchive();
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        // Delete Student Notices before removing the student
        public function delete_student_cases(){

            // Create query
            $query = 'DELETE FROM cases WHERE student_id=?;';

            // Prepare the statement
            $stmt = $this->conn->prepare($query);

            //Bind and execute the statement
            if($stmt->execute([$this->student_id])){
                return true;
            }
        }

        // Delete Student Marks before removing the student
        public function delete_student_marks(){

            //  Get student with the marks to be deleted
            $this->get_student();

            // Create query
            $query = 'DELETE FROM student_marks WHERE student_id=?;';

            // Prepare the statement
            $stmt = $this->conn->prepare($query);

            //Bind and execute the statement
            if($stmt->execute([$this->student_id])){
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        // Delete Student
        public function delete_student(){

            // Get student details first before deleting
            $this->get_student();

            // First first delete student marks
            if($this->delete_student_marks()){

                // Delete cases
                $this->delete_student_cases();
                
                // Create query
                $query = 'DELETE FROM ' . $this->table . ' WHERE id=?;';
    
                // Prepare the statement
                $stmt = $this->conn->prepare($query);
    
                //Clean data
                $this->id = htmlspecialchars(strip_tags($this->id));
    
                //Bind and execute the statement
                if($stmt->execute([$this->id])){

                    // Delete student from auth table
                    $this->delete_auth($this->student_id);

                    return true;
                }
                    
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        // Student to archive
        public function moveStudentToArchive(){
            $query = 'SELECT * FROM student_marks WHERE student_id = ?';
            $stmt = $this->conn->prepare($query);
            if($stmt->execute([$this->student_id])){
                $row = $stmt->fetchAll(PDO::FETCH_ASSOC);
                for($counter = 0; $counter < count($row); $counter++){
                    $query = 'INSERT INTO archive(student_id, type, score, subject) VALUES (?, ?, ?, ?)';
                    $stmt = $this->conn->prepare($query);
                    $stmt->execute([$row[$counter]["student_id"], $row[$counter]["type"], $row[$counter]["score"], $row[$counter]["subject"]]);
                }

                // Remove student marks record
                $this->delete_student_marks();
            }

            return;
        }

        # METHODS CALLED WHEN ADDING NEW STUDENT
        # THEY ENSURE THERE'S NO CONFLICT ON STUDENT IDS

            // Get the last row from the table
            protected function get_identity(){

                // Create query
                $query = 'SELECT * FROM idreference WHERE id = 2';

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
                $query = 'UPDATE idreference SET identity = ' . $newIdentity . ' WHERE id = 2';

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