let cellSize = 16;
let timeOffset = 0;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
}

function draw() {
    background(34, 34, 34); // Set the background color

    // Increase time offset for more dynamic movement
    timeOffset += 0.02;

    for (let x = 0; x <= width; x += cellSize) {
        for (let y = 0; y <= height; y += cellSize) {
            // Calculate noise value with timeOffset
            let n = noise(x * 0.05, y * 0.05, timeOffset);
            let grey = map(n, 0, 1, 0, 255);
            fill(grey);
            rect(x, y, cellSize, cellSize);
        }
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
}
