
<?php
// Function to get a player from the database
function getPlayer($playerId) {
    global $mysqli;

    $sql = "SELECT id,username FROM user WHERE id = $playerId";
    $st = $mysqli->prepare($sql);

    $st->execute();
    $res = $st->get_result();
    $row = $res->fetch_assoc();
 
    $player = [
        'id' => $playerId,
        'name' => $row['username'],
        
    ];

    return $player;
}

// Function to insert a new player into the database
function insertPlayer($playerName) {
    global $mysqli;

    $sql = "INSERT INTO user (username) VALUES (?)";
    
    $st = $mysqli->prepare($sql);
    $st->bind_param("s", $playerName);
    $st->execute();
    return getPlayer($st->insert_id);
    
}
?>
