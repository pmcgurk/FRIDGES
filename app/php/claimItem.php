<?php 
include( "connect.php"); 
mysql_query( "UPDATE `Products` SET `Uid` = '$_GET[owner]' WHERE `Products`.`pid` = '{$_GET['pid']}';") or die(mysql_error()); 
echo "Item updated."; 
?>