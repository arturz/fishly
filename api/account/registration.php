<?php
  header('Content-type: text/plain; charset=utf-8');
  require_once '../utils.php';
  require_once '../captcha.php';
  require_once '../pdo.php';

  if(!isValidCaptcha($_POST['captcha']))
    throwError('Zła captcha');

  if(empty($_POST['login']))
    throwError('Brakujący login');

  if(empty($_POST['password']))
    throwError('Brakujące hasło');

  if(empty($_POST['mail']))
    throwError('Brakujący mail');

  if(empty($_POST['firstname']))
    throwError('Brakujące imię');

  if(empty($_POST['lastname']))
    throwError('Brakujące nazwisko');

  $login = $_POST['login'];
  $password = $_POST['password'];
  $mail = $_POST['mail'];
  $firstname = $_POST['firstname'];
  $lastname = $_POST['lastname'];

  echo json_encode(['success' => true])
?>