<?php
  require_once '../core.php';

  $user = new User();
  if(!$user->isLogged())
    throwError('Zaloguj się');

  $userId = $user->userId;

  if(!isset($_POST['setId']))
    throwError('Brakujące dane');

  $setId = $_POST['setId'];

  $stmt = $pdo->prepare("SELECT created_by FROM `set` WHERE set_id = ?");
  $stmt->execute([$setId]);

  if(intval(($stmt->fetch(PDO::FETCH_ASSOC))['created_by']) !== intval($userId))
    throwError('Nie masz dostępu');
    
  
  $pdo->beginTransaction();

  $stmt = $pdo->prepare("DELETE FROM `set` WHERE set_id = ?");
  $stmt->execute([$setId]);

  $stmt = $pdo->prepare("DELETE FROM `word` WHERE set_id = ?");
  $stmt->execute([$setId]);

  $stmt = $pdo->prepare("DELETE FROM `saved_set` WHERE set_id = ?");
  $stmt->execute([$setId]);

  $stmt = $pdo->prepare("DELETE FROM `reported_set` WHERE set_id = ?");
  $stmt->execute([$setId]);
 
  $pdo->commit();

  success();
?>