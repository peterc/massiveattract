var loadingState = new State({
  init: function() {
    this.loadedYet = false;
    this.distanceTable = [];
    for (var y = 0; y < this.game.canvas.height; y++) {
      var thisRow = [];
      for (var x = 0; x < this.game.canvas.width; x++) {
        var xq = Math.pow(x - (this.game.internalWidth / 2), 2);
        var yq = Math.pow(y - (this.game.internalHeight / 2), 2);
        var distance = Math.sqrt(xq + yq);
        
        thisRow.push(distance);
      }
      this.distanceTable.push(thisRow);
    }
  },
  
  update: function() {
    if (Keyboard.wasPressed(32) && !this.game.loading) {
      //Sound.playFile('noise.mp3');
      this.game.switchToState('main');
    }
    
    if (!this.loadedYet && !this.game.loading) {
      this.loadedYet = true;
      this.music = Sound.get("music2.mp3");
      this.music.play();
    }
  },
  
  render: function() {
    this.game.canvas.clear("#035");

    var ctx = this.game.canvas.context;
    
    
    var idx = -1;
    var canvasData = this.game.canvas.canvasData;
    for (var y = 0; y < this.game.canvas.height; y++) {
      for (var x = 0; x < this.game.canvas.width; x++) {
        var v = -100;

        var radius = ((this.game.frame * 2 % 100));
        var distance = this.distanceTable[y][x];
        var cycleDistance = Math.abs(((distance ^ 0) + this.game.frame) * 4 % 120);
            
        if (cycleDistance < 40) {
          v = 0; // + distance;
          canvasData.data[++idx] = 0 + v;
          canvasData.data[++idx] = 80 + v;
          canvasData.data[++idx] = 120 + v;
          canvasData.data[++idx] = 255; 
        } else {
          idx += 4;
        }
      }
    }

    this.game.canvas.context.putImageData(canvasData, 0, 0);
    
    
    ctx.fillStyle = "#fff";
    ctx.font = "40px ernest";
    ctx.textAlign = "center";
    
    if (this.game.loading) {
      ctx.fillText("LOADING..", this.game.canvas.width / 2, this.game.canvas.height / 2 + 10);
    } else {
      ctx.fillStyle = "#ff0";
      ctx.fillText("MASSIVE ATTRACT", this.game.canvas.width / 2, this.game.canvas.height / 2 - 55);
      ctx.fillStyle = "#adf";
      ctx.font = "20px ernest";
      ctx.fillText("OUR WORLD IS SHRINKING DUE TO MINING", this.game.canvas.width / 2, this.game.canvas.height / 2 - 20);
      ctx.fillText("IT HAS LOST GRAVITY, WHICH SUCKS FOR US", this.game.canvas.width / 2, this.game.canvas.height / 2 + 0);
      ctx.fillText("GUIDE US INTO ASTEROIDS TO ADD MASS", this.game.canvas.width / 2, this.game.canvas.height / 2 + 20);
      ctx.fillText("USE UP AND DOWN ARROWS TO MOVE US", this.game.canvas.width / 2, this.game.canvas.height / 2 + 40);
      ctx.fillText("GOLD ASTEROIDS ARE MOST AWESOME!!", this.game.canvas.width / 2, this.game.canvas.height / 2 + 60);
      ctx.fillStyle = "#fff";      
      ctx.fillText("PRESS SPACE TO PLAY", this.game.canvas.width / 2, this.game.canvas.height - 15);
    };
    
  },
  
  leave: function() {
    this.music.stop();
  }
});