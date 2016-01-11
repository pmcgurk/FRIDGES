<?php 
include( "connect.php"); 

if ($_GET[bestbefore] != ""); {
    mysql_query( "UPDATE `Products` SET `BestBefore` = '$_GET[bestbefore]' WHERE `Products`.`pid` = '{$_GET['pid']}';") or die(mysql_error()); 
}
if ($_GET[name] != ""); {
    mysql_query( "UPDATE `Products` SET `Name` = '$_GET[name]' WHERE `Products`.`pid` = '{$_GET['pid']}';") or die(mysql_error()); 
}
echo "Item updated."; 
?>