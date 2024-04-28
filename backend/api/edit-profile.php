<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('../config/db.php');

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  $inputData = file_get_contents('php://input');

  $data = json_decode($inputData, true);

  if (!isset($data['userId'])) {
    $response = array('error' => true, 'message' => 'User ID is missing', 'success' => false);
  } else {
    $userId = mysqli_real_escape_string($conn, $data['userId']);
    $firstName = isset($data['first_name']) ? mysqli_real_escape_string($conn, $data['first_name']) : null;
    $lastName = isset($data['last_name']) ? mysqli_real_escape_string($conn, $data['last_name']) : null;
    $email = isset($data['email']) ? mysqli_real_escape_string($conn, $data['email']) : null;

    // Check if the email is already in use by another user
    $emailCheckQuery = "SELECT COUNT(*) AS count
    FROM (
        SELECT email
        FROM tutor
        UNION ALL
        SELECT email
        FROM student
    ) AS emails
    WHERE email = '$email'
    AND NOT EXISTS (
        SELECT 1
        FROM (
            SELECT email
            FROM tutor
            WHERE tutor_id = '$userId'
            UNION ALL
            SELECT email
            FROM student
            WHERE student_id = '$userId'
        ) AS currentUser
        WHERE emails.email = currentUser.email
    )
    ";
    $emailCheckResult = $conn->query($emailCheckQuery);
    $emailExists = $emailCheckResult->fetch_assoc()['count'] > 0;

    if ($emailExists) {
      $response = array('error' => true, 'message' => 'Email is already in use by another user', 'success' => false);
    } else {
      // Check if the user exists in the tutor table
      $checkTutorQuery = "SELECT COUNT(*) AS count FROM tutor WHERE tutor_id = '$userId'";
      $checkTutorResult = $conn->query($checkTutorQuery);

      // Check if the user exists in the student table
      $checkStudentQuery = "SELECT COUNT(*) AS count FROM student WHERE student_id = '$userId'";
      $checkStudentResult = $conn->query($checkStudentQuery);

      if ($checkTutorResult && $checkTutorResult->fetch_assoc()['count'] > 0) {
        $tableName = "tutor";
      } elseif ($checkStudentResult && $checkStudentResult->fetch_assoc()['count'] > 0) {
        $tableName = "student";
      }

      if (isset($tableName)) {
        // Construct and execute the update query
        $updateQuery = "UPDATE $tableName SET";
        if ($firstName !== null) $updateQuery .= " first_name = '$firstName',";
        if ($lastName !== null) $updateQuery .= " last_name = '$lastName',";
        if ($email !== null) $updateQuery .= " email = '$email',";
        $updateQuery = rtrim($updateQuery, ","); // Remove trailing comma
        $updateQuery .= " WHERE " . $tableName . "_id = '$userId'";

        // Execute the update query
        $updateResult = $conn->query($updateQuery);
        if ($updateResult) {
          $response = array('error' => false, 'message' => 'Profile updated successfully', 'success' => true);
        } else {
          $response = array('error' => true, 'message' => 'Failed to update profile: ' . $conn->error, 'success' => false);
        }
      } else {
        $response = array('error' => true, 'message' => 'User not found', 'success' => false);
      }
    }
  }

  echo json_encode($response);
}
