<?php
  require_once '../core.php';

  if(empty($_GET['hash']))
    throwError('Nie ma hasha');

  $hash = $_GET['hash'];

  $stmt = $pdo->prepare('SELECT user_id FROM registration_confirm_hash WHERE hash = ?');
  $stmt->execute([$hash]);
  $row = $stmt->fetch();
  if(!$row)
    throwError('Hash jest błędny');

  $userId = $row['user_id'];

  $pdo
    ->prepare('UPDATE user SET status = ? WHERE user_id = ?')
    ->execute([UserStatuses::getStatusIndex('user'), $userId]);

  $pdo
    ->prepare('DELETE FROM registration_confirm_hash WHERE hash = ?')
    ->execute([$hash]);

  header("Refresh:1; url=$url");
  exit("Aktywuję konto...");
?>