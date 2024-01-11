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

    function join_game($playerId) {
        global $mysqli;
        $stmt = $mysqli->prepare("CALL Assignplayer(?,@gameid)");
        $stmt->bind_param("i", $playerId);
        $stmt->execute(); 
        $result = $mysqli->query("SELECT @gameId");
        $row = $result->fetch_assoc();
        $gameId = $row['@gameId'];

        reset_boards($gameId);
        
        return get_game($gameId);
    }


    function get_current_player($gameId) {
        global $mysqli;
        $stmt = $mysqli->prepare("SELECT `p_turn`, `blue`, `red` FROM `game` WHERE `id` = ?");
        $stmt->bind_param("i", $gameId);
        $stmt->execute();
        $result = $stmt->get_result();
        $game = $result->fetch_assoc();
        
        if ($game['p_turn'] == 'B') {
            return $game['blue'];
        } else {
            return $game['red'];
        }
    }

    function start_battle($gameId) {
        global $mysqli;
        $sql = "UPDATE game SET status = 'battle' WHERE id = ?";
        $st = $mysqli->prepare($sql);
        $st->bind_param("i", $gameId);
        $st->execute();
    }

    

?>