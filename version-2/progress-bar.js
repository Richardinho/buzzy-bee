
export class ProgressBar {
  constructor() {
    this.el = document.querySelector('#progress-bar');
    this.el.style.visibility = 'hidden';
  }

  restart({winningLine}) {
    this.percentage = 0;
    this.winningLine = winningLine;
  }

  update(xCoord) {
    this.percentage = (xCoord / this.winningLine) * 100;
  }

  render() {
    this.el.style.visibility = 'visible';
    this.el.style.backgroundImage = `linear-gradient(to right, white, white ${this.percentage}%, transparent ${this.percentage}%)`;
  }
}
