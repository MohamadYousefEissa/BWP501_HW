<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "my_database";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get JSON string from POST request
$json = $_POST['json'];

// SQL query to replace the existing row with id=1
$sql = "REPLACE INTO your_table (id, array_column) VALUES (1, '$json')";

if ($conn->query($sql) === TRUE) {
    echo "Record replaced successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
