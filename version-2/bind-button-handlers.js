
export function bindButtonHandlers(app, levels) {
  document.getElementById('start-expert-button').addEventListener('click', () => {
    app.startGame(levels['expert']);
  });

  document.getElementById('start-beginner-button').addEventListener('click', () => {
    app.startGame(levels['beginner']);
  });

  document.getElementById('start-intermediate-button').addEventListener('click', () => {
    app.startGame(levels['intermediate']);
  });

  document.getElementById('restart-expert-button').addEventListener('click', () => {
    app.startGame(levels['expert']);
  });

  document.getElementById('restart-beginner-button').addEventListener('click', () => {
    app.startGame(levels['beginner']);
  });

  document.getElementById('restart-intermediate-button').addEventListener('click', () => {
    app.startGame(levels['intermediate']);
  });

  document.getElementById('replay-expert-button').addEventListener('click', () => {
    app.startGame(levels['expert']);
  });

  document.getElementById('replay-beginner-button').addEventListener('click', () => {
    app.startGame(levels['beginner']);
  });

  document.getElementById('replay-intermediate-button').addEventListener('click', () => {
    app.startGame(levels['intermediate']);
  });
}
