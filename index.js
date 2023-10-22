import { store } from './store.js';
import { initDraw } from './draw.js';
import { startLoop } from './loop.js';
import { map } from './map.js';
import { initMovement } from './movement.js';

const canvas = document.getElementById('DOOM');
store.ctx = canvas.getContext('2d');

let width = (canvas.width = window.innerWidth);
let height = (canvas.height = window.innerHeight);

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

document.addEventListener('mousemove', event => {
  if (store.mouse.x === undefined || store.mouse.y === undefined) {
    store.mouse.x = event.clientX;
    store.mouse.y = event.clientY;
    return;
  }
  const diffX = event.clientX - store.mouse.x;
  store.player.orientation = store.player.orientation + diffX / 200;

  store.mouse.x = event.clientX;
  store.mouse.y = event.clientY;
});

document.addEventListener('keydown', event => {
  store.keys[event.key] = true;
});

document.addEventListener('keyup', event => {
  store.keys[event.key] = false;
});

store.player.x = map.player.x;
store.player.y = map.player.y;

initMovement();
initDraw();
startLoop();
