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
            Helios Nexus Main Home
        </title>
        <link rel="stylesheet" href="index.css">
    </head>
    
    <body>
        <header class="header">
            <a href="#" class="logo">Helios</a>

            <nav class="navbar">
                <a href="#" class="active">Instant Quote</a>
                <a href="signin.html">Login</a>
                <a href="careers.html">Join Our Startup</a>
                <a href="#">About Us</a>
            </nav>
        </header>

    <main>

    <?php if(issset($user)): 
        header("Location: account.php");
        exit;
    ?>

     <section class="home">
        <div class="home-content">
            <h1>Helios Nexus</h1>
            <h3>You're in Control</h3>
            <p> Get an instant design, and proposal for your home!</p>
            <div class="btn-box">
                <a href="proposal.html">Get Your Design</a>
                <a href="#">Learn More</a>
            </div>   
        </div>
    </section>
    </main>
    </body>
</html>
