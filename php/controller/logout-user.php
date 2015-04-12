<!--We are entering the config file.-->
<?php
require_once(__DIR__ . "/../model/config.php");
//$_SESSION is authenticated.
unset($_SESSION["authenticated"]);
//session is now desroyed
session_destroy();
//The location is a path which is index.php
header("Location: " . $path . "index.php");
