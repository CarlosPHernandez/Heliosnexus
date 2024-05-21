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
                die("Login succesful");
            }
        }

        $isInvalid = true;
    }
?>

<!DOCTYPE html>
<html>
    <head>
        <title>Login</title>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="https://unpkg.com/axist@latest/dist/axist.min.css" />
    </head>

<body>
    <h1>Login</h1>

    <form method="POST">
        <label for="email">Email</label>
        <input type="email" name="email" id="email"
                value="<?= htmlspecialchars($_POST["email"] ?? "") ?>">

        <label for="password">Password</label>
        <input type="password" name="password" id="password">

        <button>Log in</button>
    </form>

    <?php if($isInvalid): ?>
        <em> Invalid login</em>
    <?php endif; ?>
  
    
</body>
</html>
