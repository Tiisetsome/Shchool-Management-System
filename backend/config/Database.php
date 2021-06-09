<?php

    class Database{
        //DB properties
        private $host = 'localhost';
        private $db_name = 'school_management_system';
        private $username = 'root';
        private $pwd = '1234'; // You may need to use your own db password
        private $conn;

        //DB Connection
        public function connection(){
            $this->conn = null;

            try{
                $this->conn = new PDO('mysql:host=' . $this->host . ';dbname=' . $this->db_name, $this->username, $this->pwd);
                $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            }catch(PDOException $e){
                echo 'Connection Error: ' .$e->getMessage();
            }

            return $this->conn;
        }
    }