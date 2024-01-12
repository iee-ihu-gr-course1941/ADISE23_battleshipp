# ADISE23_battleshipp

get /battleship/php/battleships.php/game/{gameid}'

    This endpoint retrieves information about the battleship game with the {gameID}
    The request does not include a request body.
    The response will have a status code of 200, indicating a successful request, and will return the details of the battleship game.

put /battleship/php/battleships.php/game/' --header 'Content-Type: text/plain' --data '{
    "playerId" : "1"
}'

    Add a new game
    This endpoint allows you to add a new game of battleship and assign a player to an existing one.
    Request Body
    playerId: (string) The ID of the player.


GET battleships.php/game/{gameId}/blueBoard'
    This HTTP GET request retrieves the blue board for a specific game in the Battleship game. The blue board represents the player's own board with their ships and the opponent's hits and misses.
    The request does not contain a request body.




POST battleships.php/game/{gameId}/blueBoard'
    This HTTP POST request is used to reset the blue board for a specific game in the Battleship game. The gameId path parameter is used to specify the game for which the blue board is being reset.





post battleship/php/battleships.php/game/{gameId}/blueBoard/cell/{x}/{y}
    ecified URL. Replace {gameId}, {x}, and {y} with the actual game ID, x-coordinate, and y-coordinate respectively.

PUT battleship/php/battleships.php/game/{gameId}/blueBoard/cell/{x}/{y}
    rdinate, and y coordinate.

same for red board



GET battleship/php/battleships.php/player/{playerID}
    This endpoint retrieves information about a specific player's battleship game using the player's ID.
    Request
    Path Parameters
    playerID (string, required): The unique identifier of the player.


post battleship/php/battleships.php/player
    This endpoint allows you to add a new player for the battleship game.
    ith a JSON payload in the raw request body type. The payload should include the player's name in the "playerName" field.


