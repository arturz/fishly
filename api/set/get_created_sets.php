<?php
  require_once '../core.php';

  $user = new User();
  if(!$user->isLogged())
    throwError('Zaloguj się');

  $stmt = $pdo->prepare("SELECT set_id, name, subject FROM `set` WHERE `created_by` = ?");
  $stmt->execute([$user->userId]);

  $sets = [];
  while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $sets[] = $row;
  }
  
  echo json_encode($sets);
?>