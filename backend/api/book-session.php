<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('db.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $inputData = file_get_contents('php://input');
  $data = json_decode($inputData, true);

  // Check if all required fields are present
  if (!isset($data['starting_time']) || !isset($data['duration']) || !isset($data['student_id']) || !isset($data['tutor_id']) || !isset($data['rate'])) {
    $response = array('error' => true, 'message' => 'Required fields are missing', 'success' => false);
  } else {
    // Sanitize input data
    $startingTime = mysqli_real_escape_string($conn, $data['starting_time']);
    $duration = mysqli_real_escape_string($conn, $data['duration']);
    $studentId = mysqli_real_escape_string($conn, $data['student_id']);
    $tutorId = mysqli_real_escape_string($conn, $data['tutor_id']);
    $rate = mysqli_real_escape_string($conn, $data['rate']);
    $dateCreated = date('Y-m-d H:i:s');

    // Insert session data into the session table
    $insertQuery = "INSERT INTO session (starting_time, duration, student_id, tutor_id, rate, date_created) VALUES ('$startingTime', '$duration', '$studentId', '$tutorId', '$rate', '$dateCreated')";
    $insertResult = $conn->query($insertQuery);

    if ($insertResult) {
      $response = array('error' => false, 'message' => 'Session inserted successfully', 'success' => true);
    } else {
      $response = array('error' => true, 'message' => 'Failed to insert session: ' . $conn->error, 'success' => false);
    }
  }

  echo json_encode($response);
}
