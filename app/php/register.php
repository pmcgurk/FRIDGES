<?php

include("connect.php");

// check if duplicate email
$countE =  mysql_query("SELECT COUNT(*) FROM User WHERE Name = '{$_GET['name']}'") or die(mysql_error());
$query_rowE =mysql_fetch_array($countE);
$emailExists = $query_rowE[0];
if ($emailExists == 0) {
    // if not save to database
    $insert = mysql_query("INSERT into User(Name) values ('{$_GET['name']}');") or die(mysql_error());
    echo "Registered Suggestfully";
} else {
    echo "Username already registered to another user.";
}
?>