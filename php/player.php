
<?php
// Function to get a player from the database
function getPlayer($playerId) {
    global $mysqli;

    $sql = "SELECT id,username FROM user WHERE id = $playerId";
    $st = $mysqli->prepare($sql);

    $st->execute();
    $res = $st->get_result();
    $res->fetch_assoc(); // Remove the unused variable assignment

    $player = [
        'id' => $playerId,
        'name' => 'John Doe',
        'score' => 100
    ];

    return $player;
}

// Function to insert a new player into the database
function insertPlayer($playerName) {
    global $mysqli;

    $sql = "INSERT INTO user (username) VALUES ?";
    
    $st = $mysqli->prepare($sql);
    $st->bind_param("s", $playerName);
    $st->execute();

    
}
?>
