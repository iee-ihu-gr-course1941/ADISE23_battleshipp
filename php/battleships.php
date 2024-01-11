<?php        
        require_once('config.php');
        require_once('board.php');
        require_once('game.php');
        require_once('player.php');

        $method = $_SERVER['REQUEST_METHOD'];
        $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
        // $request = explode('/', trim($_SERVER['SCRIPT_NAME'],'/'));
        // Σε περίπτωση που τρέχουμε php –S
        $input = json_decode(file_get_contents('php://input'),true);
        switch ($r = array_shift($request)) {
                        case 'game':                       
                                $gameId = array_shift($request);
                                if(is_null($gameId)) {
                                        handle_game($method,$gameId,$input);
                                } else {
                                        switch ($b = array_shift($request)) {
                                                case '':
                                                case null: 
                                                        handle_game($method,$gameId,$input); // URI: /game/{gameId}
                                                        break;
                                                case 'blueBoard':
                                                        switch ($c = array_shift($request)) {
                                                                case '':
                                                                case null: 
                                                                        handle_blue_board($method, $gameId, $input); // URI: /game/{gameId}/blueBoard
                                                                        break;
                                                                case 'cell': 
                                                                        handle_blue_cell($method, $gameId, $request[0], $request[1], $input); // URI: /game/{gameId}/blueBoard/cell/{row}/{col}
                                                                        break;
                                                                default: 
                                                                        header("HTTP/1.1 404 Not Found");
                                                                        break;
                                                        }
                                                        break;
                                                case 'redBoard':
                                                        switch ($c = array_shift($request)) {
                                                                case '':
                                                                case null: 
                                                                        handle_red_board($method, $gameId, $input); // URI: /game/{gameId}/redBoard
                                                                        break;
                                                                case 'cell': 
                                                                        handle_red_cell($method, $gameId, $request[0], $request[1], $input); // URI: /game/{gameId}/redBoard/cell/{row}/{col}
                                                                        break;
                                                                default: 
                                                                        header("HTTP/1.1 404 Not Found");
                                                                        break;
                                                        }
                                                        break;
                                           
                                                default: header("HTTP/1.1 404 Not Found");
                                                        break;
                                        }
                                }
                                break;
                        case 'player': 
                                        $playerId = array_shift($request);
                                        handle_player($method, $playerId, $input); // URI: /player/{playerId}
                                        break;
                        default:
                                header("HTTP/1.1 404 Not Found");
                                                       
                                exit;
                }


function handle_game($method,$gameId, $input) {
        global $mysqli;
        if($method=='GET') {
                $game = get_game($gameId);
                print json_encode($game);
        } else if ($method=='POST') {
                $game = join_game($input['playerId']);
                print json_encode($game);
        } else {
                header("HTTP/1.1 404 Not Found");
                print json_encode(['errormesg'=>"Method $method not allowed here."]);
        }
}

function handle_blue_board($method, $gameId, $input) {
        global $mysqli;
        if($method=='GET') {
                $blue_board=show_board_blue($gameId);
                print json_encode($blue_board);
        } else if ($method=='POST') {
                reset_boards($gameId);
                print ("Boards have been reset");             
                
        } else {
                header("HTTP/1.1 404 Not Found");
                print json_encode(['errormesg'=>"Method $method not allowed here."]);
        }
}

function handle_blue_cell($method, $gameId, $row, $col, $input) {
    global $mysqli;
    if ($method == 'POST') {
         // Check if it's the correct player's turn
         $currentPlayer = get_current_player($gameId);
         if ($currentPlayer != $input['playerId']) {
             header("HTTP/1.1 400 Bad Request");
             print json_encode(['errormesg' => "It's not your turn."]);
             return;
         }
        $hit = check_hit_on_blue($gameId, $row, $col);
        print json_encode(['hit' => $hit]);
    } else if ($method == 'PUT') {
        set_ship($gameId, 'blue', $input['cells']);
        if (all_ships_set($gameId)) { 
            start_battle($gameId);
        }
    } else{
        header("HTTP/1.1 404 Not Found");
        print json_encode(['errormesg' => "Method $method not allowed here."]);
    }
}


function handle_red_board($method, $gameId, $input) {
        global $mysqli;
        if($method=='GET') {
                $red_board = show_board_red($gameId);
                print json_encode($red_board);
        } else if ($method=='POST') {
                reset_boards($gameId);
                print ("Boards have been reset");
        } else {
                header("HTTP/1.1 404 Not Found");
                print json_encode(['errormesg'=>"Method $method not allowed here."]);
        }
}



function handle_red_cell($method, $gameId, $row, $col, $input) {
    global $mysqli;
    if ($method == 'POST') {
         // Check if it's the correct player's turn
         $currentPlayer = get_current_player($gameId);
         if ($currentPlayer != $input['playerId']) {
             header("HTTP/1.1 400 Bad Request");
             print json_encode(['errormesg' => "It's not your turn."]);
             return;
         }
        $hit = check_hit_on_red($gameId, $row, $col);
        print json_encode(['hit' => $hit]);
    } else if ($method == 'PUT') {
        set_ship($gameId, 'red', $input['cells']);
        if (all_ships_set($gameId)) { // assuming you have a function that checks if all ships are set
            start_battle($gameId);
        }
    } else {
        header("HTTP/1.1 404 Not Found");
        print json_encode(['errormesg' => "Method $method not allowed here."]);
    }
}

/*function handle_red_cell($method, $gameId, $row, $col, $input) {
    global $mysqli;
    if ($method == 'POST') {
         // Check if it's the correct player's turn
         $currentPlayer = get_current_player($gameId);
         if ($currentPlayer != $input['playerId']) {
             header("HTTP/1.1 400 Bad Request");
             print json_encode(['errormesg' => "It's not your turn."]);
             return;
         }
        $hit = check_hit_on_red($gameId, $row, $col);
        
        // Check if a ship has been sunk
        $sunk = check_ship_sunk($gameId, 'red'); // You would need to implement this function

        print json_encode(['hit' => $hit, 'sunk' => $sunk]);
    } else if ($method == 'PUT') {
        set_ship($gameId, 'red', $input['cells']);
        if (all_ships_set($gameId)) { // assuming you have a function that checks if all ships are set
            start_battle($gameId);
        }
    } else {
        header("HTTP/1.1 404 Not Found");
        print json_encode(['errormesg' => "Method $method not allowed here."]);
   
    }*/




function handle_board($method,$gameId) {
        if($method=='GET') {
                $blue_board=show_board_blue($gameId);
                $red_board = show_board_red($gameId);
                print json_encode(['blue_board'=>$blue_board,'red_board'=>$red_board]);
        } else {
                header("HTTP/1.1 404 Not Found");
                print json_encode(['errormesg'=>"Method $method not allowed here."]);
        }
}

function handle_player($method, $playerId, $input) {
        global $mysqli;
        if($method=='GET') {
                $player = getPlayer($playerId);
                print json_encode($player);
        } else if ($method=='POST') {
                $playerName = $input['playerName'];
                $player = insertPlayer($playerName);
                print json_encode($player);
        } else {
                header("HTTP/1.1 404 Not Found");
                print json_encode(['errormesg'=>"Method $method not allowed here."]);
        }
}

?>