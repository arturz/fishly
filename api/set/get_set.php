<?php
  require_once '../core.php';

  $setId = $_GET['setId'];

  $stmt = $pdo->prepare("SELECT set_id, name, subject, user_id, login FROM `set` s INNER JOIN `user` u ON s.created_by = u.user_id WHERE s.set_id = ?");
  $stmt->execute([$setId]);

  $set = $stmt->fetch(PDO::FETCH_ASSOC);
  $set['words'] = [];

  $stmt = $pdo->prepare("SELECT word_id, original, translated FROM `word` WHERE set_id = ?");
  $stmt->execute([$setId]);

  while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $set['words'][] = $row;
  }
  
  echo json_encode($set);
?>