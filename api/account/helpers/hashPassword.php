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
?>