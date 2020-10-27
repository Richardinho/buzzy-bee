import 'reset-css';
import './main.css';

import {Buzzy} from './buzzy';
import {Walls} from './walls';
import {Trees} from './trees';
import {Bird} from './bird';
import {Clock} from './clock';
import {ProgressBar} from './progress-bar';
import {App} from './app';
import {MusicManager} from './music-manager';
import {StaticComponents} from './static-components';


const appEl = document.getElementById('app');


const levels = {
  beginner: {
    numberOfTrees: 5,
    numberOfWalls: 4,
    timeLimit: 50000,
    birdSpeed: 1,
  },

  intermediate: {
    numberOfTrees: 5,
    numberOfWalls: 10,
    timeLimit: 30000,
    birdSpeed: 3,
  },

  expert: {
    numberOfTrees: 5,
    numberOfWalls: 14,
    timeLimit: 20000,
    birdSpeed: 5,
  }
};

let buzzy = new Buzzy(appEl);
let bird = new Bird(appEl);
let walls = new Walls(appEl);
let trees = new Trees();
let staticComponents = new StaticComponents(appEl);
let progressBar = new ProgressBar();
let clock = new Clock();
let musicManager = new MusicManager();

let app = new App(
  appEl,
  bird,
  buzzy,
  clock,
  progressBar,
  trees,
  walls,
  staticComponents,
  levels,
  musicManager,
);

app.showIntroScreen();
