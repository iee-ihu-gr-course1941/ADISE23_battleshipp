
<?php

function show_board_blue($gameid) {
    global $mysqli;

    $sql = "SELECT blue_board FROM game WHERE id = $gameid";
    $st = $mysqli->prepare($sql);

    $st->execute();
    $res = $st->get_result();
    $row = $res->fetch_assoc();
    $board = json_decode($row['blue_board'],true);
    return $board;
}

function show_board_red($gameid) {
    global $mysqli;

    $sql = "SELECT red_board FROM game WHERE id = $gameid";
    $st = $mysqli->prepare($sql);

    $st->execute();
    $res = $st->get_result();
    $row = $res->fetch_assoc();
    $board = json_decode($row['red_board'],true);
    return  $board;
}

function reset_boards($gameid) {
        global $mysqli;

        // Read the contents of empty_board.json
        $emptyBoard = file_get_contents('empty_board.json');

        // Update the game table with the empty board for both players
        $sql = "UPDATE game SET blue_board = ?, red_board = ? WHERE id = ?";
        $st = $mysqli->prepare($sql);
        $st->bind_param("ssi", $emptyBoard, $emptyBoard, $gameid);
        $st->execute();
    }
    
function check_hit_on_red($gameid,$x_param,$y_param){
    global $mysqli;
    $sql = "SELECT red_board FROM game WHERE id = $gameid";
    $st = $mysqli->prepare($sql);
    $st->execute();
    $res = $st->get_result();
    $row = $res->fetch_assoc();
    $red_board = json_decode($row['red_board'],true);//decode the json string to an array
    $red_board = $red_board['board'];
    $x = $x_param;
    $y = $y_param;
    if($red_board[$x][$y]['is_hit']){//if the cell has already been hit
        throw new Exception("This cell has already been hit");
    }
    if($red_board[$x][$y]['is_ship']){ //if the cell has a ship
        $red_board[$x][$y]['is_hit'] = true;
        $new_red_board = json_encode(['board' => $red_board]);//encode the array to a json string
        $sql = "UPDATE game SET red_board = ? WHERE id = ?";
        $st = $mysqli->prepare($sql);
        $st->bind_param("si", $new_red_board, $gameid);
        $st->execute();
        return true;
    }
    else{
        return false;
    }
}

function check_hit_on_blue($gameid,$x_param,$y_param){
    global $mysqli;
    $sql = "SELECT blue_board FROM game WHERE id = $gameid";
    $st = $mysqli->prepare($sql);
    $st->execute();
    $res = $st->get_result();
    $row = $res->fetch_assoc();
    $blue_board = json_decode($row['blue_board'],true);//decode the json for blue
    $blue_board = $blue_board['board'];
    $x = $x_param;
    $y = $y_param;
    if($blue_board[$x][$y]['is_hit']){//if the cell has already been hit
        throw new Exception("This cell has already been hit");
    }
    if($blue_board[$x][$y]['is_ship']){//   if the cell has a ship
        $blue_board[$x][$y]['is_hit'] = true;
        $new_blue_board = json_encode(['board' => $blue_board]);//encode the array to json
        $sql = "UPDATE game SET blue_board = ? WHERE id = ?";
        $st = $mysqli->prepare($sql);
        $st->bind_param("si", $new_blue_board, $gameid);
        $st->execute();
        return true;
    }
    else{
        return false;
    }
}

function set_ship($gameid, $color, $cells) {
    global $mysqli;

    // Select the correct board based on the color
    $sql = "SELECT " . $color . "_board FROM game WHERE id = $gameid";
    $st = $mysqli->prepare($sql);
    $st->execute();
    $res = $st->get_result();
    $row = $res->fetch_assoc();
    $board = json_decode($row[$color . "_board"], true); // decode the json string to an array
    $board = $board['board'];

    // Set the is_ship field of each cell to true
    foreach ($cells as $cell) {
        $board[$cell['x']][$cell['y']]['is_ship'] = true;
    }

    // Encode the array to a json string
    $new_board = json_encode(['board' => $board]);

    // Update the board in the database
    $sql = "UPDATE game SET " . $color . "_board = ? WHERE id = ?";
    $st = $mysqli->prepare($sql);
    $st->bind_param("si", $new_board, $gameid);
    $st->execute();
}



    function all_ships_set($gameId) {
        $blue_board = show_board_blue($gameId);
        $red_board = show_board_red($gameId);

        $blue_ships = count_ships($blue_board);
        $red_ships = count_ships($red_board);

        // Assuming each player should set 5 ships
        return $blue_ships == 5 && $red_ships == 5;
    }

    function count_ships($board) {
        $ships = 0;

        foreach ($board as $row) {
            foreach ($row as $cell) {
                if ($cell['is_ship']) {
                    $ships++;
                }
            }
        }

        return $ships;
    }

?>
