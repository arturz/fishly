<?php
  /**
   * Kończy działanie skryptu i wyświetla błąd w formacie JSON { error: $name }
   *
   * @param [string] $name
   * @return void
   */
  function throwError($name){
    die(json_encode([ 'error' => $name ]));
  }

  /**
   * Pozytywnie kończy działanie skryptu i wyświetla JSON { success: true }
   *
   * @param [string] $name
   * @return void
   */
  function success(){
    die(json_encode([ 'success' => true ]));
  }

  /**
   * Zwraca ciąg losowych znaków o podanej długości
   *
   * @param [integer] $length
   * @return string
   */
  function getRandomText($length){
    return bin2hex(random_bytes(intdiv($length, 2)));
  }
?>