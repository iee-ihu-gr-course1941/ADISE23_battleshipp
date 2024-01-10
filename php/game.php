<?php
    function change_turn($current_turn, $gameId) {
        global $mysqli;
        if($current_turn == "B") {
            $stmt = $mysqli->prepare("UPDATE `game` SET `p_turn` = 'R' WHERE `id` = ?");
        } else {
            $stmt = $mysqli->prepare("UPDATE `game` SET `p_turn` = 'B' WHERE `id` = ?");
        }
        $stmt = $mysqli->prepare("UPDATE `game` SET `p_turn` = 1 - `p_turn` WHERE `id` = ?");
        $stmt->bind_param("i", $gameId);
        $stmt->execute();
    }

    function get_game($gameId) {
        global $mysqli;
        $stmt = $mysqli->prepare("SELECT * FROM `game` WHERE `id` = ?");
        $stmt->bind_param("i", $gameId);
        $stmt->execute();
        $result = $stmt->get_result();
        $game = $result->fetch_assoc();
        return $game;
    }

?>