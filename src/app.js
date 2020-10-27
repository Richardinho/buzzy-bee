import * as Constants from './constants';
import { getWallsReason,px } from './utils';
import {hasCollision} from './has-collision';
import {bindButtonHandlers} from './bind-button-handlers';

// based on my laptop
const idealHeight = 509;
const idealWidth = 1280;

export class App {
  constructor(
    el,
    bird,
    buzzy,
    clock,
    progressBar,
    trees,
    walls,
    staticComponents,
    levels,
    musicManager,
    ) {

    this.el = el;

    this.levels = levels;

    this.bird = bird;
    this.buzzy = buzzy;
    this.clock = clock;
    this.progressBar = progressBar;
    this.trees = trees;
    this.walls = walls;
    this.staticComponents = staticComponents;
    this.musicManager = musicManager;

    bindButtonHandlers(this, this.levels);

    /*
     * Bind Key handlers
     */

    document.addEventListener('keydown', (event) => {
      if (event.keyCode == 39) {
        this.rightKeyDown = true;
      } else if (event.keyCode == 37) {
        this.leftKeyDown = true;
      } else if (event.keyCode == 40) {
        this.downKeyDown = true;
      } else if (event.keyCode == 38) {
        this.upKeyDown = true;
      }
    });

    document.addEventListener('keyup', (event) => {
      if (event.keyCode == 39) {
        this.rightKeyDown = false;
      } else if (event.keyCode == 37) {
        this.leftKeyDown = false;
      } else if (event.keyCode == 40) {
        this.downKeyDown = false;
      } else if (event.keyCode == 38) {
        this.upKeyDown = false;
      }
    });
  }

  startGame({
    timeLimit,
    numberOfTrees,
    numberOfWalls,
    birdSpeed,
  }) {

    this.screenWidth = window.innerWidth;
    this.screenHeight = this.el.offsetHeight;

    this.h_ratio = this.screenWidth / idealWidth;
    this.v_ratio = this.screenHeight / idealHeight;

    this.totalWidth = 12000 * this.h_ratio;

    this.leftEdge = 0;

    /*
     *  xCoord of point to reach to win game
     */

    this.winningLine = this.totalWidth - this.screenWidth / 2;

    /*
     *  horizontal and vertical increments by which to move Buzzy.
     */

    //  adjust for high refresh rate screens
    this._h_increment = 10 * this.h_ratio;
    this._v_increment = 5 * this.h_ratio;

    /*
     *  amount of pixels buzzy can move across viewport before we move the 
     *  scene along
     */

    this.max_x_buzzy_vp = this.screenWidth / 3;

    this.timeLimit = timeLimit;
  
    this.runningTimeStart = 0;

    this.rightKeyDown = false;
    this.leftKeyDown = false;
    this.downKeyDown = false;
    this.upKeyDown = false;

    this.reasonForLosing = '';
    this.birdIsOn = false;

    /*
     * set dimensions of scene
     */

    this.el.style.width = px(this.totalWidth);
    this.el.style.visibility = 'visible';

    this.buzzy.restart({
      h_ratio: this.h_ratio,
      v_ratio: this.v_ratio,
    });

    this.progressBar.restart({
      winningLine: this.winningLine,
    });

    this.trees.restart({
      numberOfTrees,
      screenHeight: this.screenHeight,
      totalWidth: this.totalWidth,
      v_ratio: this.v_ratio,
    });

    this.staticComponents.restart({
      v_ratio: this.v_ratio,
      h_ratio: this.h_ratio,
      screenHeight: this.screenHeight,
      sceneWidth: this.totalWidth,
    });

    this.walls.restart({
      numberOfWalls, 
      h_ratio: this.h_ratio,
      v_ratio: this.v_ratio,
      totalWidth: this.totalWidth,
      screenHeight: this.screenHeight,
    });

    this.bird.restart({
      birdSpeed,
      h_ratio: this.h_ratio,
      v_ratio: this.v_ratio,
    });

    this.hideBanners();
    this.musicManager.play();

    window.requestAnimationFrame(this.handleFrame.bind(this));
  }

  showIntroScreen() {
    this.showStartBanner();
  }

  /*
   *  Runs on each frame. This is about 60 times per second!
   *  This is what recalculates the position of all the things on the screen (e.g. Buzzy, birds, walls etc) and
   *  then redraws them in their new position.
   */

  handleFrame(timestamp) {
    if (!this.runningTimeStart) {
      this.runningTimeStart = timestamp;
    }

    let tslts = 16;

    if (this.lastTimestamp) {
      tslts = timestamp - this.lastTimestamp;
    }

    const refreshRatio = 1;
    //const refreshRatio = Math.floor(tslts / 16);
    this.refreshRatio = refreshRatio;

    this.h_increment = this._h_increment * refreshRatio;
    this.v_increment = this._v_increment * refreshRatio;

    this.lastTimestamp = timestamp; 

    const duration = timestamp - this.runningTimeStart;
    const timeLeft = this.timeLimit - duration;
    const collision = this.checkForCollisions();

    /*
     *  Do a check to see if the user has won or lost.
     *  if they are still playing, we set this function (handleFrame) to be run again
     *  the next time the loop runs, which will be in about 1/60 of a seconds time!
     */

    if (hasCollision(this.buzzy.getCollisionZone(), this.staticComponents.getCollisionZone())) {
      this.showWinBanner();
      this.buzzy.win = true ;
      this.bird.hide();
    } else if (collision) {
      this.buzzy.lose = true;
      this.reasonForLosing = collision;
      this.showLoseBanner(); 
    } else if (timeLeft < 0) {
      this.buzzy.lose = true;
      this.reasonForLosing = 'Watch out for your time!';
      this.showLoseBanner(); 
    } else {
      requestAnimationFrame(this.handleFrame.bind(this));
    }

    /*
     * Update items on the page. This is where we call lots of functions
     * which do all the Maths.
     */

    this.clock.update(timeLeft);

    if (this.rightKeyDown) {
      this.handleRightKey();
    }

    if (this.leftKeyDown) {
      this.handleLeftKey();
    }

    if (this.downKeyDown) {
      this.handleDownKey();
    }

    if (this.upKeyDown) {
      this.handleUpKey();
    }

    if (this.birdIsOn) {
      this.bird.update(this.leftEdge, this.screenWidth, this.refreshRatio);
    } else if(this.buzzy.x > this.screenWidth / 3) {
      this.birdIsOn = true;
    }

    this.walls.update(this.buzzy.x, refreshRatio);
    this.progressBar.update(this.buzzy.x);

    /*
     * Once all the Maths is done, we can redraw the page. This is sometimes called 'rendering'
     * The render() function is directly below this one
     */

    this.render();
  }

  render() {

    this.buzzy.render();
    this.bird.render();
    this.trees.render();
    this.walls.render();
    this.progressBar.render();
    this.clock.render();

    this.el.style.transform = `translateX(-${this.leftEdge}px)`;
  }

  /*
   *  Handle up, down, left, and right key input
   */

  handleLeftKey() {
    if (this.buzzy.x - this.h_increment  > this.leftEdge) {
      this.buzzy.x = this.buzzy.x - this.h_increment;
      this.buzzy.direction = Constants.LEFT;
    }
  }

  handleRightKey() {

    const leftEdge = this.leftEdge;
    const totalWidth = this.totalWidth;
    const buzzyX = this.buzzy.x;
    const buzzyWidth = this.buzzy.width;

    let maxX;

    // whilst we can move the left edge and it will be less than the total width
    // whilst we can move the left edge
    if (leftEdge + this.h_increment + this.screenWidth < this.totalWidth) {

      maxX = leftEdge + this.max_x_buzzy_vp;

      if (buzzyX + this.h_increment > maxX) {
        this.leftEdge = leftEdge + this.h_increment;
      } 

      this.buzzy.x = buzzyX + this.h_increment;
      this.buzzy.direction = Constants.RIGHT;


      // when we can't move the left edge because we've reached the edge of the scene

    } else {
      maxX = leftEdge + this.screenWidth;

      if (buzzyX + buzzyWidth + this.h_increment <= maxX) {
        this.buzzy.x = buzzyX + this.h_increment;
        this.buzzy.direction = Constants.RIGHT;
      }
    }
  }

  handleUpKey() {
    const buzzyY = this.buzzy.y;
    const minY = 0;

    if (buzzyY - this.v_increment < minY) {
      this.buzzy.y = minY;
    } else {
      this.buzzy.y = buzzyY - this.v_increment;
    }
  }

  handleDownKey() {
    const maxY = this.screenHeight - this.buzzy.height;

    if (this.buzzy.y + this.v_increment > maxY) {
      this.buzzy.y = maxY;
    } else {
      this.buzzy.y = this.buzzy.y + this.v_increment;
    }
  }

  /*
   *  Show Banners
   */

  showStartBanner() {
    const startBanner = document.getElementById('start-banner');
    startBanner.style.display = 'flex';
  }

  showWinBanner() {
    const winBanner = document.getElementById('win-banner');
    winBanner.style.display = 'flex';
  }

  showLoseBanner() {
    const loseBanner = document.getElementById('lose-banner');
    loseBanner.querySelector('.message').textContent = this.reasonForLosing;
    loseBanner.style.display = 'flex';
  }

  /*
   *  Hide Banners
   */

  hideBanners() {
    const startBanner = document.getElementById('start-banner');
    const winBanner = document.getElementById('win-banner');
    const loseBanner = document.getElementById('lose-banner');

    startBanner.style.display = 'none';
    winBanner.style.display = 'none';
    loseBanner.style.display = 'none';
  }

  checkForCollisions() {
    const birdCollision = hasCollision(this.buzzy.getCollisionZone(), this.bird.getCollisionZone());
    const wallCollisions = this.walls.checkForCollisions(this.buzzy.getCollisionZone());

    let reason;

    if (wallCollisions) {
      reason = getWallsReason();
    }

    if (birdCollision) {
      reason = 'Watch out for birds!';
    }
   
    return reason;
  }
}
