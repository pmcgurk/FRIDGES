<?php

include("connect.php");
$result = mysql_query("SELECT * FROM Products") or die(mysql_error());
echo "<products>";
while ($row = mysql_fetch_array($result)) {
    echo "<product>";
    echo "<pid>{$row[0]}</pid>";
    echo "<name>{$row[1]}</name>";
    echo "<date>{$row[2]}</date>";
    echo "</product>";
}
echo "</products>";

?>
