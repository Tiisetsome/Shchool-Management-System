<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    //Escape inputs
    function sanitizeInputs($input){
        $input = htmlspecialchars(stripslashes(trim($input)));
        return $input;
    }

    //Handle status
    function errorMsg($message, $status, $updated = null){
        $error= array(
            "message" => $message,
            "status" => $status,
            "updated" => $updated,
        );
        echo json_encode($error);
    }

    //Default Varibale constants
    define("PATH", "http://localhost:3000/");

    //Validate inputs
    if(empty($email) || empty($tokenID)){
        $message = 'Please fill in all fields';
        $status = true;
        errorMsg($message, $status);
    }else if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $message = 'Please enter a valid email';
        $status = true;
        errorMsg($message, $status);
    }else{
        require 'vendor/autoload.php';
    
        $mail = new PHPMailer(true);

        try{
            //Server settings
            // $mail->isSMTP();                                            // Send using SMTP
            $mail->Host       = 'smtp.gmail.com';                    // Set the SMTP server to send through
            $mail->SMTPAuth   = true;                                   // Enable SMTP authentication
            $mail->Username   = '';                     // SMTP username
            $mail->Password   = '';                               // SMTP password
            $mail->SMTPSecure = PHPMaeiler::ENCRYPTION_STARTTLS;         // Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
            $mail->Port       = 587;                                    // TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

            //Recipients
            $mail->setFrom('', 'Mosepedi Management System');
            $mail->addAddress($email);               // Name is optional
            $mail->addReplyTo( $email, 'Information');

            // Content
            $mail->isHTML(true);                                  // Set email format to HTML
            $mail->Subject = 'Password Verify';
            $mail->Body    = '<p>The request to create a new account for mosepedi school management portal has been logged. The one time OTP code can be found below to proceed with the registration. If you did not make this request, you can ignore this email</p>
                                <p><b>OTP Code :</b>'. $tokenID . '</p>
                                <p>NB: The code will expire in 15 minutes.</p>';
            $mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

            $mail->send();

            //Status
            $message = 'Message was sent';
            $status = false;
            $updated = true;
            errorMsg($message, $status, $updated);
        }
        catch (Exception $e) {
            $message = 'Message could not be sent';
            $status = true;
            $updated = false;
            errorMsg($message, $status);
        }
        
    }      

?>