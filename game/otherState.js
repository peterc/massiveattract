var otherState = new State({
  init: function() {
    this.randoms = new RandomGenerator();
    this.randoms.prepare();
    this.rotation = 0;
    
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
    if (Keyboard.wasPressed(32)) {
      Sound.playFile('noise.mp3');
      this.game.switchToState('main');
      
    }
  },
  
  render: function() {    
    var idx = -1;
    var canvasData = this.game.canvas.canvasData;
    
    if (this.randoms.randPos % 20 === 0) {
      this.rotation = (this.rotation + 1) % 3;
    }

    for (var y = 0; y < this.game.canvas.height; y++) {
      for (var x = 0; x < this.game.canvas.width; x++) {
      //  v = ;
        var v = -100; //(x + _this.randoms.randPos * _this.randoms.nextElement() * y * Math.sin(y / 3) + Math.cos(x / 100)) % 36;

        var radius = ((this.game.frame * 2 % 100));
        var distance = this.distanceTable[y][x];
            
        if (((distance ^ 0) - this.game.frame) * 4 % 30 === 0) {
          v = 0 + distance;
        }
        
        //if (distance > radius && distance < radius + 7) {
        //  v = -25;
        //}
        

        canvasData.data[++idx] = 100 + v;
        canvasData.data[++idx] = 120 + v;
        canvasData.data[++idx] = 160 + v;
        



        canvasData.data[++idx] = 255;          
      }
    }

    this.game.canvas.context.putImageData(canvasData, 0, 0);
  }
});