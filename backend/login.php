<?php
header("Access-Control-Allow-Origin: *"); // replace the asterisk with domain in production
header("Access-Control-Allow-Credentials: true");
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
        // Generate a unique session_id
        $session_id = bin2hex(random_bytes(25));
        // Set the session expiration time to 7 days in the future
        $expires_at = date('Y-m-d H:i:s', strtotime('+7 days'));

        // Insert new session record into the session table
        $insertSessionQuery = "INSERT INTO session (session_id, user_id, expires_at) VALUES ('$session_id', {$user['id']}, '$expires_at')";
        $insertResult = $conn->query($insertSessionQuery);

        if ($insertResult) {
          // Set the session cookie to expire in 7 days
          setcookie('session_id', $session_id, [
            'expires' => time() + (7 * 24 * 60 * 60), // 7 days
            'path' => '/',
            // 'secure' => true, // Uncomment this when using HTTPS
            'httponly' => true, // Help prevent XSS
            'samesite' => 'Strict' // Further CSRF protection
          ]);

          // Insert successful
          $response = array('error' => false, 'message' => 'Login successful', 'success' => true);
        } else {
          // Failed to insert session
          $response = array('error' => true, 'message' => 'Failed to create session', 'success' => false);
        }
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
