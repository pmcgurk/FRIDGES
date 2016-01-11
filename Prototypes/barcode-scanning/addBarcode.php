<?php
include("connect.php");

$insert = mysql_query("INSERT into Products(Name, BestBefore, Barcode, Uid) values ('{$_GET['name']}', '""', '{$_GET['barcode']}', '""');") or die(mysql_error());
echo "Added Successfully";

 ?>
