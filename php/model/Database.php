<?php
//Here no other files can access this database so instead of being public its private
class Database {
    private $connection;
    private $host;
    private $username;
    private $password;
    private $database;
    public $error;
    //Here we contrust and make new functions.
    public function __construct($host, $username, $password, $database) {
        $this->host = $host;
        $this->username = $username;
        $this->password = $password;
        $this->database = $database;
        //The database equals a new mysqli with the host, username and password.
        $this->connection = new mysqli($host, $username, $password);
        
if ($this->connection->connect_error) {
    die("<p>Error: . $connection->connect_error" . "</p>");
}
//The existing database is connection and also $database.
$exists = $this->connection->select_db($database);

if (!$exists) {
    $query = $this->connection->query("CREATE DATABASE $database");
//Here we see if the question we ask "if the database was successfull and it was true."
    if ($query) {
        echo "<p>Successfully created database;" . $database . "</p>";
    }
} 
    }
    //Here we are opening the connection
    public function openConnection(){
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->database);
        
        if ($this->connection->connect_error) {
            die("<p>Error: . $this->connection->connect_error" . "</p>");
        }
    }

    //Here we are closing the connection and also the if is checking if the function is set or not
    public function closeConnection(){
        if(isset($this->connection)) {
            $this->connection->close();
        }
    }
    
    public function query($string) {
        $this->openConnection();
        
        $query = $this->connection->query($string);
        //Here we are asking a question if this connection has a error and currently it does not.
        if(!$query) {
           $this->error = $this->connection->error;
        }
        //Overall we close the connection
        $this->closeConnection();
        
        return $query;
    }
}