<?php
  require_once '../core.php';
  require_once './helpers/verifyPassword.php';

  if(empty($_POST['login']))
    throwError('Nie ma loginu');

  if(empty($_POST['password']))
    throwError('Nie ma hasła');

  $login = $_POST['login'];
  $password = $_POST['password'];

  $stmt = $pdo->prepare('SELECT hashed_password FROM user WHERE login = ? AND status <> ?');
  $stmt->execute([$login, UserStatuses::getStatusIndex('deleted')]);
  $row = $stmt->fetch();
  if(!$row || !verifyPassword($password, $row['hashed_password']))
    throwError('Złe dane');
  
  $stmt = $pdo->prepare('SELECT * FROM user WHERE login = ? AND status <> ?');
  $stmt->execute([$login, UserStatuses::getStatusIndex('deleted')]);
  $row = $stmt->fetch();

  $user = new User();
  echo $user->logUser($row);
?>