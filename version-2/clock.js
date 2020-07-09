export class Clock {

  constructor() {
    this.el = document.getElementById('clock');
    this.el.style.visibility = 'hidden';
    this.time = 0;
  }

  update(timeLeft) {
    this.time = timeLeft;
  }

  render() {
    this.el.style.visibility = 'visible';
    let s1 = Math.max(0, Math.floor(this.time / 10));
    let s2 = s1.toString().padStart(4, '0');
    let seconds = s2.slice(0,2);
    let fractions = s2.slice(2,4);
    
    this.el.textContent = `${seconds}:${fractions}`;
  }
}
