// fluttrbox
// flappy bird clone

// pipe class
export default class Pipe {
  constructor(cnvs) {
    this.canvas = cnvs;
    this.ctx = this.canvas.getContext('2d');
    this.width = 150;
    this.x = this.canvas.width;
    this.gap = 300;
    this.gapY = Math.floor(Math.random() * (this.canvas.height - this.gap - this.gap / 2)) + this.gap / 2;
    this.speed = 3;
    this.color = '#1e1';
  }

  show() {
    this.ctx.fillStyle = this.color;
    this.ctx.fillRect(this.x, 0, this.width, this.gapY);
    this.ctx.fillRect(this.x, this.gapY + this.gap, this.width, this.canvas.height);
  }

  update() {
    this.x -= this.speed;
  }

  offscreen() {
    return this.x + this.width / 2 < 0;
  }

  hit(bird) {
    if (bird.x + bird.size > this.x && bird.x < this.x + this.width) {
      if (bird.y < this.gapY || bird.y + bird.size > this.gapY + this.gap) {
        console.log('hit');
        return true;
      }
    }
    return false;
  }
}