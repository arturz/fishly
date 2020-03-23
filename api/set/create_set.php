<?php
  require_once '../core.php';

  $user = new User();
  if(!$user->isLogged())
    throwError('Zaloguj się');

  
?>