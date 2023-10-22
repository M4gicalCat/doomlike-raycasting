import { store } from './store.js';
import { addCallback, removeCallback } from './loop.js';
import { map } from './map.js';
let fn = 0;
let lastFrame = window.performance.now();
let moveLeftDistance;

const clear = () => {
  store.ctx.clearRect(0, 0, store.ctx.canvas.width, store.ctx.canvas.height);
};

const drawMap = () => {
  const { ctx, player, fov } = store;
  ctx.beginPath();
  ctx.fillStyle = '#FFF';
  ctx.arc(
    store.map.width / 2 + 10,
    store.map.width / 2 + 10,
    store.map.width / 2,
    0,
    2 * Math.PI,
  );
  ctx.strokeStyle = '#F00';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.lineWidth = 1;
  ctx.arc(
    store.map.width / 2 + 10,
    store.map.width / 2 + 10,
    store.map.width / 2,
    0,
    2 * Math.PI,
  );
  ctx.save();
  ctx.clip();
  ctx.fill();
  ctx.translate(store.map.width / 2 + 10, store.map.width / 2 + 10);
  ctx.fillStyle = ctx.strokeStyle = '#F00';
  // draw the player
  ctx.beginPath();
  // player dot
  ctx.arc(0, 0, player.width / store.map.reduction, 0, 2 * Math.PI);
  ctx.fill();
  // player view
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.rotate(-fov / 2);
  ctx.lineTo(0, -store.map.width / 2);
  ctx.rotate(-fov);
  ctx.arc(0, 0, store.map.width / 2, 0, fov);
  ctx.rotate(fov * 1.5);
  ctx.closePath();
  ctx.fillStyle = '#00AAFF50';
  ctx.fill();
  ctx.fillStyle = ctx.strokeStyle = '#F00';
  ctx.beginPath();
  // rotate the map
  ctx.rotate(-player.orientation);
  // draw the walls
  for (const wall of map.walls) {
    ctx.moveTo(
      (player.x - wall.from.x) / store.map.reduction,
      (player.y - wall.from.y) / store.map.reduction,
    );
    ctx.lineTo(
      (player.x - wall.to.x) / store.map.reduction,
      (player.y - wall.to.y) / store.map.reduction,
    );
    ctx.stroke();
  }
  ctx.restore();
};

const initialiseLeftDistance = () =>
  (moveLeftDistance = store.ctx.canvas.width);

const drawFrameNumber = () => {
  const txt = `${fn}`;
  moveLeftDistance -= txt.length * 6;
  store.ctx.fillStyle = '#F00';
  store.ctx.fillText(txt, moveLeftDistance, 10);
  fn++;
};

const drawPlayerPosition = () => {
  store.ctx.fillStyle = '#0F0';
  const txt = `[${store.player.x}, ${store.player.y}]`;
  moveLeftDistance -= txt.length * 6;
  store.ctx.fillText(txt, moveLeftDistance, 10);
};

const drawFPS = () => {
  store.ctx.fillStyle = '#00F';
  const t = window.performance.now();
  const txt = `${Math.round(1_000 / (t - lastFrame))} FPS`;
  lastFrame = t;
  moveLeftDistance -= txt.length * 6;
  store.ctx.fillText(txt, moveLeftDistance, 10);
};

export const initDraw = () => {
  store.ctx.font = store.ctx.font.replace(/(?<value>\d+\.?\d*)/, '10');
  removeCallback(drawMap);
  removeCallback(drawFrameNumber);
  removeCallback(drawPlayerPosition);
  removeCallback(drawFPS);
  removeCallback(initialiseLeftDistance);
  removeCallback(clear);
  addCallback(clear);
  // echo todo : draw game
  addCallback(drawMap);
  addCallback(initialiseLeftDistance);
  addCallback(drawFrameNumber);
  addCallback(drawPlayerPosition);
  addCallback(drawFPS);
};
