<!-- We are now entering the config file.-->
<?php
require_once(__DIR__ . "/../model/config.php");
//authenticateUser is set to the authenticated database.
function authenticateUser() {
    if(!isset($_SESSION["authenticated"])) {
        return false;
    }
    //Here its saying return true  or false if the $_SESSION is authenticated or not and its true.
    else {
        if($_SESSION["authenticated"] != true) {
            return false;
        }  
        else{
            return true;
        }
    }
}

