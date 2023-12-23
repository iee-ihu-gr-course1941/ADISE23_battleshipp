// Add functionality for volume icon (mute/unmute)
const volumeIcon = document.getElementById('volumeIcon');
let isMuted = false;

volumeIcon.addEventListener('click', () => {
  if (isMuted) {
    volumeIcon.classList.remove('fa-volume-mute');
    volumeIcon.classList.add('fa-volume-up');
    isMuted = false;
    // Unmute functionality here
    // Example: UnmuteAudio();
  } else {
    volumeIcon.classList.remove('fa-volume-up');
    volumeIcon.classList.add('fa-volume-mute');
    isMuted = true;
    // Mute functionality here
    // Example: MuteAudio();
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


// ReadyButton click event
const readyButton = document.getElementById('ReadyButton');
readyButton.addEventListener('click', function() {
  const selectedTeam = document.getElementById('gameOptions').value;
  if (selectedTeam === 'option1') {
    readyButton.classList.add('red-team-background'); // Add a class for Red Team background
    readyButton.classList.remove('blue-team-background'); // Remove the Blue Team background class if present
  } else if (selectedTeam === 'option2') {
    readyButton.classList.add('blue-team-background'); // Add a class for Blue Team background
    readyButton.classList.remove('red-team-background'); // Remove the Red Team background class if present
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



// Function to change table caption
function changeTableCaption() {
  const playerNameInput = document.getElementById('playerName');
  const tableCaption = document.getElementById('tableCaption');
  const playerName = playerNameInput.value.trim(); // Get and trim the entered name

  if (playerName !== '') {
    tableCaption.textContent = playerName; // Set the table caption to the entered name
  }
}

// ReadyButton click event
document.getElementById('ReadyButton').addEventListener('click', function() {
  changeTableCaption(); // Change table caption on button click
});

// Event listener for page load
window.addEventListener('load', function() {
  const playerNameInput = document.getElementById('playerName');
  playerNameInput.value = ''; // Clear input on page load
});



// DRAG AND DROP 



const boatIcons = document.querySelectorAll('.draggable');

// Drag start event listener
boatIcons.forEach(icon => {
  icon.addEventListener('dragstart', function(event) {
    event.dataTransfer.setData('text/plain', this.id); // Set data to be dragged
  });
});

const gameTable = document.getElementById('gameTable');

// Prevent default behavior for drop events
gameTable.addEventListener('dragover', function(event) {
  event.preventDefault();
});

gameTable.addEventListener('drop', function(event) {
  event.preventDefault();
  const boatId = event.dataTransfer.getData('text/plain'); // Get data being dropped
  const boatIcon = document.getElementById(boatId);

  if (event.target.tagName === 'TD') {
    event.target.appendChild(boatIcon); // Append the boat icon to the dropped cell
  }
});


document.getElementById('loginButton').addEventListener('click', function() {
  // Open a larger pop-up window when Log In button is clicked
  window.open('login.html', 'LoginWindow', 'width=5020,height=400');
});