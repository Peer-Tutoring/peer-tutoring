<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('db.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Read raw JSON data from the request body
  $inputData = file_get_contents('php://input');

  // Decode JSON data
  $data = json_decode($inputData, true);

  // Check if required fields are set
  if (!isset($data['name']) || !isset($data['email']) || !isset($data['password'])) {
    $response = array('error' => true, 'message' => 'Required fields are missing');
  } else {
    // Access individual fields
    $name = mysqli_real_escape_string($conn, $data['name']);
    $email = mysqli_real_escape_string($conn, $data['email']);
    $password = mysqli_real_escape_string($conn, $data['password']);

    // Check if name or email is already used
    $checkQuery = "SELECT COUNT(*) AS count FROM user WHERE name = '$name' OR email = '$email'";
    $checkResult = $conn->query($checkQuery);

    if ($checkResult && $checkResult->fetch_assoc()['count'] > 0) {
      $response = array('error' => true, 'message' => 'Name or Email is already in use');
    } else {
      // Hash the password
      $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

      // Insert data into the database
      $insertQuery = "INSERT INTO user (name, email, password) VALUES ('$name', '$email', '$hashedPassword')";
      $insertResult = $conn->query($insertQuery);

      if ($insertResult) {
        // Data inserted successfully
        $response = array('error' => false, 'message' => 'Data received and inserted successfully');
      } else {
        // Failed to insert data
        $response = array('error' => true, 'message' => 'Failed to insert data: ' . $conn->error);
      }
    }
  }

  echo json_encode($response);
}
