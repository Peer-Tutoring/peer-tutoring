<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  require_once('../config/db.php');

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

    // Check if email exists in tutor table
    $checkTutorQuery = "SELECT tutor_id, first_name, last_name, email, subject, rate, password FROM tutor WHERE email = '$email'";
    $checkTutorResult = $conn->query($checkTutorQuery);

    // Check if email exists in student table
    $checkStudentQuery = "SELECT student_id, first_name, last_name, email, password FROM student WHERE email = '$email'";
    $checkStudentResult = $conn->query($checkStudentQuery);

    if (($checkTutorResult && $checkTutorResult->num_rows > 0) || ($checkStudentResult && $checkStudentResult->num_rows > 0)) {
      // Email exists in either tutor or student table
      if ($checkTutorResult && $checkTutorResult->num_rows > 0) {
        // Email exists in tutor table, verify password
        $tutor = $checkTutorResult->fetch_assoc();
        if (password_verify($password, $tutor['password'])) {
          // Password is correct
          $response = array('error' => false, 'message' => 'Login successful', 'user' => array('id' => $tutor['tutor_id'], 'first_name' => $tutor['first_name'], 'last_name' => $tutor['last_name'], 'email' => $tutor['email'], 'subject' => $tutor['subject'], 'rate' => $tutor['rate']), 'success' => true, 'isStudent' => false, 'isTutor' => true);
        } else {
          // Password is incorrect
          $response = array('error' => true, 'message' => 'Incorrect password', 'success' => false);
        }
      } else {
        // Email exists in student table, verify password
        $student = $checkStudentResult->fetch_assoc();
        if (password_verify($password, $student['password'])) {
          // Password is correct
          $response = array('error' => false, 'message' => 'Login successful', 'user' => array('id' => $student['student_id'], 'first_name' => $student['first_name'], 'last_name' => $student['last_name'], 'email' => $student['email']), 'success' => true, 'isStudent' => true, 'isTutor' => false);
        } else {
          // Password is incorrect
          $response = array('error' => true, 'message' => 'Incorrect password', 'success' => false);
        }
      }
    } else {
      // Email does not exist in either tutor or student table
      $response = array('error' => true, 'message' => 'Incorrect email', 'success' => false);
    }
  }

  echo json_encode($response);
}
