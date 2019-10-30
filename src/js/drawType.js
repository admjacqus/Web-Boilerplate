// document.addEventListener("DOMContentLoaded", function() {
let isDrawing = false,
  x = 0,
  y = 0;

const drawBox = document.getElementById("drag-box");
const context = drawBox.getContext("2d");
const rect = drawBox.getBoundingClientRect();

drawBox.addEventListener("mousedown", e => {
  x = e.clientX - rect.left;
  y = e.clientY - rect.top;
  isDrawing = true;
});
drawBox.addEventListener("mousemove", e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
    x = e.clientX - rect.left;
    y = e.clientY - rect.top;
  }
});
drawBox.addEventListener("mouseup", e => {
  if (isDrawing === true) {
    drawLine(context, x, y, e.clientX - rect.left, e.clientY - rect.top);
    x = 0;
    y = 0;
    isDrawing = false;
  }
});

var char = "A";

function drawLine(context, x1, y1, x2, y2) {
  if (Math.sign(x1 - x2) < 0) {
    context.font = "30px Helvetica";
    context.strokeText(char, x1, y1);
  } else {
    context.font = "50px Helvetica";
    context.strokeText(char, x1, y1);
  }
}
// });
