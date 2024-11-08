<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "my_auth_db";
// $servername = "sql211.infinityfree.com";
// $username = "if0_37678720";
// $password = "ySBX2P8cun1f3p";
// $dbname = "if0_37678720_data_base";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>