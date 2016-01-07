<?php 
include( "connect.php"); 
session_start(); 
if ($_GET[ 'status']==1 ) { 
    mysql_query( "UPDATE `root`.`Products` SET `pid` = `pid` WHERE `Products`.`pid` = '{$_GET['pid']}';") or die(mysql_error()); 
    echo "PID {$_GET['pid']} updated."; 
} 
?>