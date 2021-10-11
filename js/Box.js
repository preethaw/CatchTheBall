class Box {
  constructor(x, y, w, h) {
    var options = {
      isStatic: true
    };

    this.body = Bodies.rectangle(x, y, w, h, options);

    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;

    World.add(world, this.body);
  }

  setAngel(angle) {
    Matter.Body.setAngle(this.body, angle);
  }

  display() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    noStroke();
    fill("#ffcf33");
    rectMode(CENTER);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
