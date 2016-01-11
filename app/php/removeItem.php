<?php

include("connect.php");
$result = mysql_query("DELETE FROM `Products` WHERE `pid` = '$_GET[pid]'") or die(mysql_error());
echo "item removed successfully";

?>
