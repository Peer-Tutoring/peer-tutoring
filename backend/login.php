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
  if (!isset($data['identifier']) || !isset($data['password'])) {
    $response = array('error' => true, 'message' => 'Email/Name or Password is missing', 'success' => false);
  } else {
    // Access individual fields
    $identifier = mysqli_real_escape_string($conn, $data['identifier']);
    $password = mysqli_real_escape_string($conn, $data['password']);

    // Check if identifier exists as either name or email
    $checkQuery = "SELECT * FROM user WHERE name = '$identifier' OR email = '$identifier'";
    $checkResult = $conn->query($checkQuery);

    if ($checkResult && $checkResult->num_rows > 0) {
      // User found, verify password
      $user = $checkResult->fetch_assoc();
      if (password_verify($password, $user['password'])) {
        // Password is correct
        $response = array('error' => false, 'message' => 'Login successful', 'user' => $user, 'success' => true, 'user' => array('id' => $user['id'], 'name' => $user['name'], 'email' => $user['email']));
      } else {
        // Password is incorrect
        $response = array('error' => true, 'message' => 'Incorrect password', 'success' => false);
      }
    } else {
      // User not found
      $response = array('error' => true, 'message' => 'Incorrect email or name', 'success' => false);
    }
  }

  echo json_encode($response);
}
