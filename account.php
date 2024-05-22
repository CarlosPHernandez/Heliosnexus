<?php
    session_start();

    if(isset($_SESSION["user_id"])) {
        $mysqli = require __DIR__ . "/database.php";
        $sql = "SELECT * FROM user
                WHERE id = {$_SESSION["user_id"]}";
        $result = $mysqli->query($sql);

        $user = $result->fetch_assoc();
    }

?>


<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta http-equiv="X-UA-Compatible" content="IE-edge">
        <title>
            Helios Account
        </title>
        <link rel="stylesheet" href="index.css">
    </head>
    
    <body>
        <header class="header">
            <a href="#" class="logo">Helios</a>

            <nav class="navbar">
                <?php if(isset($user)): ?>
                <a href="logout.php">Logout</a>
                <?php else: ?>
                <a href="signin.php">Sign in</a>
                <?php endif ?>

                <a href="#" class="active">Instant Quote</a>
                <a href="careers.html">Join Our Startup</a>
                <a href="#">About Us</a>
            </nav>
        </header>

    <main>

    <?php if(isset($user)): ?>

        <section class="account">
            <div class="account-content">
                <h1>Hello <?php htmlspecialchars($user["fname"]) ?></h1>
                <div class="account-info">
                    
                </div>   
            </div>
        </section>
    <?php else: ?>
        <p>Session expired. Please log in.</p>
    <?php endif; ?>

    </main>
    </body>
</html>
