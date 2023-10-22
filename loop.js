const callbacks = [];

export const addCallback = cb => {
  callbacks.push(cb);
};

export const removeCallback = cb => {
  const index = callbacks.indexOf(cb);
  if (index !== -1) {
    callbacks.splice(index, 1);
  }
};

const loop = () => {
  for (const cb of callbacks) {
    cb();
  }
  requestAnimationFrame(loop);
};

export const startLoop = () => {
  requestAnimationFrame(loop);
};
