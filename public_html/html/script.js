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

