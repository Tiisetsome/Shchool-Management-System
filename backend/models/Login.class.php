<?php

    class Login {
        
        // Database properties
        private $conn;

        // General properties
        protected $teacher = "3";
        protected $student =  "2";
        protected $parent = "5";
        protected $email;

        // Constructor
        public function __construct($conn){
            $this->conn = $conn;
        }

        // Update password [creating a new account]

        public function update_credentials($person_id, $pwd_confirm, $otp_code){

            // Get token
            if($this->checkTokenExistance($person_id, $otp_code)){
                //Protect the pwd
                $hashedPwd = password_hash($pwd_confirm, PASSWORD_DEFAULT);

                // Create query
                $sql = 'UPDATE authenticated_persons SET pwd = ? WHERE person_id = ?';

                // Prepare query
                $stmt = $this->conn->prepare($sql);

                // Bind params and execute query
                if($stmt->execute([$hashedPwd, $person_id])){

                    // Delete Token
                    $this->delete_token($person_id);
                    return true;
                }
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;

        }

        // Check person
        public function check_person($person_id, $pwd){

            // Get the first value from the id
            $compareChar = substr($person_id, 0, 1);

            switch($compareChar){
                case $this->parent:
                    return json_encode(
                        array(
                            "isAuth" => $this->check($person_id, $pwd),
                            "person" => "parent"
                        )
                    );
                case $this->student:
                    return json_encode(
                        array(
                            "isAuth" => $this->check($person_id, $pwd),
                            "person" => "student"
                        )
                    );
                case $this->teacher:
                    return json_encode(
                        array(
                            "isAuth" => $this->check($person_id, $pwd),
                            "role" => $this->get_role($person_id),
                            "person" => "teacher"
                        )
                    );
                default:
                    return "none";
            }
        }

        // Check operation
        protected function check($personId, $pwd){
            // Create query
            $sql = 'SELECT * FROM authenticated_persons WHERE person_id=?';

            // Prepare query
            $stmt= $this->conn->prepare($sql);

            // Execute query
            $stmt->execute([$personId]);

            // Fetch rows
            $results = $stmt->fetch(PDO::FETCH_ASSOC);

            // Error 
            $signInError = array(
                "isAuth" => false,
                "role" => "",
                "person" => null,
                "errorMsg" => "Either your ID or password is incorrect. Please try again."
            );

            if($stmt->rowCount() > 0){
                // Verify pwd
                $verifiedPwd = password_verify($pwd, $results['pwd']);
                if($verifiedPwd) return true;
                echo json_encode($signInError);
                die();
            };

            echo json_encode($signInError);

            // Stop execution
            die();
        }

        // Check teacher role
        protected function get_role($person_id){

            // Create query
            $sql = 'SELECT role FROM teachers WHERE teacher_id = ?';

            // Perpare query
            $stmt = $this->conn->prepare($sql);

            // Bind params and execute statement
            if($stmt->execute([$person_id])){
                
                $row = $stmt->fetch(PDO::FETCH_ASSOC);

                return $row['role'];
            }
        }

        // Get person to be updated
        public function get_single_person($table, $person_id){

            // Create query
            $sql = 'SELECT email FROM ' . $table . 's WHERE ' . $table . '_id =?'; 

            // Prepare query
            $stmt = $this->conn->prepare($sql);

            // Execute query
            if($stmt->execute([$person_id])){
                
                // Check if person with the id exists and return email
                $num = $stmt->rowCount();
                if($num > 0){
                    $results = $stmt->fetch(PDO::FETCH_ASSOC);
                    return $results['email'];
                }

                // If not stop execution
                echo json_encode(
                    array(
                        "errorMsg" => "Incorrect id",
                        "updated" => false
                    )
                );
                die();
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        // Add token
        public function add_token($person_id, $token){
            //Protect the tokken
            $hashedTokken = password_hash($token, PASSWORD_DEFAULT);

            // Create query
            $query = 'INSERT INTO auth_tokens(person_id, otp_code) VALUES(?, ?)';

            // Prepare query
            $stmt = $this->conn->prepare($query);

            // Bind params and execute query
            if($stmt->execute([$person_id, $hashedTokken])){
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }

        // Delete token
        protected function delete_token($person_id){
            $query = "DELETE FROM auth_tokens WHERE person_id=?";
            $stmt = $this->conn->prepare($query);
            $stmt->execute([$person_id]);
        }

        // Get token
        protected function checkTokenExistance($person_id, $otp_code){

            // NB YOU NEED TO CHECK IF THE TOKEN EXISTS
            $query = 'SELECT * FROM auth_tokens WHERE person_id=? ORDER BY created_at DESC';

            $stmt = $this->conn->prepare($query);
            
            $stmt->execute([$person_id]);

            $num = $stmt->rowCount();

            if($num > 0){
                $results = $stmt->fetch(PDO::FETCH_ASSOC);
                $hashedToken = $results['otp_code'];
                $tokenVerify = password_verify($otp_code, $hashedToken);

                if($tokenVerify) return true;

                return false;
            }

            // Print error if something went wrong
            return false;
        }
    }