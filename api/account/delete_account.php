<?php
  include_once '../core.php';
  include_once './helpers/verifyPassword.php';

  $user = getUser();
  if(!$user)
    throwError('Zaloguj się');

  /**
   * Admin usuwa użytkownika - trzeba sprawdzić czy jest adminem i usunąć link aktywacyjny użytkownika (jeśli użytkownik nie jest aktywowany).
   */
  if(isset($_POST['userId'])){
    if($user['status'] !== array_search('admin', $userStatuses) && $user['status'] !== array_search('head_admin', $userStatuses))
      throwError('Nie masz uprawnień');

    $userIdToDelete = $_POST['userId'];

    /**
     * Zmiana stanu konta na usunięte.
     */
    $stmt = $pdo->prepare('UPDATE user SET status = ? WHERE user_id = ?');
    $stmt->execute([array_search('deleted', $userStatuses), $userIdToDelete]);
    if($stmt->rowCount() === 0)
      throwError('Nie można usunąć');

    /**
     * Usunięcie linku aktywacyjnego, o ile konto nie było wcześniej aktywowane.
     */
    $pdo
      ->prepare('DELETE FROM registration_confirm_hash WHERE user_id = ?')
      ->execute([$userIdToDelete]);

    success();
  }

  /**
   * Użytkownik usuwa sam siebie.
   */
  if(!empty($_POST['password'])){
    /**
     * Użytkownik musi podać swoje hasło jeśli chce usunąć konto.
     */
    $passsword = $_POST['password'];
    $stmt = $pdo->prepare('SELECT hashed_password FROM user WHERE user_id = ?');
    $stmt->execute([$user['userId']]);
    if(!verifyPassword($passsword, $stmt->fetch()['hashed_password']))
      throwError('Podałeś złe hasło.');

    /**
     * Zmiana stanu konta na usunięte.
     */
    $stmt = $pdo->prepare('UPDATE user SET status = ? WHERE user_id = ?');
    $stmt->execute([array_search('deleted', $userStatuses), $user['userId']]);
    if($stmt->rowCount() === 0)
      throwError('Nie można usunąć');
      
    session_destroy();
    success();
  }
  
  throwError('Brakujące dane');
?>