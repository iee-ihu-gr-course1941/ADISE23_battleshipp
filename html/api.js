const url = 'http://localhost/battleship/php;';

var settings = {
    "url": `${url}/battleships.php/game/5`,
    "method": "GET",
    "timeout": 0,
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });