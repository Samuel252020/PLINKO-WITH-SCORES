class Particle {
    constructor(x, y, r) {
        var options = {
            //isStatic: false,
            //'density':1.2,
            restitution: 0.4 
        }
        this.r = r;
        this.body = Bodies.circle(x, y, r, options);
        this.color = color(random(0,225), random(0,225), random(0,225));
        World.add(world, this.body);
    }
    display() {
        var pos = this.body.position;
        var angle = this.body.angle;
        //var color = color(random(0,225), random(0,225), random(0,225));
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        noStroke();
        fill(this.color);
        ellipseMode(RADIUS);
        ellipse(0, 0, this.r, this.r);
        pop();
    }
}
