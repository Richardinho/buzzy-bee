import {Wall} from './wall';
import {hasCollision} from './has-collision';

export class Walls {

  constructor(appEl) {
    this.appEl = appEl;
    this.walls = [];
  }

  restart({
    h_ratio,
    v_ratio,
    numberOfWalls,
    totalWidth,
    screenHeight,
  }) {
    // reset the options
    this.numberOfWalls = numberOfWalls;
    this.totalWidth = totalWidth;
    this.screenHeight = screenHeight;

    this.v_ratio = v_ratio;
    this.h_ratio = h_ratio;

    // destroy existing walls if any
    this.walls.forEach(wall => {
      wall.destroy();
    });

    this.createWalls();
  }

  update(buzzyXCoord, refreshRatio) {
    this.walls.forEach(wall => {
      wall.update(buzzyXCoord, refreshRatio);
    });
  }

  createWalls() {
    this.walls = [];

    /*
     *  We don't want any walls right at the start nor right at the end.
     */

    const startWidth = 300 * this.h_ratio;
    const endWidth = 1000 * this.h_ratio;

    const wallHeight = this.screenHeight * 0.60;
    const segmentWidth = (this.totalWidth - startWidth - endWidth) / this.numberOfWalls;

    let runningTotal = startWidth;

    for (let i = 0; i < this.numberOfWalls; i++) {

      let xCoord = Math.floor(Math.random() * segmentWidth + runningTotal);

      this.walls.push(new Wall(
        this.appEl,
        xCoord,
        wallHeight,
        this.v_ratio,
        this.h_ratio,
        this.screenHeight));

      runningTotal += segmentWidth;
    }
  }

  checkForCollisions(buzzy) {
    return this.walls.reduce((collision, wall) => {
      return collision || hasCollision(buzzy, wall);
    }, false)
  }

  render() {
    this.walls.forEach((wall) => {
      wall.render();
    })
  }
}
