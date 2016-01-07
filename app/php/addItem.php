<?php

include("connect.php");

$insert = mysql_query("INSERT into Products(Name, BestBefore, Barcode, Uid) values ('{$_GET['name']}', '{$_GET['bestbefore']}', '{$_GET['barcode']}', '{$_GET['uid']}');") or die(mysql_error());
echo "Added Successfully";

?>