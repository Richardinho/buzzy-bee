import * as Constants from './constants';
import { px } from './utils';

export class Buzzy {
  constructor(appEl) {
    this.el = document.createElement('div');
    appEl.append(this.el);
    this.el.className = 'bee';
  }

  restart({h_ratio, v_ratio}) {
    this.x = 100 * h_ratio;
    this.y = 100 * v_ratio;
    this.height = 150 * v_ratio;
    this.width = this.height;

    this.direction = Constants.RIGHT;

    this.el.style.width = px(this.width);
    this.el.style.height = px(this.height);
    this.el.style.left = 0;
    this.el.style.top = 0;
    this.lose = false;
    this.win = false;
  }

  getCollisionZone() {
    const collisionWidth = this.width / 2;
    const collisionHeight = this.height / 2;
    const collisionX = this.x + ((this.width - collisionWidth) / 2);
    const collisionY = this.y + ((this.height - collisionHeight) / 2);

    return {
      x: collisionX,
      y: collisionY,
      width: collisionWidth,
      height: collisionHeight,
    };
  }

  render() {
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;

    if(this.win) {
      this.el.className = 'bee buzzy-win';
    } else if (this.direction === Constants.RIGHT) {
      if (this.lose) {
        this.el.className = 'bee right-lose';
      } else {
        this.el.className = 'bee right';
      }
    } else {
      if (this.lose) {
        this.el.className = 'bee left-lose';
      } else {
        this.el.className = 'bee left';
      }
    }
  }
}
