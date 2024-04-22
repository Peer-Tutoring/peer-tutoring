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
  if (!isset($data['firstName']) || !isset($data['lastName']) || !isset($data['email']) || !isset($data['password'])) {
    $response = array('error' => true, 'message' => 'Required fields are missing');
  } else {
    // Access individual fields
    $firstName = mysqli_real_escape_string($conn, $data['firstName']);
    $lastName = mysqli_real_escape_string($conn, $data['lastName']);
    $email = mysqli_real_escape_string($conn, $data['email']);
    $password = mysqli_real_escape_string($conn, $data['password']);

    // Check if email is already used
    $checkQuery = "SELECT COUNT(*) AS count FROM user WHERE email = '$email'";
    $checkResult = $conn->query($checkQuery);

    if ($checkResult && $checkResult->fetch_assoc()['count'] > 0) {
      $response = array('error' => true, 'message' => 'Email is already in use', 'success' => false);
    } else {
      // Hash the password
      $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

      // Insert data into the database
      $insertQuery = "INSERT INTO user (first_name, last_name, email, password, date_created) VALUES ('$firstName', '$lastName', '$email', '$hashedPassword', NOW())";
      $insertResult = $conn->query($insertQuery);

      if ($insertResult) {
        // Data inserted successfully
        $response = array('message' => 'Account created successfully', 'success' => true);
      } else {
        // Failed to insert data
        $response = array('message' => 'Failed to insert data: ' . $conn->error, 'success' => false);
      }
    }
  }

  echo json_encode($response);
}
