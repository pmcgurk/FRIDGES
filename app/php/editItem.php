<?php 
include( "connect.php"); 
mysql_query( "UPDATE `Products` SET `BestBefore` = '$_GET[bestbefore]' WHERE `Products`.`pid` = '{$_GET['pid']}';") or die(mysql_error()); 
mysql_query( "UPDATE `Products` SET `Name` = '$_GET[name]' WHERE `Products`.`pid` = '{$_GET['pid']}';") or die(mysql_error()); 
echo "Item updated."; 
?>