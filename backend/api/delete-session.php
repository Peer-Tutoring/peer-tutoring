<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('../config/db.php');

if ($_SERVER["REQUEST_METHOD"] === "DELETE") {
  $inputData = file_get_contents('php://input');
  $data = json_decode($inputData, true);

  if (!isset($data['session_id'])) {
    $response = array('error' => true, 'message' => 'Session ID is missing', 'success' => false);
  } else {
    $session_id = mysqli_real_escape_string($conn, $data['session_id']);

    $checkQuery = "SELECT * FROM session WHERE session_id = '$session_id'";
    $checkResult = $conn->query($checkQuery);

    if ($checkResult->num_rows > 0) {
      $deleteQuery = "DELETE FROM session WHERE session_id = '$session_id'";
      $deleteResult = $conn->query($deleteQuery);

      if ($deleteResult) {
        $response = array('error' => false, 'message' => 'Session deleted successfully', 'success' => true);
      } else {
        $response = array('error' => true, 'message' => 'Failed to delete session: ' . $conn->error, 'success' => false);
      }
    } else {
      $response = array('error' => true, 'message' => 'Session not found', 'success' => false);
    }
  }

  echo json_encode($response);
}
