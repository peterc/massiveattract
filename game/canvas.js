var Canvas = function() {
  this.prepare = function(width, height, displayWidth, displayHeight) {
    var cv = document.getElementById('c');
    var context = cv.getContext('2d');
    
    cv.width = width;
    cv.height = height;
    cv.style.width = displayWidth + "px";
    cv.style.height = displayHeight + "px";
    
    this.canvasData = context.createImageData(width, height);
    this.width = width;
    this.height = height;

    this.canvas = cv;    
    this.context = context;
  };
  
  this.clear = function(color) {
    this.context.fillStyle = color;
    this.context.fillRect(0, 0, this.width, this.height);
    this.canvasData = this.context.getImageData(0, 0, this.width, this.height);
  };
};