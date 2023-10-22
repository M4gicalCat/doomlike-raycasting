/**
 * @type {{mouse: {x: number, y: number}, keys: Record<string, boolean>, ctx: CanvasRenderingContext2D, maxDistance: number, map: {width: number, reduction: number}, speed: number, player: {orientation: number, width: number, height: number}}}
 */
export const store = {
  player: {
    width: 32,
    height: 32,
    orientation: Math.PI,
  },
  map: {
    width: 100,
    reduction: 5,
  },
  mouse: {
    x: undefined,
    y: undefined,
  },
  keys: {},
  ctx: null,
  maxDistance: 500,
  speed: 5,
  fov: Math.PI / 2,
};
