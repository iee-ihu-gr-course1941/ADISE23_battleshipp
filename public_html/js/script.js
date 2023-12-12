// Add functionality for volume icon (mute/unmute)
const volumeIcon = document.getElementById('volumeIcon');
let isMuted = false;

volumeIcon.addEventListener('click', () => {
  if (isMuted) {
    volumeIcon.classList.remove('fa-volume-off');
    volumeIcon.classList.add('fa-volume-up');
    isMuted = false;
    // Unmute functionality here
    // Example: UnmuteAudio();
  } else {
    volumeIcon.classList.remove('fa-volume-up');
    volumeIcon.classList.add('fa-volume-off');
    isMuted = true;
    // Mute functionality here
    // Example: MuteAudio();
  }
});


  // Add functionality for start button (to start the game)
  const startButton = document.getElementById('startButton');

  startButton.addEventListener('click', () => {
    // Redirect to the game page or start the game logic here
    // For example:
    // window.location.href = 'game.html';
    // OR
    // StartGame();
  });
