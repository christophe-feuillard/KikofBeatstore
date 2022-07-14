<?php
var_dump($_POST);

$message = $_POST['message'];
$headers = 'FROM: kikofbeatmaking78@gmail.com';


mail('kikofbeatmaking78@gmail.com', 'formulaire de contact', $message, $headers);
?>