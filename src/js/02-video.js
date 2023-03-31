import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

const CURRENT_TIME = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(evt) {
  const playerCurrentTime = evt.seconds;

  localStorage.setItem(CURRENT_TIME, playerCurrentTime);
}

const savedCurrentTime = localStorage.getItem(CURRENT_TIME);

player
  .setCurrentTime(savedCurrentTime)
  .then(function () {})
  .catch(function (error) {
    switch (error.name) {
      case 'RangeError':
        break;
      default:
        break;
    }
  });
