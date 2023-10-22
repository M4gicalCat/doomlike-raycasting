const addParent = obj => {
  for (const prop in obj) {
    if (typeof obj[prop] === 'object') {
      addParent(obj[prop]);
      obj[prop].__parent__ = obj;
      obj[prop].__name__ = prop;
    }
  }
  return obj;
};

const LOCATIONS = addParent({
  MAIN: {
    STAR: {},
  },
  KITCHEN: {
    TABLE: {},
    OVEN: {},
  },
});

export const map = {
  walls: [
    // star
    ...[
      {
        from: { x: 0, y: 0 },
        to: { x: 261, y: 190 },
        location: LOCATIONS.MAIN.STAR,
        name: 'star_1',
      },
      {
        from: { x: 261, y: 190 },
        to: { x: -61, y: 190 },
        location: LOCATIONS.MAIN.STAR,
        name: 'star_2',
      },
      {
        from: { x: -61, y: 190 },
        to: { x: 200, y: 0 },
        location: LOCATIONS.MAIN.STAR,
        name: 'star_3',
      },
      {
        from: { x: 200, y: 0 },
        to: { x: 100, y: 308 },
        location: LOCATIONS.MAIN.STAR,
        name: 'star_4',
      },
      {
        from: { x: 100, y: 308 },
        to: { x: 0, y: 0 },
        location: LOCATIONS.MAIN.STAR,
        name: 'star_5',
      },
    ],
    // KITCHEN
    ...[
      {
        from: { x: 900, y: 100 },
        to: { x: 1100, y: 100 },
        location: LOCATIONS.KITCHEN.TABLE,
        name: 'table_1',
      },
      {
        from: { x: 1100, y: 300 },
        to: { x: 1100, y: 100 },
        location: LOCATIONS.KITCHEN.TABLE,
        name: 'table_2',
      },
      {
        from: { x: 1100, y: 300 },
        to: { x: 900, y: 300 },
        location: LOCATIONS.KITCHEN.TABLE,
        name: 'table_3',
      },
      {
        from: { x: 900, y: 100 },
        to: { x: 900, y: 300 },
        location: LOCATIONS.KITCHEN.TABLE,
        name: 'table_4',
      },
    ],
  ],
  enemies: [],
  items: [],
  player: {
    x: 0,
    y: 0,
  },
};
