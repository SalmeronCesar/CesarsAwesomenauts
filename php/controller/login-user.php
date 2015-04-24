<?php
require_once(__DIR__ . "/../model/config.php");

$array = array(
    'exp' => '',
    'exp1' => '',
    'exp2' => '',
    'exp3' => '',
    'exp4' => ''
);

//We input the filter to sanitize the username
//We input the filter to sanitize the password
$username = filter_input(INPUT_POST, "username", FILTER_SANITIZE_STRING);
$password = filter_input(INPUT_POST, "password", FILTER_SANITIZE_STRING);
$query = $_SESSION["connection"]->query("SELECT * FROM users WHERE BINARY username = '$username'");
//This num_rows will tell us how many rows were retrieved from database
if($query->num_rows == 1) {
    $row = $query->fetch_array();
//Here if you enter the correct password it authenticates it and lets you log in.
    if($row["password"] === crypt($password, $row["salt"])) {
        $_SESSION["authenticated"] = true;
        $array["exp"] = $row["exp"];
        $array["exp1"] = $row["exp1"];
        $array["exp2"] = $row["exp2"];
        $array["exp3"] = $row["exp3"];
        $array["exp4"] = $row["exp4"];
        $_SESSION["name"] = $username;
        //Echoing the array
        echo json_encode($array);
    }
    //The else statement is used to tell if you if its true or false.
    //We are saying that there is an Invalid username and password.
    else {
        echo "Invalid username and password";
    }
}
else{
    echo "Invalid username and password";
}