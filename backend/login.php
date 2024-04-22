<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  require_once('db.php');

  // Read raw JSON data from the request body
  $inputData = file_get_contents('php://input');

  // Decode JSON data
  $data = json_decode($inputData, true);

  // Check if required fields are set
  if (!isset($data['email']) || !isset($data['password'])) {
    $response = array('error' => true, 'message' => 'Email or Password is missing', 'success' => false);
  } else {
    // Access individual fields
    $email = mysqli_real_escape_string($conn, $data['email']);
    $password = mysqli_real_escape_string($conn, $data['password']);

    // Check if email exists
    $checkQuery = "SELECT * FROM user WHERE email = '$email'";
    $checkResult = $conn->query($checkQuery);

    if ($checkResult && $checkResult->num_rows > 0) {
      // User found, verify password
      $user = $checkResult->fetch_assoc();
      if (password_verify($password, $user['password'])) {
        // Password is correct
        $response = array('error' => false, 'message' => 'Login successful', 'user' => array('id' => $user['id'], 'email' => $user['email']), 'success' => true);
      } else {
        // Password is incorrect
        $response = array('error' => true, 'message' => 'Incorrect password', 'success' => false);
      }
    } else {
      // User not found
      $response = array('error' => true, 'message' => 'Incorrect email', 'success' => false);
    }
  }

  echo json_encode($response);
}
