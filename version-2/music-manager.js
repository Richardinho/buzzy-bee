export class MusicManager {
  constructor() {

    this.media = document.getElementById('audio');

  }

  play() {
    this.media.play();
  }

  pause() {
    this.media.pause();
  }

}
