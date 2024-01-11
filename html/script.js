    // Add functionality for volume icon (mute/unmute)
    let volumeIcon = document.getElementById('volumeIcon');
    let isMuted = false;
    let audio = new Audio('./adisesound.mp3'); // Replace 'path_to_your_audio_file.mp3' with the actual path to your audio file

    volumeIcon.addEventListener('click', () => {
      if (isMuted) {
        volumeIcon.classList.remove('fa-volume-mute');
        volumeIcon.classList.add('fa-volume-up');
        isMuted = false;
        audio.muted = false; // Unmute audio
        audio.play(); // Play audio when unmuted
      } else {
        volumeIcon.classList.remove('fa-volume-up');
        volumeIcon.classList.add('fa-volume-mute');
        isMuted = true;
        audio.muted = true; // Mute audio
        audio.pause(); // Pause audio when muted
      }
    });


  


// Select the start button

$('#startButton').on('click', function() {
  if ($(this).text() === 'Start') {
    $(this).text('Pause'); // Change text to 'Pause' when 'Start' is clicked
    // Add logic to handle pausing the game
  } else {
    $(this).text('Start'); // Change text back to 'Start' when 'Pause' is clicked
    // Add logic to handle resuming the game
  }
});



$(document).ready(function() {
  // Get the rules button and modal
  var rulesButton = $('#rulesButton');
  var rulesModal = $('#rulesModal');

  // When the rules button is clicked, display the rules modal
  rulesButton.on('click', function() {
    rulesModal.css('display', 'block');
  });

  // Close the rules modal when the 'x' is clicked
  var rulesCloseBtn = $('.close').eq(0);
  rulesCloseBtn.on('click', function() {
    rulesModal.css('display', 'none');
  });

  // Close the rules modal if user clicks outside the modal content
  $(window).on('click', function(event) {
    if (event.target === rulesModal[0]) {
      rulesModal.css('display', 'none');
    }
  });
});


$(document).ready(function() {
  // Get the score button and modal
  var scoreButton = $('#scoreButton');
  var scoreModal = $('#scoreModal');

  // When the score button is clicked, display the score modal
  scoreButton.on('click', function() {
    scoreModal.css('display', 'block');
  });

  // Close the score modal when the 'x' is clicked
  var scoreCloseBtn = $('.close').eq(1);
  scoreCloseBtn.on('click', function() {
    scoreModal.css('display', 'none');
  });

  // Close the score modal if user clicks outside the modal content
  $(window).on('click', function(event) {
    if (event.target === scoreModal[0]) {
      scoreModal.css('display', 'none');
    }
  });
});





$(document).ready(function() {
  // Log In button click event listener
  $('#loginButton').on('click', function() {
    // Open a pop-up window when Log In button is clicked
    window.open('./html/login.html', 'LoginWindow', 'width=400,height=400');
  });

  // Event listener for page load
  $(window).on('load', function() {
    const playerNameInput = $('#playerName');
    playerNameInput.val(''); // Clear input on page load
  });
});



// ReadyButton1 click event

$(document).ready(function() {
  $('#ReadyButton1').on('click', function() {
    const selectedTeam = $('#gameOptions1').val();
    const readyButton1 = $('#ReadyButton1');

    if (selectedTeam === 'option1') {
      readyButton1.addClass('red-team-background').removeClass('blue-team-background');
    } else if (selectedTeam === 'option2') {
      readyButton1.addClass('blue-team-background').removeClass('red-team-background');
    }
  });
});


// ReadyButton2 click event

$(document).ready(function() {
  $('#ReadyButton2').on('click', function() {
    const selectedTeam = $('#gameOptions2').val();
    const readyButton2 = $('#ReadyButton2');

    if (selectedTeam === 'option1') {
      readyButton2.addClass('red-team-background').removeClass('blue-team-background');
    } else if (selectedTeam === 'option2') {
      readyButton2.addClass('blue-team-background').removeClass('red-team-background');
    }
  });
});






// Function to change table caption


$(document).ready(function() {
  function changeTableCaption1() {
    const playerNameInput = $('#playerName1');
    const tableCaption1 = $('#tableCaption1');
    const playerName1 = playerNameInput.val().trim(); // Get and trim the entered name

    if (playerName1 !== '') {
      tableCaption1.text(playerName1); // Set the table caption to the entered name
    }
  }

  // ReadyButton click events for changing table captions
  $('#ReadyButton1').on('click', function() {
    changeTableCaption1(); // Change table caption for Player 1
  });
});



$(document).ready(function() {
  function changeTableCaption2() {
    const playerNameInput = $('#playerName2');
    const tableCaption2 = $('#tableCaption2');
    const playerName2 = playerNameInput.val().trim(); // Get and trim the entered name

    if (playerName2 !== '') {
      tableCaption2.text(playerName2); // Set the table caption to the entered name
    }
  }

  $('#ReadyButton2').on('click', function() {
    changeTableCaption2(); // Change table caption for Player 2
  });
});




// Event listener for page load for both tables

$(document).ready(function() {
  $('#playerName1').val(''); // Clear input on page load for Player 1
  $('#playerName2').val(''); // Clear input on page load for Player 2
});



/*
function duplicateIcon() {
  // Find the existing icon element
  var existingIcon = document.getElementById('boat1');

  // Create a duplicate of the existing icon
  var newIcon = existingIcon.cloneNode(true);

  // Assign a new ID to the duplicated icon (boat7)
  newIcon.id = 'boat2';

  // Append the duplicated icon to the container
  document.querySelector('.boat-icons').appendChild(newIcon);
}
*/


function handleBoatPlacement(tableId) {
  const table = $('#' + tableId);

  // ... Existing logic for dropping boat icons into the table

  // Handle boat icon click to make them draggable again
  table.on('click', '.boat-icon', function(event) {
    $(this).addClass('draggable');
  });
}



function handleBoatPlacement(tableId) {
  const table = $('#' + tableId);

  // Prevent default behavior for drop events on the entire document
  $(document).on('dragover', function(event) {
    event.preventDefault();
  });

  $(document).on('drop', function(event) {
    event.preventDefault();
    const boatId = event.originalEvent.dataTransfer.getData('text');
    const boatIcon = $('#' + boatId);

    // Check if the boat is being dropped in the second table
    if (tableId === 'gameTable2' && (boatId === 'boat1' || boatId === 'boat2' || boatId === 'boat3' || boatId === 'boat4' || boatId === 'boat5')) {
      // Do not allow boats from table1 to be dropped in table2
      return;
    }

    if (event.target.tagName === 'TD') {
      // Clone the boat icon and append it to the target table cell
      $(event.target).append(boatIcon.clone());

      // Remove the boat icon from the boat list
      boatIcon.remove();
    }
  });
}

// Call the function for both tables
handleBoatPlacement('gameTable1');
handleBoatPlacement('gameTable2');

// Function to make the boat icons draggable
$('.draggable').on('dragstart', function(event) {
  event.originalEvent.dataTransfer.setData('text', event.target.id);
});


// change the color when you choose (td) to attack - den douleuei****


/*
//Select the table
const table = document.getElementById('gameTable1');

//Add click event on td
table.addEventListener('click', function(event) {
  const clickedCell = event.target;

  //check if the clicked element is a tabl cell(td)
  if (clickedCell.tagName === 'TD') {
    clickedCell.style.backgroundColor = 'red';
  }
}
*/

//login

$('#loginButton').on('click', function() {
  // Ανοίξτε ένα μεγαλύτερο παράθυρο όταν κάνετε κλικ στο κουμπί Σύνδεση
  window.open('login.html', 'LoginWindow', 'width=5020,height=400');
});


// document.getElementById('attackButton').addEventListener('click', function() {
//   let blurElement = document.querySelector('.blur');

//   // Add the "blur2" class
//   blurElement.classList.add('blur2');

//   // Remove the "blur2" class after 200ms
//   setTimeout(function() {
//       blurElement.classList.remove('blur2');
//   }, 200);
// });


document.getElementById('attackButton').addEventListener('click', function() {
  let blurElement = document.querySelector('.blur');

  // Change background color to white
  blurElement.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';

  // Remove the white background color after 100ms
  setTimeout(function() {
      blurElement.style.backgroundColor = 'transparent';
  }, 100);
});
