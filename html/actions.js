

function logId(element) {
    console.log(element.id);
    // var settings = {
    //     "url": `http://localhost/battleship/php/battleships.php/game/5/blueBoard/cell/${element.id[0]}/${element.id[1]}`,
    //     "method": "POST",
    //     "timeout": 0,
    //   };
      
    //   $.ajax(settings).done(function (response) {
    //     console.log(response);
    //   });

    var requestData = {
        playerId: "1"
        // Add more key-value pairs as needed
      };

      $.ajax({
        url: `http://localhost/battleship/php/battleships.php/game/5/blueBoard/cell/${element.id[0]}/${element.id[1]}`,
        method: "POST", // or "POST" depending on your API
        contentType: "application/json",
        data : requestData,
        dataType: "json", // or "xml", "html", etc.
        success: function(data) {
          // Handle the successful response
          console.log("AJAX call successful:", data);
        },
        error: function(xhr, status, error) {
          // Handle errors
          console.error("AJAX error:", status, error);
        }
      });
}