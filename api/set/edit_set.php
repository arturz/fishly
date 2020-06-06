<?php
  require_once '../core.php';

  $user = new User();
  if(!$user->isLogged())
    throwError('Zaloguj się');

  $userId = $user->userId;

  if(empty($_POST['name']) || empty($_POST['subject']) || empty($_POST['words']) || !isset($_POST['setId']))
    throwError('Brakujące dane');

  $setId = $_POST['setId'];

  $stmt = $pdo->prepare("SELECT created_by FROM `set` WHERE set_id = ?");
  $stmt->execute([$setId]);

  if(intval(($stmt->fetch(PDO::FETCH_ASSOC))['created_by']) !== intval($userId))
    throwError('Nie masz dostępu');
    
  $pdo->beginTransaction();

  $name = mb_substr($_POST['name'], 0, 50, "utf-8");
  $subject = mb_substr($_POST['subject'], 0, 20, "utf-8");
  $words = $_POST['words'];

  $stmt = $pdo->prepare("UPDATE `set` SET name = ?, subject = ? WHERE set_id = ?");
  $stmt->execute([$name, $subject, $setId]);

  foreach($words as $word){
    $pdo
      ->prepare('UPDATE word SET original = ?, translated = ? WHERE set_id = ? AND word_id = ?')
      ->execute([$word['original'], $word['translated'], $setId, $word['word_id']]);
  }

  $pdo->commit();

  echo json_encode([ 'setId' => $setId ]);
?>