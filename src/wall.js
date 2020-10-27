import { px } from './utils';

const INCREMENT = 7;

export class Wall {
  constructor(appEl, x, wallHeight, v_ratio, h_ratio, screenHeight) {
    this.appEl = appEl;
    this.v_ratio = v_ratio;
    this.h_ratio = h_ratio;

    this.el = document.createElement('div');
    this.appEl.appendChild(this.el);

    this.el.className = 'wall';

    this.height = 0;
    this.width = 20 * v_ratio;
    this.x = x;
    // start position of wall just below screen
    this.y = screenHeight;
    this.wallHeight = wallHeight;

    this.preRender();
  }

  preRender() {
    this.el.style.left = 0;
    this.el.style.top = 0;
    this.el.style.position = 'fixed';
    this.el.style.width = this.width;
    this.el.style.height = this.wallHeight;
  }

  destroy() {
    this.appEl.removeChild(this.el);
  }

  update(buzzyXCoord, refreshRatio) {

    const increment = refreshRatio * INCREMENT * this.v_ratio;

    if (this.x < (buzzyXCoord + (400 * this.h_ratio)) && this.height < this.wallHeight) {
      this.y = this.y - increment;
      this.height = this.height + increment;
    }
  }

  render() {
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}
