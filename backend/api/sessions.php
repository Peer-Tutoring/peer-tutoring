<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('../config/db.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $data = json_decode(file_get_contents('php://input'), true);

  if (isset($data['user_id'])) {
    $user_id = $data['user_id'];

    $query = "SELECT 
                s.session_id,
                s.starting_time,
                s.duration,
                CONCAT(t.first_name, ' ', t.last_name) AS tutor_name,
                CONCAT(SUBSTRING(t.first_name, 1, 1), SUBSTRING(t.last_name, 1, 1)) AS tutor_initials,
                CONCAT(st.first_name, ' ', st.last_name) AS student_name,
                CONCAT(SUBSTRING(st.first_name, 1, 1), SUBSTRING(st.last_name, 1, 1)) AS student_initials,
                t.subject
              FROM session s
              INNER JOIN tutor t ON s.tutor_id = t.tutor_id
              INNER JOIN student st ON s.student_id = st.student_id
              WHERE s.student_id = '$user_id' OR s.tutor_id = '$user_id'
              ORDER BY s.starting_time";

    $result = mysqli_query($conn, $query);

    if ($result) {
      $sessions = array();

      while ($row = mysqli_fetch_assoc($result)) {
        // Derive session_date from starting_time
        $starting_time = strtotime($row['starting_time']);
        $session_date = date('F j, Y', $starting_time);

        // Calculate end time from starting_time and duration (in hours)
        $duration_hours = $row['duration'];
        $end_time = strtotime("+" . $duration_hours . " hours", $starting_time);
        $end_time_formatted = date('g:i A', $end_time);

        // Format session_time as "starting_time - end_time"
        $session_time = date('g:i A', $starting_time) . " - " . $end_time_formatted;

        $sessions[] = array(
          'session_id' => $row['session_id'],
          'session_date' => $session_date,
          'session_time' => $session_time,
          'tutor_name' => $row['tutor_name'],
          'tutor_initials' => $row['tutor_initials'],
          'student_name' => $row['student_name'],
          'student_initials' => $row['student_initials'],
          'subject' => $row['subject']
        );
      }

      header('Content-Type: application/json');

      echo json_encode($sessions);
    } else {
      echo json_encode(array('error' => 'Failed to fetch data from the database'));
    }
  } else {
    echo json_encode(array('error' => 'User ID is not provided'));
  }
} else {
  echo json_encode(array('error' => 'Invalid request method'));
}
