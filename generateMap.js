import fs from 'fs';
import { map } from './map.js';
import { store } from './store.js';

const args = process.argv.slice(2);

const options = {
  depth: 2,
  silent: Infinity,
};

const unrecognized = [];

while (args.length > 1) {
  const [key, value] = args.splice(0, 2);
  if (key in options) {
    options[key] = Number.isNaN(+value) ? value : +value;
  } else {
    unrecognized.push([key, value]);
  }
}

const echo = (level, ...things) => {
  if (level !== undefined && options.silent <= level) return;
  console.debug(...things);
};

echo(
  0,
  `GENERATING MAP WITH OPTIONS:\n${Object.entries(options)
    .map(([k, v]) => `  - [${k}] => ${v}`)
    .join('\n')}`,
);

if (unrecognized.length) {
  echo(
    undefined,
    `WARNING: UNRECOGNIZED OPTIONS:\n${unrecognized
      .map(([k, v]) => ` - [${k}] => ${v}`)
      .join('\n')}`,
  );
}

const fMap = {
  player: map.player,
};

const generateBoxes = loc => {
  if (loc.entities) {
    const box = {
      minX: Infinity,
      maxX: -Infinity,
      minY: Infinity,
      maxY: -Infinity,
    };
    for (const e of loc.entities) {
      const ObjMinX = Math.min(
        e.x ?? Infinity,
        e.from?.x ?? Infinity,
        e.to?.x ?? Infinity,
      );
      const ObjMaxX = Math.max(
        e.x ?? -Infinity,
        e.from?.x ?? -Infinity,
        e.to?.x ?? -Infinity,
      );
      const ObjMinY = Math.min(
        e.y ?? Infinity,
        e.from?.y ?? Infinity,
        e.to?.y ?? Infinity,
      );
      const ObjMaxY = Math.max(
        e.y ?? -Infinity,
        e.from?.y ?? -Infinity,
        e.to?.y ?? -Infinity,
      );
      box.minX = Math.min(box.minX, ObjMinX);
      box.maxX = Math.max(box.maxX, ObjMaxX);
      box.minY = Math.min(box.minY, ObjMinY);
      box.maxY = Math.max(box.maxY, ObjMaxY);
    }
    loc.box = {
      minX: box.minX - store.maxDistance,
      maxX: box.maxX + store.maxDistance,
      minY: box.minY - store.maxDistance,
      maxY: box.maxY + store.maxDistance,
    };
  }
  const toSort = [];
  echo(undefined, loc);
  for (const [key, val] of Object.entries(loc)) {
    if (!['entities', 'box'].includes(key)) {
      toSort.push(key);
      generateBoxes(val);
    }
  }
  loc.__sorted__ = toSort.sort((a, b) => loc[a].box.minX - loc[b].box.minX);
};

const generateHash = (item, path) =>
  `${item.__type__}|${path.join()}|${item.name}`;

const generateMap = () => {
  const locations = {};
  const allItems = [
    ...map.walls.map(w => ({ ...w, __type__: 'wall' })),
    ...map.enemies.map(e => ({ ...e, __type__: 'enemy' })),
    ...map.items.map(i => ({ ...i, __type__: 'item' })),
  ];
  for (const item of allItems) {
    const path = [];
    let obj = item.location;
    while (obj.__parent__) {
      path.unshift(obj.__name__);
      obj = obj.__parent__;
    }
    echo(1, `loading ${item.name}`, path);
    let locObj = locations;
    for (let i = 0; i < Math.min(path.length, options.depth); i++) {
      const currentPath = path[i];
      locObj[currentPath] ??= { entities: [] };
      const { location, ...it } = item;
      locObj[currentPath].entities.push({
        ...it,
        location: path.join('.'),
        hash: generateHash(item, path),
      });
      locObj = locations[currentPath];
    }
  }
  generateBoxes(locations);
  fMap.entities = locations;
  echo(2, JSON.stringify(locations, null, 2));
};
generateMap();
fs.writeFileSync('__map__.js', `export const map = ${JSON.stringify(fMap)};`, {
  flag: 'w',
});
