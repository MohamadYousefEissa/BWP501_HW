<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

session_start();

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "my_auth_db";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if (isset($_SESSION['user_id'])) {
    $user_id = $_SESSION['user_id'];
    $json = $_POST['json'];

    $sql = "REPLACE INTO user_arrays (user_id, array_column) VALUES ($user_id, '$json')";

    if ($conn->query($sql) === TRUE) {
        echo "Record replaced successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Not authenticated";
}

$conn->close();
?>
