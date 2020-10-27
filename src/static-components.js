import {px} from './utils';

export class StaticComponents {

  constructor (appEl) {

    this.hiveEl = document.createElement('div');
    this.hiveEl.className = 'hive';
    appEl.append(this.hiveEl);

    this.mummyBeeEl = document.createElement('div');
    this.mummyBeeEl.className = 'mrs-bee';
    appEl.append(this.mummyBeeEl);

    this.grassEl = document.createElement('div');
    this.grassEl.className = 'grass';
    appEl.append(this.grassEl);

    this.bunnyEl = document.createElement('div');
    this.bunnyEl.className = 'bunny';
    appEl.append(this.bunnyEl);

    this.wormBirdEl = document.createElement('div');
    this.wormBirdEl.className = 'bird-with-worm';
    appEl.append(this.wormBirdEl);

  }

  restart({h_ratio, v_ratio, screenHeight, sceneWidth}) {
    this.grassHeight = 20 * v_ratio;

    this.hiveHeight = 500 * v_ratio;
    this.hiveWidth = this.hiveHeight;
    this.hive_left = sceneWidth - this.hiveWidth + (50 * v_ratio);

    // add 2 just to push hive down a little below grass
    this.hive_top = (screenHeight - (this.hiveHeight + this.grassHeight)) + 4;

    this.mummyBeeHeight = 150 * v_ratio;
    this.mummyBeeWidth = this.mummyBeeHeight;
    this.mummyBee_right = 200 * v_ratio;
    this.mummyBee_top = 200 * v_ratio;

    this.bunnyHeight = 80 * v_ratio;
    this.bunnyWidth = this.bunnyHeight;
    // have bunny slightly suspended in air
    this.bunny_top = screenHeight - (this.bunnyHeight + this.grassHeight + 4);
    this.bunnyLeft = 500 * h_ratio;

    this.wormBirdHeight = 50 * v_ratio;
    this.wormBirdWidth = this.wormBirdHeight;
    this.wormBird_top = screenHeight - (this.wormBirdHeight + this.grassHeight);
    this.wormBirdLeft = 3000 * h_ratio;
 

    this.render();
  }

  getCollisionZone() {
    return {
      x: this.hive_left, 
      y: this.hive_top,
      width: this.hiveWidth,
      height: this.hiveHeight,
    };
  }

  render() {
    this.hiveEl.style.height = px(this.hiveHeight); 
    this.hiveEl.style.width = px(this.hiveWidth); 
    this.hiveEl.style.left = px(this.hive_left);
    this.hiveEl.style.top = px(this.hive_top);

    this.mummyBeeEl.style.height = px(this.mummyBeeHeight);
    this.mummyBeeEl.style.width = px(this.mummyBeeWidth);
    this.mummyBeeEl.style.right = px(this.mummyBee_right);
    this.mummyBeeEl.style.top = px(this.mummyBee_top);

    this.wormBirdEl.style.height = px(this.wormBirdHeight);
    this.wormBirdEl.style.width = px(this.wormBirdWidth);
    this.wormBirdEl.style.left = px(this.wormBirdLeft);
    this.wormBirdEl.style.top = px(this.wormBird_top);

    this.bunnyEl.style.top = px(this.bunny_top);
    this.bunnyEl.style.width = px(this.bunnyWidth);
    this.bunnyEl.style.height = px(this.bunnyHeight);
    this.bunnyEl.style.left = px(this.bunnyLeft);

    this.grassEl.style.bottom = 0;
    this.grassEl.style.height = px(this.grassHeight);

  }
}
