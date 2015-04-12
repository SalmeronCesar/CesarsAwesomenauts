<!--We are entering the config file.-->
<?php
require_once(__DIR__ . "/../model/config.php");
//$query = the database and creates a table and is NOT NULL, title, post are varchar and PRIMARY KEY = the id
$query = $_SESSION["connection"]->query("CREATE TABLE posts ("
. "id int(11) NOT NULL AUTO_INCREMENT,"
. "title varchar(255) NOT NULL,"
. "post text NOT NULL,"
. "PRIMARY KEY (id))");

echo $query;
//Here we asked if the table was created or not and here it says it is created successfully.
if ($query) {
echo "<p>Successfully created table: posts</p>";
}
//This is telling us if we have an error it will appear and currently we do not have an error.
else {
echo "<p>" .$_SESSION["connection"]->error . "</p>";
}
//$query = the database and creates a table for users and is NOT NULL, username, email and salt are varchar and PRIMARY KEY = the id
$query = $_SESSION["connection"]->query("CREATE TABLE users("
. "id int(11) NOT NULL AUTO_INCREMENT, "
. "username varchar(30) NOT NULL,"
. "email varchar(50) NOT NULL,"
. "password char(128) NOT NULL,"
. "salt char(128) NOT NULL,"
. "PRIMARY KEY(id))");
//The  created table was a success
if($query) {
echo "<p>Successfully created table: users</p>";
}

else {
     echo "<p>" . $_SESSION["connection"]->error . "</p>";
}
