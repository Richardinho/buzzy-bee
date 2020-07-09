
export class Bird {
  constructor(appEl) {
    this.el = document.createElement('div');
    this.el.className = 'bird';
    appEl.appendChild(this.el);
  }

  hide() {
    this.el.style.visibility = 'hidden';
  }

  restart({ h_ratio, v_ratio, birdSpeed }) {
    this.h_ratio = h_ratio;
    this.v_ratio = v_ratio;

    this.x = -100 * this.h_ratio;
    this.y = 100 + this.v_ratio;
    this.height = 100 * this.v_ratio;
    this.width = this.height;

    /*
     *  These happen on ever frame
     *  Need to adjust for the possibility that frames happen
     *  faster on high refresh rate screens
     */

    this.y_increment = birdSpeed * this.v_ratio;
    this.x_increment = birdSpeed * this.h_ratio;

    this.el.style.width = this.width + 'px';
    this.el.style.height = this.height + 'px';
    this.el.style.visibility = 'visible';
  }

  update(leftEdge, screenWidth, foo) {
    let minY = 0 * this.v_ratio;
    let maxY = 200 * this.v_ratio;

    if (this.y < minY) {
      this.y = minY;
      this.y_increment = this.y_increment * -1;
    } else if(this.y > maxY){
      this.y = maxY;
      this.y_increment = this.y_increment * -1;
    } else {
      this.y = this.y + foo * this.y_increment;
    }

    if(this.x + this.width < leftEdge) {
      this.x = leftEdge + screenWidth + (100 * this.h_ratio);
    } else {
      this.x = this.x - foo * this.x_increment;
    }
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
  }
}
