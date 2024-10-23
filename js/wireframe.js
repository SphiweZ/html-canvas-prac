
let cols, rows;
let scl = 30;
let w = 2000;
let h = 500;

let terrain = [];
let flying = 0;
let rotationX = 0;
let rotationY = 0;

function setup() {
  createCanvas(2000, 800, WEBGL);
  cols = w / scl;
  rows = h / scl;
  
  terrain = new Array(cols);
  for (let i = 0; i < cols; i++) {
    terrain[i] = new Array(rows);
  }

  noFill();

}

function draw() {
  background(0);

  // Add lighting
  directionalLight(255, 255, 255, 0, 0, -1);

  flying -= 0.05;

  let yoff = flying;
  for (let y = 0; y < rows; y++) {
    let xoff = 0;
    for (let x = 0; x < cols; x++) {
      terrain[x][y] = map(noise(xoff, yoff), 0, 1, -100, 100);
      xoff += 0.1;
    }
    yoff += 0.1;
  }

  // Add rotation based on mouse movement
  let rotationSpeed = 0.000001;
  rotationX += (mouseY - height / 2) * rotationSpeed;
  rotationY += (mouseX - width / 2) * rotationSpeed;

  translate(0, 50);
  rotateX(rotationX);
  rotateY(rotationY);
  translate(-w / 2, -h / 2);

  for (let y = 0; y < rows - 1; y++) {
    beginShape(TRIANGLE_STRIP);
    for (let x = 0; x < cols; x++) {
      let heightValue = terrain[x][y];
      // Custom color gradient: blue to green to red
      stroke(lerpColor(
        color(0, 0, 255),  // Blue at low height
        color(255, 0, 0),  // Red at high height
        map(heightValue, -100, 100, 0, 1)
      ));
      vertex(x * scl, y * scl, terrain[x][y]);
      vertex(x * scl, (y + 2) * scl, terrain[x][y + 2]);
    }
    endShape();
  }
}
