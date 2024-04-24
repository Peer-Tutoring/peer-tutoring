<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

require_once('db.php');

$query = "SELECT first_name, last_name, subject, rate FROM tutor ORDER BY first_name";
$result = mysqli_query($conn, $query);

if ($result) {
  $tutors = array();

  while ($row = mysqli_fetch_assoc($result)) {
    $name = $row['first_name'] . ' ' . $row['last_name'];

    // Build the array of tutors with the required fields
    $tutors[] = array(
      'name' => $name,
      'role' => $row['subject'],
      'hourlyRate' => $row['rate']
    );
  }

  // Set the response content type to JSON
  header('Content-Type: application/json');

  // Encode the array of tutors as JSON and echo it
  echo json_encode($tutors);
} else {
  // If the query fails, return an error message
  echo json_encode(array('error' => 'Failed to fetch data from the database'));
}
