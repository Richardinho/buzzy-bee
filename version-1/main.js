const state = {
  beeCoords: {
    x: 0,
    y: 0,
  },
  bee: {
    width: 20,
    height: 20,
  },
};

const START = 'start';
const END = 'end';

const RIGHT = 'right';
const LEFT = 'left';
const UP = 'up';
const DOWN = 'down';
const STATIONARY = 'stationary';

let id = 1;

function generateId() {
  return id++;
}



function sortByX1(a, b) {
  return b.x1 - a.x1;
}

let slices;

function createBackground() {
  const background = document.getElementById('background');
  const backgroundEls = Array.from(background.children);
  const elDimensions = getElDimensions(backgroundEls).sort(sortByX1);
  const foo = prepareElsForSlicing(elDimensions);

  slices = createSlices(foo);

  console.log(slices);
}

function prepareElsForSlicing(elDimensions) {
  return elDimensions.reduce((result, elDimension) => {
    result.push({value: elDimension.x1, type: START, el: elDimension });
    result.push({value: elDimension.x2, type: END, el: elDimension });

    return result;
  }, []).sort((a, b) => {
    return a.value - b.value
  });
}
// work out what this is
const MAX_X = 100000;

function addElement(els, el) {
  els.push(el);
}

function removeElement(els, arg) {
  return els.filter(el => {
    return el.id !== arg.id;
  });
}

function createSlices(foo) {
  let currentEls = [];

  const slices = [];

  return foo.reduce((slices, bar, index, arr) => {
    // special case of first slice
    // if no objects appear at origin, we create an 'empty' slice

    if (bar.type === START) {
      addElement(currentEls, bar.el);
    } else if (bar.type === END) {
      currentEls = removeElement(currentEls, bar.el);
    }

    if (index === 0) {
      if (bar.value > 0) {
        slices.push({x1: 0, x2: bar.value});
      }

      slices.push({x1: bar.value, yValues: calculateYValues(currentEls)});
    } else {

      const previousSlice = slices[slices.length - 1];
      // only create new slice if the x value advances from the previous slice's starting point
      // otherwise we'd have slices of zero width

      if (bar.value > previousSlice.x1) {
        // set x2 of previous slice
        previousSlice.x2 = bar.value;

        // create new slice
        slices.push({x1: bar.value, yValues: calculateYValues(currentEls)});
      }
    }

    // last slice (which of course could be the first slice in some circumstances)
    if (index === arr.length - 1) {
      const topSlice = slices[slices.length - 1];
      topSlice.x2 = MAX_X;
    } 

    return slices;

  }, slices);
}

function calculateYValues(currentEls) {

  const ys = currentEls.sort((a, b) => {
    a.y1 - b.y1;
  }).map((blah) => {
    return [blah.y1, blah.y2]; 
  });

  return ys.reduce((ytuples, ytuple, index, array) => {
    if (index === 0) {
      ytuples.push(ytuple);
    } else {
      const prevTuple = ytuples[ytuples.length - 1];

      if(ytuple[0] > prevTuple[1]) {
        ytuples.push(ytuple);
      } else if (ytuple[1] > prevTuple[1]) {
        prevTuple[1] = ytuple[1];
      }
    }
    return ytuples;
  }, []);
}

function getElDimensions(els) {
  return els.map((el) => {
    const clientRect = el.getBoundingClientRect();

    return {
      id: generateId(),
      x1: clientRect.x,
      x2: clientRect.x + clientRect.width,
      y1: clientRect.y,
      y2: clientRect.y + clientRect.height,
      el,
    };
  });
}

function createBee() {
  var beeEl = document.createElement('div');
  beeEl.className = 'bee';
  beeEl.style.width = state.bee.width + 'px';
  beeEl.style.height = state.bee.height + 'px';
  bee.appendChild(beeEl);

  function beginMoving(e) {
    beeEl.onpointermove = (event) => {
      const oldX = state.beeCoords.x;
      const oldY = state.beeCoords.y;

      let h_direction;
      let v_direction;

      const x = event.clientX;
      const y = event.clientY;

      if (oldX < x) {
        h_direction = RIGHT;
      } else if (oldX > x) {
        h_direction = LEFT;
      } else {
        h_direction = STATIONARY;
      }

      if (oldY < y) {
        v_direction = DOWN;
      } else if (oldY > y) {
        v_direction = UP;
      } else {
        v_direction = STATIONARY
      }

      state.beeCoords = {
        x,
        y,
        h_direction,
        v_direction,
      };
    };

    beeEl.setPointerCapture(e.pointerId);
  }

  function stopMoving(e) {
    beeEl.onpointermove = null;
    beeEl.releasePointerCapture(e.pointerId);
  }

  beeEl.onpointerdown = beginMoving;
  beeEl.onpointerup = stopMoving;

  return beeEl;
}

createBackground();

const beeEl = createBee();

function getCurrentSlice(xCoord) {
  let result;

  for (let i = 0; i < slices.length; i++) {
    let slice = slices[i];

    if (xCoord >= slice.x1 && xCoord < slice.x2) {
      result = slice;

      break;
    }
  }

  return result;
}

let counter = 0;
let gameActive = true;

function handleFrame() {
  if (gameActive) {
    const xCoord = state.beeCoords.x;
    const yCoord = state.beeCoords.y;
    const yCoordAdjusted = state.beeCoords.v_direction === DOWN ? yCoord + state.bee.height : yCoord;

    const slice = getCurrentSlice(state.beeCoords.h_direction === RIGHT ? xCoord + state.bee.width : xCoord);

    let allow = true;

    slice.yValues.forEach(([y1, y2]) => {
      if(yCoordAdjusted >= y1 && yCoordAdjusted <= y2) {
        allow = false;
      }
    });

    beeEl.style.left = xCoord + 'px';
    beeEl.style.top = yCoord + 'px';

    if(!allow) {
      gameActive = false;
      setTimeout(() => {
        alert('game over!');
      }, 0);
    }

    if (counter < 10000 && gameActive) {
      counter++;
      requestAnimationFrame(handleFrame);
    }
  }
}


requestAnimationFrame(handleFrame);
