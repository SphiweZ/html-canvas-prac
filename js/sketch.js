let particles = [];
let particleCount = 4000;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  
  // Create particle system
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }
  
  // Enable lighting
  ambientLight(5);
  pointLight(255, 255, 255, 0, 0, 100);
}

function draw() {
  background(20, 0, 50);
  orbitControl();
  
  // Rotate the whole system
  rotateY(frameCount * 0.00000001);
  
  // Draw each particle
  for (let p of particles) {
    p.update();
    p.display();
  }
}

class Particle {
  constructor() {
    this.pos = p5.Vector.random3D().mult(random(0, 10000)); // Random position on a sphere
    this.noff = createVector(random(100), random(1000), random(10000)); // Perlin noise offset
    this.color = color(10, random(5, 250), random(1, 250)); // Dynamic color
  }

  update() {
    // Apply noise-based movement for a pulsing organic effect
    let n = noise(this.noff.x, this.noff.y, this.noff.z);
    let angle = map(n, 0, 1, -PI, PI);
    this.pos.x += sin(angle) * 5;
    this.pos.y += cos(angle) * 5;
    this.noff.add(1, 0.1, 0.01); // Update noise offsets
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y, this.pos.z);
    fill(this.color);
    sphere(10); // Draw each particle as a small sphere
    pop();
  }
}
