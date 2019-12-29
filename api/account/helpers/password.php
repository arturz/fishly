<?php
  /**
   * Zwraca hash hasła zaszyfrowanego Argonem2ID.
   * Hash może być różny dla tego samego hasła.
   *
   * @param [string] $password
   * @return string
   */
  function hashPassword($password): string {
    return password_hash($password, PASSWORD_ARGON2ID);
  }

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