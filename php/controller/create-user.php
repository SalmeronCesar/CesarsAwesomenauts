<?php
require_once(__DIR__ . "/../model/config.php");

//We input the filter to sanitize the username
$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
//We input the filter to sanitize the password
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_EMAIL);

//We are telling this to create a unique id and to create random numbers to  make sure this random number is unique as possible
$salt = "$5$" . "rounds=5000$" . uniqid(mt_rand(), true) . "$";

$hashedPassword = crypt($password, $salt);
//This query is going to insert and set variables like email,username,passwords and the salt.
$query = $_SESSION["connection"]->query("INSERT INTO users SET "
        . "email = '',"
        . "username = '$username',"
        . "password = '$hashedPassword',"
        . "salt = '$salt',"
        . "exp = 0, "
        . "exp1 = 0,"
        . "exp2 = 0,"
        . "exp3 = 0,"
        . "exp4 = 0");
        
        $_SESSION["name"] = $username;
         
if($query) {
    //Needs this for Ajax on index.php
    echo "true";
}

else {
    echo "<p>" . $_SESSION["connection"]->error . "</p>";
}