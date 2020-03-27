<?php
  require_once '../core.php';

  $user = new User();
  if(!$user->isLogged())
    throwError('Zaloguj się');

  if(empty($_POST['setId']))
    throwError('Brakujące dane');

  $userId = $user->userId;
  $setId = $_POST['setId'];

  $stmt = $pdo->prepare("SELECT * FROM `reported_set` WHERE user_id = ? AND set_id = ?");
  $stmt->execute([$userId, $setId]);

  if($stmt->fetch())
    throwError('Już zgłoszono');

  $stmt = $pdo->prepare("INSERT INTO `reported_set` (user_id, set_id) VALUES (?,?)");
  $stmt->execute([$userId, $setId]);

  success();
?>