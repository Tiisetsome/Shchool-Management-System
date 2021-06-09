           <?php

    class MissedTest{
        // Database properties
        private $conn;
        private $table = 'missed_tests';

        // Test properties
        public $id;
        public $student_id;
        public $grade;
        public $subject;
        public $reason;
        public $created_at;

        // Constructor
        public function __construct($db){
            $this->conn = $db;
        }

        // Get missed tests
        public function get_missed_tests(){
            // Create query
            $sql = "SELECT * FROM " . $this->table . ' WHERE student_id =? ORDER BY created_at DESC';

            // Prepare query
            $stmt = $this->conn->prepare($sql);

            // Execute the query
            $stmt->execute([$this->student_id]);

            return $stmt;
        }

        // Add missed test
        public function add_missed_test(){
            // Create query
            $sql = "INSERT INTO " . $this->table . " (student_id, grade, subject, reason) VALUES(?,?,?,?)";

            // Sanitize input elements
            $this->student_id = htmlspecialchars(strip_tags($this->student_id));
            $this->grade = htmlspecialchars(strip_tags($this->grade));
            $this->subject = htmlspecialchars(strip_tags($this->subject));
            $this->reason = htmlspecialchars(strip_tags($this->reason));

            // Prepare query
            $stmt = $this->conn->prepare($sql);

            // Bind params and execute the query
            if($stmt->execute([$this->student_id, $this->grade, $this->subject, $this->reason])){
                return true;
            }

            // Print error if something went wrong
            printf("Error: %s.\n", $stmt->error);

            return false;
        }
    }