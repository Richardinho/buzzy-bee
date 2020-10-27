import { px } from './utils';

const appEl = document.getElementById('app');

const GRASS_HEIGHT = 20;

export class Tree {

  constructor(
    x,
    width,
    height,
    screenHeight,
    v_ratio) {

    this.el = document.createElement('div');
    appEl.append(this.el);

    this.el.className = 'tree';

    this.height = height;
    this.width = height;
    this.x = x;
    this.y = screenHeight - this.height - (GRASS_HEIGHT * v_ratio);
  }

  destroy() {
    this.el.remove();
  }

  render() {
    this.el.style.height = px(this.height);
    this.el.style.width = px(this.width);
    
    this.el.style.transform = `translate(${this.x}px, ${this.y}px)`;
  }
}
