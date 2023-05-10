

<?php
// define variables and set to empty values
$name = $email = $message = $website = " ";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
   $name = test_input($_POST["name"]);
   $email = test_input($_POST["email"]);
   $website = test_input($_POST["website"]);
   $message = test_input($_POST["message"]);
 // +++++++++++++++++++++++++++++++++++++++++++
$file = fopen("Feedback_data.txt", "w");
fwrite($file,"new message ,$name,$email,   $website,   $message " );
fclose($file);
}

function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}

require 'PHPMailerAutoload.php';

$mail = new PHPMailer;

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.cc.iitk.ac.in;smtp.cc.iitk.ac.in;';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'vishnuc';                 // SMTP username
$mail->Password = 'Mvemjsun';                           // SMTP password
$mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 25;                                    // TCP port to connect to

$mail->setFrom('vishnuc@iitk.ac.in', 'Vishnu Chipade');
$mail->addAddress('vishnuc@iitk.ac.in', 'Vishnu Chipade');     // Add a recipient

$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'This is a message from ' . $name . ' through your website';
$mail->Body    =  'Name: ' . $name . ' <br> Email: '.$email. '<br> Website: ' .$website.'<br> <br> Message: <br><br>' . $message;
$mail->AltBody = 'This is the body in plain text for non-HTML mail clients';

if(!$mail->send()) {
    echo 'Message could not be sent.';
    echo 'Mailer Error: ' . $mail->ErrorInfo;
} else {
    echo '<h3> Message has been sent</h3>';
}

?>

<?php
echo "<h3>Thank you!  For your message <br/> Click <a href=\"http://home.iitk.ac.in/~vishnuc/contact.html\">here</a> to go back </h3>";
echo "Your message is:<br> <br>";
echo 'Name: ' .$name;
echo "<br>";
echo 'Email: ' .$email;
echo "<br>";
echo 'Website: ' .$website;
echo "<br>";
echo 'Message: <br>' .$message;
?>
