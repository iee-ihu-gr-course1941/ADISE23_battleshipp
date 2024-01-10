<?php        
        require_once('config.php');
        require_once('board.php');

        $method = $_SERVER['REQUEST_METHOD'];
        $request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
        // $request = explode('/', trim($_SERVER['SCRIPT_NAME'],'/'));
        // Σε περίπτωση που τρέχουμε php –S
        $input = json_decode(file_get_contents('php://input'),true);
        switch ($r = array_shift($request)) {
                case 'game':
                        echo "game";
                    $gameId = array_shift($request);
                    if(is_null($gameId)) {
                        handle_game($method, $input);
                    } else {
                        switch ($b = array_shift($request)) {
                            case '':
                            case null: 
                                if($method == 'GET') {
                                        get_game($gameId);
                                } else {
                                 header("HTTP/1.1 405 Method Not Allowed");
                                        }
                                break;
                            case 'blueBoard':
                                switch ($c = array_shift($request)) {
                                    case '':
                                    case null: 
                                        handle_blue_board($method, $gameId, $input);
                                        break;
                                    case 'cell': 
                                        handle_blue_cell($method, $gameId, $request[0], $request[1], $input);
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
                                        handle_red_board($method, $gameId, $input);
                                        break;
                                    case 'cell': 
                                        handle_red_cell($method, $gameId, $request[0], $request[1], $input);
                                        break;
                                    default: 
                                        header("HTTP/1.1 404 Not Found");
                                        break;
                                }
                                break;
                            case 'player': 
                                handle_player($method, $gameId, $input);
                                break;
                            default: 
                                header("HTTP/1.1 404 Not Found");
                                break;
                        }
                    }
                    break;
                default:
                    header("HTTP/1.1 404 Not Found");
                    exit;
            }


function handle_game($method, $input) {
        global $mysqli;
        if($method=='GET') {
                $game = get_game();
                print json_encode($game);
        } else if ($method=='POST') {
                $game = create_game($input);
                print json_encode($game);
        } else {
                header("HTTP/1.1 404 Not Found");
                print json_encode(['errormesg'=>"Method $method not allowed here."]);
        }
}

function get_current_player($gameId) {
        global $mysqli;
        $stmt = $mysqli->prepare("SELECT `p_turn` FROM `game` WHERE `id` = ?");
        $stmt->bind_param("i", $gameId);
        $stmt->execute();
        $result = $stmt->get_result();
        $game = $result->fetch_assoc();
        return $game['p_turn'];
    }




function handle_board($method) {
        if($method=='GET') {
                $blue_board=show_board_blue();
                $red_board = show_board_red();
        } else {
                header("HTTP/1.1 404 Not Found");
                print json_encode(['errormesg'=>"Method $method not allowed here."]);
        }
}

function handle_player($method, $gameId, $input) {
        global $mysqli;
        if($method=='GET') {
                $player = get_player($gameId);
                print json_encode($player);
        } else if ($method=='POST') {
                $player = create_player($gameId, $input);
                print json_encode($player);
        } else {
                header("HTTP/1.1 404 Not Found");
                print json_encode(['errormesg'=>"Method $method not allowed here."]);
        }
}

?>