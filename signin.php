<?php

$isInvalid = false;
    if($_SERVER["REQUEST_METHOD"] == "POST"){
        $mysqli = require __DIR__ . "/database.php";

        $sql = sprintf("SELECT * FROM user WHERE email='%s'", 
                        $mysqli->real_escape_string($_POST["email"]));
        
        $result = $mysqli->query($sql);
        $user = $result->fetch_assoc();

        if($user){
            // verifying the password
            if(password_verify($_POST["password"], $user["hash_password"])){
                // now the session can start
                session_start();
                $_SESSION["user_id"] = $user["id"];

                // redirecting to index page
                header("Location: index.php");
                exit;
            }
        }

        $isInvalid = true;
    }
?>

<!DOCTYPE html>
<html>
  <head>
    <link rel="stylesheet" href="signin.css">
    <title>Sign In</title>
  </head>
  <body>
    <div>
      <form method="POST">
        <label for="username">Username</label>
        <input class="username-field" type="text" name = "username" placeholder="Username"
                value="<?= htmlspecialchars($_POST["email"] ?? "") ?>">

        <label for="password">Password</label>
        <input class="password-field" type="password" name="password" placeholder="Password">
        <button class="signin-button">Sign In</button>
      </form>

      <?php if($isInvalid): ?>
        <em> Invalid login</em>
      <?php endif; ?>

    </div>
  </body>
</html>