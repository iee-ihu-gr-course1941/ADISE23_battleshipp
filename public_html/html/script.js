// Add functionality for volume icon (mute/unmute)
const volumeIcon = document.getElementById('volumeIcon');
let isMuted = false;
let audio = new Audio('C:\Users\spyro\Downloads\adise_sound.mp3'); // Replace 'path_to_your_audio_file.mp3' with the actual path to your audio file

volumeIcon.addEventListener('click', () => {
  if (isMuted) {
    volumeIcon.classList.remove('fa-volume-mute');
    volumeIcon.classList.add('fa-volume-up');
    isMuted = false;
    audio.pause(); // Pause audio when muted
  } else {
    volumeIcon.classList.remove('fa-volume-up');
    volumeIcon.classList.add('fa-volume-mute');
    isMuted = true;
    audio.play(); // Play audio when unmuted
  }
});



// Select the start button
const startButton = document.getElementById('startButton');

// Function to change button text on click
startButton.addEventListener('click', function() {
  if (this.textContent === 'Start') {
    this.textContent = 'Pause'; // Change text to 'Pause' when 'Start' is clicked
    // Add logic to handle pausing the game
  } else {
    this.textContent = 'Start'; // Change text back to 'Start' when 'Pause' is clicked
    // Add logic to handle resuming the game
  }
});





// Function to display the modal for the BATTLE SCORE
function openModal() {
  document.getElementById('popupModal').style.display = 'block';
}

// Function to close the modal
function closeModal() {
  document.getElementById('popupModal').style.display = 'none';
}

// 'Battle Score' button click event to show the modal
document.getElementById('scoreButton').addEventListener('click', function() {
  openModal();
});



// Log In button click event listener

document.getElementById('loginButton').addEventListener('click', function() {
  // Open a pop-up window when Log In button is clicked
  window.open('login.html', 'LoginWindow', 'width=400,height=400');
});





// Event listener for page load
window.addEventListener('load', function() {
  const playerNameInput = document.getElementById('playerName');
  playerNameInput.value = ''; // Clear input on page load
});

// ReadyButton1 click event
const readyButton1 = document.getElementById('ReadyButton1');
readyButton1.addEventListener('click', function() {
  const selectedTeam = document.getElementById('gameOptions1').value;
  if (selectedTeam === 'option1') {
    readyButton1.classList.add('red-team-background'); // Add a class for Red Team background
    readyButton1.classList.remove('blue-team-background'); // Remove the Blue Team background class if present
  } else if (selectedTeam === 'option2') {
    readyButton1.classList.add('blue-team-background'); // Add a class for Blue Team background
    readyButton1.classList.remove('red-team-background'); // Remove the Red Team background class if present
  }
});

// ReadyButton2 click event
const ReadyButton2 = document.getElementById('ReadyButton2');
ReadyButton2.addEventListener('click', function() {
  const selectedTeam = document.getElementById('gameOptions2').value;
  if (selectedTeam === 'option1') {
    ReadyButton2.classList.add('red-team-background'); // Add a class for Red Team background
    ReadyButton2.classList.remove('blue-team-background'); // Remove the Blue Team background class if present
  } else if (selectedTeam === 'option2') {
    ReadyButton2.classList.add('blue-team-background'); // Add a class for Blue Team background
    ReadyButton2.classList.remove('red-team-background'); // Remove the Red Team background class if present
  }
});

// Function to change table caption

function changeTableCaption1() {
  const playerNameInput = document.getElementById('playerName1');
  const tableCaption1 = document.getElementById('tableCaption1');
  const playerName1 = playerNameInput.value.trim(); // Get and trim the entered name

  if (playerName1 !== '') {
    tableCaption1.textContent = playerName1; // Set the table caption to the entered name
  }
}

function changeTableCaption2() {
  const playerNameInput = document.getElementById('playerName2');
  const tableCaption2 = document.getElementById('tableCaption2');
  const playerName2 = playerNameInput.value.trim(); // Get and trim the entered name

  if (playerName2 !== '') {
    tableCaption2.textContent = playerName2; // Set the table caption to the entered name
  }
}

// ReadyButton click events for changing table captions
document.getElementById('ReadyButton1').addEventListener('click', function() {
  changeTableCaption1(); // Change table caption for Player 1
});

document.getElementById('ReadyButton2').addEventListener('click', function() {
  changeTableCaption2(); // Change table caption for Player 2
});

// Event listener for page load for both tables
window.addEventListener('load', function() {
  const playerNameInput1 = document.getElementById('playerName1');
  playerNameInput1.value = ''; // Clear input on page load for Player 1

  const playerNameInput2 = document.getElementById('playerName2');
  playerNameInput2.value = ''; // Clear input on page load for Player 2
});

// DRAG AND DROP 


function handleBoatPlacement(tableId) {
  const table = document.getElementById(tableId);

  // Prevent default behavior for drop events on the entire document
  document.addEventListener('dragover', function(event) {
    event.preventDefault();
  });

  table.addEventListener('drop', function(event) {
    event.preventDefault();
    const boatId = event.dataTransfer.getData('text');
    const boatIcon = document.getElementById(boatId);

    // Check if the boat is being dropped in the second table
    if (tableId === 'gameTable2' && (boatId === 'boat1' || boatId === 'boat2' || boatId === 'boat3' || boatId === 'boat4' || boatId === 'boat5')) {
      // Do not allow boats from table1 to be dropped in table2
      return;
    }

    // Check if the boat is being dropped in the second table
    if (tableId === 'gameTable1' && (boatId === 'boat6' || boatId === 'boat7' || boatId === 'boat8' || boatId === 'boat9' || boatId === 'boat10')) {
      // Do not allow boats from table1 to be dropped in table2
      return;
    }

    if (event.target.tagName === 'TD') {
      event.target.appendChild(boatIcon.cloneNode(true));

      //Remove the boat 
      boatIcon.remove();
    }
  });
}

// Call the function for both tables
handleBoatPlacement('gameTable1');
handleBoatPlacement('gameTable2');

// Function to make the boat icons draggable
document.querySelectorAll('.draggable').forEach((icon) => {
  icon.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text', event.target.id);
  });
});





//login


document.getElementById('loginButton').addEventListener('click', function() {
  // Open a larger pop-up window when Log In button is clicked
  window.open('login.html', 'LoginWindow', 'width=5020,height=400');
});