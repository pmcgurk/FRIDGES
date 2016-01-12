<?php

include("connect.php");
$result = mysql_query("SELECT * FROM Products ORDER BY BestBefore ASC") or die(mysql_error());
echo "<products>";
while ($row = mysql_fetch_array($result)) {
    echo "<product>";
    echo "<pid>{$row[0]}</pid>";
    echo "<name>{$row[1]}</name>";
    echo "<date>{$row[2]}</date>";
    echo "<uid>{$row[4]}</uid>";
    $row2 = mysql_fetch_array(mysql_query("SELECT * FROM User WHERE Uid = '{$row[4]}'"));
    echo "<uname>{$row2[1]}</uname>";
    echo "</product>";
}
echo "</products>";

?>
