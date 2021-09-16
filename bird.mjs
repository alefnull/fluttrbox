// fluttrbox
// flappy bird clone

// bird class
export default class Bird {
  constructor(cnvs) {
    this.canvas = cnvs;
    this.context = this.canvas.getContext('2d');
    this.size = 50;
    this.x = 100;
    this.y = this.canvas.height / 2;
    this.gravity = 0.05;
    this.lift = 4;
    this.velocity = 0;
  }

  update() {
    this.velocity += this.gravity;
    this.y += this.velocity;
  }

  show() {
    this.context.fillStyle = 'cornflowerblue';
    this.context.fillRect(this.x, this.y, this.size, this.size);
  }

  up() {
    this.velocity -= this.lift;
  }

  canUp() {
    return this.velocity > -5;
  }

  getCoordinates() {
    return {
      x: this.x,
      y: this.y,
    };
  }

  getVelocity() {
    return this.velocity;
  }
}