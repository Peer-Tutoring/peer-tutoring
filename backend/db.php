<?php

$db_host = "localhost";
$db_user = "root";
$db_password = "";
$db_name = "mydb";
$db_port = $_ENV['SQL_PORT'];

$conn = new mysqli($db_host, $db_user, $db_password, $db_name, $db_port);

if (!$conn) {
  die();
}
