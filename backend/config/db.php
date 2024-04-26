<?php

require __DIR__ . '/../vendor/autoload.php';

use Dotenv\Dotenv as Dotenv;

$dotenv = Dotenv::createImmutable(__DIR__ . '/../');
$dotenv->load();

$db_host = $_ENV['HOSTNAME'];
$db_user = $_ENV['DB_USER'];
$db_password = $_ENV['DB_PASSWORD'];
$db_name = $_ENV['DB_NAME'];
$db_port = $_ENV['SQL_PORT'];

$conn = new mysqli($db_host, $db_user, $db_password, $db_name, $db_port);

if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
} else {
  echo "Successfully connected to the database.";
}
