class Ball {
  constructor(x, y, r) {
    var options = {
      restitution: 1.0,
      density: 3.0
    };

    this.body = Bodies.circle(x, y, r, options);

    this.x = x;
    this.y = y;
    this.r = r;

    World.add(world, this.body);
  }

  display() {
    let pos = this.body.position;
    let angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    fill("#4aedc4");
    ellipseMode(RADIUS);
    ellipse(0, 0, this.r, this.r);
    pop();
  }
}
