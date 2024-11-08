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

// SQL query to select the array string from the database
$sql = "SELECT array_column FROM your_table WHERE id = 1"; // Replace '1' with the actual id if necessary
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $json = $row['array_column'];
        
        // Output JSON directly
        echo $json;
    }
} else {
    echo json_encode([]);
}

$conn->close();
?>
