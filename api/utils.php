<?php
  function throwError($name){
    die(json_encode([ 'error' => $name ]));
  }
?>