<?php

require_once(__DIR__ . "/database.php");
//session starts
session_start();
//Here we regenerate the session when going to another page on the same website
//session is created
session_regenerate_id(true);
//Name of my Blog
$path = "/CesarsAwesomenauts/php/";
//Host is localhost, username is root, password is root, and database is blog_db and this info is located at PHP myAdmin
$host = "localhost";
$username = "root";
$password = "root";
$database = "awesomenauts_db";
//Here is checking if the SESSION is set or not.
if(!isset($_SESSION["conection"])) {
    $connection = new Database($host, $username, $password, $database);
    //Here the connection is the new database so now we put in "connection" as for database.
    $_SESSION["connection"] = $connection;
}
