<?php

// ensuring the name is not empty
if(empty($_POST["name"])){
    //die("Name is required");
}

// ensuring password is strong
if(strlen($_POST["password"]) < 8){
    //die("Password must be atleast 8 characters");
}
if(!preg_match("/[a-z]/i", $_POST["password"])){
    //die("Password must contain at least one letter");
}
if(!preg_match("/[0-9]/", $_POST["password"])){
    //die("Password must contain at least one number");
}

// making sure confirm password == password
if($_POST["password"] != $_POST["password_confirmation"]){
    //die("Passwords must match");
}

// hashing the password
$hash_password = password_hash($_POST["password"], PASSWORD_DEFAULT);
//var_dump($password_hash);

// getting directory object of database
$mysqli = require __DIR__ . "/database.php";

// creating a string to call into sql
$sql = "INSERT INTO user (name, email, hash_password) VALUES (?, ?, ?)";
$stmt = $mysqli->stmt_init();

// if this is false there is an error in the sql connection
if(!$stmt->prepare($sql)){
    die("SQL error: " . $mysqli->error);
}

$stmt->bind_param("sss", $_POST["name"], $_POST["email"], $hash_password);

if($stmt->execute()){
    header("Location: signup-success.html");
    exit;
}
else if($mysqli->errno === 1062){
    die("Email already taken");
}
else {
    die($mysqli->erro . " " . $mysqli->errno);
}