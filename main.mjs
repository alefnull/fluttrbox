// fluttrbox
// flappy bird clone

// imports
import Bird from './bird.mjs';
import Pipe from './pipe.mjs';

// variables
const cnvs = document.getElementById('cnvs');
const ctx = cnvs.getContext('2d');
cnvs.width = window.innerWidth;
cnvs.height = window.innerHeight;

let debug = false;

let start = false;
let gameover = false;
let score = 0;

const birb = new Bird(cnvs, ctx);
const pipes = [];
pipes.push(new Pipe(cnvs, ctx));

ctx.textAlign = 'center';

function tick() {
  if (!gameover) {
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);

    if (start) {
      birb.update();
    }
    birb.show();

    pipes.forEach((pipe, i) => {
      pipe.update();
      pipe.show();

      if (pipe.offscreen()) {
        pipes.splice(i, 1);
        pipes.push(new Pipe(cnvs, ctx));
        if (start) {
          score++;
        }
      }

      if(start) {
        // create a new pipe when this one reaches the center
        if (pipe.x == cnvs.width / 2) {
          pipes.push(new Pipe(cnvs, ctx));
        }
        if (pipe.hit(birb)) {
          gameover = true;
          start = false;
        }
      }
      else {
        // print 'click to start' in the center of the screen
        ctx.font = 'bold 50px Arial';
        ctx.fillStyle = '#fff';
        ctx.fillText('CLICK TO START', cnvs.width / 2, cnvs.height / 2);
      }
    });

    if (debug) {
      ctx.fillStyle = 'white';
      ctx.font = 'bold 20px Arial';
      ctx.fillText(`X: ${Math.round(birb.x)}, Y: ${Math.round(birb.y)}`, cnvs.width - 150, cnvs.height - 100);
      ctx.fillText(`Velocity: ${-Math.round(birb.velocity)}`, cnvs.width - 150, cnvs.height - 75);
    }

    ctx.fillStyle = 'white';
    ctx.font = 'bold 40px Arial';
    ctx.fillText(`SCORE: ${score}`, cnvs.width - 150, cnvs.height - 25);

    if (birb.y + birb.size > cnvs.height || birb.y < 0) {
      gameover = true;
      start = false;
    }

    requestAnimationFrame(tick);
  }
  if (gameover) {
    // reset pipes
    pipes.splice(0, pipes.length);
    ctx.clearRect(0, 0, cnvs.width, cnvs.height);
    ctx.fillStyle = 'white';
    ctx.font = 'bold 50px Arial';
    ctx.fillText('GAME OVER', cnvs.width / 2, cnvs.height / 2);
    ctx.font = 'bold 30px Arial';
    ctx.fillText(`SCORE: ${score}`, cnvs.width / 2, cnvs.height / 2 + 35);
  }
}

tick();

// event listeners
document.addEventListener('click', () => {
  if(!gameover) {
    if (!start) {
      start = true;
      pipes.splice(0, pipes.length);
      pipes.push(new Pipe(cnvs, ctx));
    }
    if (birb.velocity > 0) {
      birb.velocity = 0;
    }
    if (birb.canUp()) {
      birb.up();
    }
  }
  else {
    gameover = false;
    score = 0;
    birb.velocity = 0;
    birb.y = cnvs.height / 2;
    pipes.push(new Pipe(cnvs, ctx));
    tick();
  }
});

document.addEventListener('keydown', (e) => {
  if (!gameover) {
    if (!start) {
      start = true;
      pipes.splice(0, pipes.length);
      pipes.push(new Pipe(cnvs, ctx));
    }
    if (e.key === ' ') {
      if (birb.velocity > 0) {
        birb.velocity = 0;
      }
      if (birb.canUp()) {
        birb.up();
      }
    }
  }
  else {
    gameover = false;
    score = 0;
    birb.velocity = 0;
    birb.y = cnvs.height / 2;
    pipes.push(new Pipe(cnvs, ctx));
    tick();
  }
});

//handle resize
window.addEventListener('resize', () => {
  cnvs.width = window.innerWidth;
  cnvs.height = window.innerHeight;
});