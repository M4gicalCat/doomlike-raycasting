import { store } from './store.js';
import { addCallback } from './loop.js';
// import { map } from './map.js';

export const initMovement = () => {
  addCallback(move);
};

const DIAGONAL_SPEED = Math.sqrt(0.5) * store.speed;

const move = () => {
  const { keys, player, speed } = store;
  const { orientation } = player;
  const DIRECTIONS = [keys['z'], keys['d'], keys['s'], keys['q']];

  const diag = DIRECTIONS.filter(Boolean).length === 2;
  const [TOP, RIGHT, BOTTOM, LEFT] = DIRECTIONS;

  const SPEED = diag ? DIAGONAL_SPEED : speed;

  if (LEFT) {
    player.x += Math.cos(orientation) * SPEED;
    player.y += Math.sin(orientation) * SPEED;
  }

  if (RIGHT) {
    player.x -= Math.cos(orientation) * SPEED;
    player.y -= Math.sin(orientation) * SPEED;
  }

  if (BOTTOM) {
    player.x -= Math.cos(orientation + Math.PI / 2) * SPEED;
    player.y -= Math.sin(orientation + Math.PI / 2) * SPEED;
  }

  if (TOP) {
    player.x += Math.cos(orientation + Math.PI / 2) * SPEED;
    player.y += Math.sin(orientation + Math.PI / 2) * SPEED;
  }
  player.x = Math.round(player.x);
  player.y = Math.round(player.y);
};
