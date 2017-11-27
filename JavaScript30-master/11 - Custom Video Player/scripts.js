const player = document.querySelector('.player');
const video = player.querySelector('.viewer');

const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');

function togglePlay(e) {
  if (e.code === "Space" || e.type === "click"){
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }
}

function updateButton() {
  const icon = this.paused ? 'Play' : 'Pause';
  toggle.innerHTML = icon;
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
  if (mousedown || e.type === "click"){
    video.currentTime = e.layerX/640 * video.duration;
  }
}
let mousedown = false;
progress.addEventListener('click', scrub);
window.addEventListener('mousedown', ()=> mousedown = true);
window.addEventListener('mouseup', ()=> mousedown = false);
progress.addEventListener('mousemove', scrub);

video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

window.addEventListener('keydown', togglePlay);
fullscreen.addEventListener('click', ()=> video.webkitRequestFullscreen());

toggle.addEventListener('click', togglePlay);

skipButtons.forEach(button => button.addEventListener('click', skip));

ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove', handleRangeUpdate));