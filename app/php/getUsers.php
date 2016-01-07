<?php

include("connect.php");
$result = mysql_query("SELECT * FROM User") or die(mysql_error());
echo "<users>";
while ($row = mysql_fetch_array($result)) {
    echo "<user>";
    echo "<id>{$row[0]}</id>";
    echo "<name>{$row[1]}</name>";
    echo "</user>";
}
echo "</users>";

?>