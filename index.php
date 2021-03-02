<?php
  include_once 'api/User.php';

  $user = new User();
  if($user->isLogged()){
    $userData = $user->getUserData();
    $token = $user->getToken();
  } else {
    $userData = null;
    $token = null;
  }

  $captchaSiteKey = getenv('CAPTCHA_SITE_KEY');
  if($captchaSiteKey == false)
    $captchaSiteKey = '6Le7sG4aAAAAAJz46ddHqzDhLXJq7hARw_8c_0YG'; //for development
?>
<!doctype html>
<html lang="en">
  <head>
    <title>Fishly</title>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="icon" href="app/assets/icon.svg" type="image/svg+xml" />
  </head>
  <script type="text/javascript">
    var app = { 
      user: <?php echo json_encode($userData); ?>,
      token: <?php echo json_encode($token); ?>,
      captchaSiteKey: <?php echo json_encode($captchaSiteKey); ?>
    };
  </script>
  <body>
    <div id="app"></div>
<?php
  if(in_array($_SERVER['REMOTE_ADDR'], ['127.0.0.1', '::1']))
    echo '<script type="text/javascript" src="./app/assets/bundle/main.bundle.js"></script>';
  else
    echo '<script type="text/javascript" src="/app/assets/bundle/main.bundle.js"></script>';
?>
  </body>
</html>
