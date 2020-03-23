<?php
  require_once '../core.php';

  $name = $_GET['name'];

  $stmt = $pdo->prepare("SELECT set_id, name, subject FROM `set` WHERE `name` LIKE ?");
  $stmt->execute(["%$name%"]);

  $sets = [];
  while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $sets[] = $row;
  }
  
  echo json_encode($sets);
?>