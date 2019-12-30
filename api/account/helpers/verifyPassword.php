<?php
  /**
   * Weryfikuje hasło na podstawie hasha.
   *
   * @param [string] $password
   * @param [string] $hash
   * @return boolean
   */
  function verifyPassword($password, $hash): bool {
    return password_verify($password, $hash);
  }
?>