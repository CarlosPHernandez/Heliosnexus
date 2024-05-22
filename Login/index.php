<?php
    session_start();

?>

<!DOCTYPE html>
<html>
    <head>
        <title>Welcome</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://unpkg.com/axist@latest/dist/axist.min.css" />
    </head>

<body>

    <?php if(issset($_SESSION["user_id"])): ?>

    <h1>Welcome</h1>
    <p>Please begin by getting a quote or logging in to continue</p>
    <a href="signup.html">Sign up</a>
    <a href="login.html">Log in</a>
    <a href="quote.html">Quote</a>
 
</body>
</html>
