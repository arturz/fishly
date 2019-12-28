<?php
  $host = 'localhost';
  $dbname = 'fishly';
  $dbuser = 'root';
  $dbpassword = '';
  
  try {
    $pdo = new PDO("mysql:host=".$host.";dbname=".$dbname, $dbuser, $dbpassword);
  } catch(PDOException $e) {
    echo "Error: " . $e->getMessage();
  }
?>