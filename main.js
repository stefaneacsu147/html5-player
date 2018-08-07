const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress_filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player_slider');
const fullscreen = player.querySelector('.fullscreen');

let isFullscreen = false;

function toggleFullScreen() {
  if (isFullScreen) {

    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }

    player.classList.remove('fullscreen');
  } else {
    if (player.requestFullscreen) {
      console.log('requestFullScreen');
      player.requestFullscreen(); // standard
    } else if (player.webkitRequestFullscreen) {
      console.log('webkitRequestFullscreen');
      player.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (player.mozRequestFullScreen) {
      console.log('mozRequestFullScreen');
      player.mozRequestFullScreen();
    } else if (player.msRequestFullscreen) {
      console.log('msRequestFullscreen');
      player.msRequestFullscreen();
    } else {
      console.error('Unable to find a fullscreen request method');
    }
    console.log('adding fullscreen class');
    player.classList.add('fullscreen');
  }
  isFullScreen = !isFullScreen;
}

function toggleFullScreenClasses() {
  player.classList.toggle('fullscreen');
  isFullScreen = !isFullScreen;
}

function togglePlay() {
  if(video.paused) {
    video.play();
  } else {
    video.pause();
  }
}

function updateButton() {
  const icon = this.paused ? '►' : '❚ ❚';
  toggle.textContent = icon;
}

function skip() {
  video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
progress.addEventListener('click', scrub);
let mousedown = false;
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

document.addEventListener('fullscreenchange', toggleFullScreenClasses);
document.addEventListener('mozfullscreenchange', toggleFullScreenClasses);
document.addEventListener('webkitfullscreenchange', toggleFullScreenClasses);
document.addEventListener('msfullscreenchange', toggleFullScreenClasses);


