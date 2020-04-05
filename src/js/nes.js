import '../css/nes.css';
import romData from '../bloodya.nes';

import jsnes from 'jsnes';

// jsnes renderer jacked straight from the jsnes site with super minor modifications
const SCREEN_WIDTH = 256;
const SCREEN_HEIGHT = 240;
const canvas = document.getElementById('screen');

canvas.width = SCREEN_WIDTH;
canvas.height = SCREEN_HEIGHT;

const context = canvas.getContext("2d");
var imageData = context.getImageData(
  0,
  0,
  SCREEN_WIDTH,
  SCREEN_HEIGHT
);

context.fillStyle = "black";
// set alpha to opaque
context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

// buffer to write on next animation frame
const buf = new ArrayBuffer(imageData.data.length);
// Get the canvas buffer in 8bit and 32bit
const buf8 = new Uint8ClampedArray(buf);
const buf32 = new Uint32Array(buf);

// Set alpha
for (var i = 0; i < buf32.length; ++i) {
  buf32[i] = 0xff000000;
}

const nes = new jsnes.NES({
  onFrame: (buffer) => {
    var i = 0;
    for (var y = 0; y < SCREEN_HEIGHT; ++y) {
      for (var x = 0; x < SCREEN_WIDTH; ++x) {
        i = y * 256 + x;
        // Convert pixel from NES BGR to canvas ABGR
        buf32[i] = 0xff000000 | buffer[i]; // Full alpha
      }
    }

    // write buffer
    imageData.data.set(buf8);
    context.putImageData(imageData, 0, 0);
  }
});

nes.loadROM(atob(romData));

canvas.addEventListener('mousedown', (e) => {
  nes.buttonDown(1, jsnes.Controller.BUTTON_A)
  e.preventDefault();
  return false;
});

canvas.addEventListener('mouseup', (e) => {
  nes.buttonUp(1, jsnes.Controller.BUTTON_A)
  e.preventDefault();
  return false;
});

canvas.addEventListener('touchstart', (e) => {
  nes.buttonDown(1, jsnes.Controller.BUTTON_A)
  e.preventDefault();
  return false;
});

canvas.addEventListener('touchend', (e) => {
  nes.buttonUp(1, jsnes.Controller.BUTTON_A)
  e.preventDefault();
  return false;
});

function nesLoop() {
  nes.frame();
  window.requestAnimationFrame(nesLoop);
}

nesLoop();

