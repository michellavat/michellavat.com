<?php
 
if(isset($_POST['Email'])) {

    $email_to = "michellavat@gmail.com";
    $email_subject = "Kontaktanfrage über michellavat.com";
 
    function died($error) {
        echo "I am very sorry, but there were error(s) found with the form you submitted. ";
        echo "Error(s):.<br /><br />";
        echo $error."<br /><br />";
        echo "Please go back and fix these errors.<br /><br />";
        die();
    }
 
    // validation expected data exists
    if(!isset($_POST['Name']) ||
        !isset($_POST['Email']) ||
        !isset($_POST['Message'])) {
        died('We are sorry, but there appears to be a problem with the form you submitted.');       
    }
 
    $name = $_POST['Name']; // required
    $email_from = $_POST['Email']; // required
    $message = $_POST['Message']; // required
 
    $error_message = "";
 
    /* check if email is email */
    $email_exp = '/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/';
    if(!preg_match($email_exp,$email_from)) {
   
      $error_message .= 'The Email Address you entered does not appear to be valid.<br />';
    }
 
    $string_exp = "/^[A-Za-z .'-]+$/";
 
    /* check if name is text */
    if(!preg_match($string_exp,$name)) {
      $error_message .= 'The Name you entered does not appear to be valid.<br />';
    }
   
    /* check if message is larger than 2 chars*/
    if(strlen($message) < 2) {
      $error_message .= 'The Message you entered do not appear to be valid.<br />';
    }
 
    if(strlen($error_message) > 0) {
      died($error_message);
    }
 
    $email_message = "Du wurdest über das Kontaktformular auf michellavat.com angeschrieben.\n\n";
 
    function clean_string($string) {
      $bad = array("content-type","bcc:","to:","cc:","href");
      return str_replace($bad,"",$string);
    }
 
    $email_message .= "Name: ".clean_string($name)."\n";
    $email_message .= "Email: ".clean_string($email_from)."\n";
    $email_message .= "Message: ".clean_string($message)."\n";
 
/*  create email headers */
$headers = 'From: '.$email_from."\r\n".
'Reply-To: '.$email_from."\r\n" .
'X-Mailer: PHP/' . phpversion();
 
@mail($email_to, $email_subject, $email_message, $headers);  
}
?>
 
 