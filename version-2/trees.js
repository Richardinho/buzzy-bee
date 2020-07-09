import { Tree } from './tree';

const TREE_HEIGHT = 100;

export class Trees {
  constructor() {
    this.trees = [];
  }

  restart({
    v_ratio,
    numberOfTrees,
    screenHeight,
    totalWidth,
  }) {

    this.trees.forEach((tree) => {
      tree.destroy();
    });

    this.trees = [];

    this.numberOfTrees = numberOfTrees;
    this.totalWidth = totalWidth;
    this.screenHeight = screenHeight;

    this.createTrees(v_ratio);
  }

  createTrees(v_ratio) {
    const distanceBetween = this.totalWidth / this.numberOfTrees;

    for (let i = 0; i < this.numberOfTrees; i++) {
      let xCoord = Math.floor(Math.random() * distanceBetween + (distanceBetween * i));

      const height = TREE_HEIGHT * v_ratio;
      const width = height;

      this.trees.push(new Tree(xCoord, width, height, this.screenHeight, v_ratio));
    }
  }

  render() {
    this.trees.forEach((tree) => {
      tree.render();
    });
  }
}
