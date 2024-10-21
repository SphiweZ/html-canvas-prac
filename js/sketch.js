
// let cols, rows;
// let scl = 20;
// let w = 2000;
// let h = 500;

// let terrain = [];
// let flying = 0;
// let rotationX = 0;
// let rotationY = 0;

// function setup() {
//   createCanvas(2000, 800, WEBGL);
//   cols = w / scl;
//   rows = h / scl;
  
//   terrain = new Array(cols);
//   for (let i = 0; i < cols; i++) {
//     terrain[i] = new Array(rows);
//   }

//   noFill();

// }

// function draw() {
//   background(0);

//   // Add lighting
//   directionalLight(255, 255, 255, 0, 0, -1);

//   flying -= 0.05;

//   let yoff = flying;
//   for (let y = 0; y < rows; y++) {
//     let xoff = 0;
//     for (let x = 0; x < cols; x++) {
//       terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
//       xoff += 0.1;
//     }
//     yoff += 0.1;
//   }

//   // Add rotation based on mouse movement
//   let rotationSpeed = 0.000001;
//   rotationX += (mouseY - height / 2) * rotationSpeed;
//   rotationY += (mouseX - width / 2) * rotationSpeed;

//   translate(0, 50);
//   rotateX(rotationX);
//   rotateY(rotationY);
//   translate(-w / 2, -h / 2);

//   for (let y = 0; y < rows - 1; y++) {
//     beginShape(TRIANGLE_STRIP);
//     for (let x = 0; x < cols; x++) {
//       let heightValue = terrain[x][y];
//       // Custom color gradient: blue to green to red
//       stroke(lerpColor(
//         color(0, 0, 255),  // Blue at low height
//         color(255, 0, 0),  // Red at high height
//         map(heightValue, -100, 100, 0, 1)
//       ));
//       vertex(x * scl, y * scl, terrain[x][y]);
//       vertex(x * scl, (y + 2) * scl, terrain[x][y + 2]);
//     }
//     endShape();
//   }
// }


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
