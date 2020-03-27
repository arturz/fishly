<?php
  include_once '../../core.php';

  $user = new User();
  if(!$user->isLogged())
    throwError('Zaloguj się');

  if(User::getStatusName($user->status) !== 'admin' && User::getStatusName($user->status) !== 'head_admin')
    throwError('Nie masz uprawnień');

  $stmt = $pdo->query("SELECT s.set_id as set_id, name FROM `reported_set` rs INNER JOIN `set` s ON rs.set_id = s.set_id");

  $sets = [];
  while($row = $stmt->fetch(PDO::FETCH_ASSOC)){
    $sets[] = $row;
  }
  
  echo json_encode($sets);
?>