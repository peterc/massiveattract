var mainState = new State({
  init: function() {
    this.randoms = new RandomGenerator();
    this.randoms.prepare();
    this.rotation = 0;
    this.stars = [];
    this.game.asteroids = [];
    this.game.startTime = new Date().getTime() / 1000 ^ 0;
    
    for (var i = 0; i < 600; i++) {
      this.stars.push([Math.randomInt(this.game.canvas.width), Math.randomInt(this.game.canvas.height * 3) - this.game.canvas.height, Math.randomInt(180) + 10]);
    }
    
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
    
    this.addAsteroids();
    
    var _this = this;
    this.asteroidInterval = setInterval(function() {
      _this.addAsteroids();
    }, 3000);
    
    var planet = new Planet();
    planet.attach_game(this.game);
    this.planet = planet;
  },
  
  addAsteroids: function() {
    var howMany = Math.randomInt(12) + 1;
    for (var i = 0; i < howMany; i++) {
      var asteroid = new Asteroid();
      asteroid.attach_game(this.game);
      if (Math.randomInt(25) === 1) {
        asteroid.makeMagic();
        Sound.playFile('gold.mp3');
      }
      this.game.asteroids.push(asteroid);
    }
    
  },
  
  update: function() {
    //if (Keyboard.wasPressed(32)) {
    //  // Sound.playFile('noise.mp3');
    //  this.game.switchToState('lost');
    //}
    
    for (var i = 0; i < this.game.asteroids.length; i++) {
      var asteroid = this.game.asteroids[i];
      asteroid.update();
      if (asteroid.x > 400) {
        this.game.asteroids.splice(this.game.asteroids.indexOf(asteroid), 1);
      }
    }
    
    this.planet.update();
  },
  
  render: function() {
    var idx = -1;
    this.game.canvas.clear("#001426");
    
    if (this.planet.hurt) {
      this.game.canvas.clear("#f00");
    }

    var canvasData = this.game.canvas.canvasData;
    var canvasWidth = this.game.canvas.width;
    var canvasHeight = this.game.canvas.height;
    
    
    var idx = -1;
    for (var y = 0; y < this.game.canvas.height; y++) {
      for (var x = 0; x < this.game.canvas.width; x++) {
        var v = -100;

        var radius = ((this.game.frame * 2 % 100));
        var distance = this.distanceTable[y][x] ^ 0;
        
        var cycleDistance = (distance + (this.game.frame % 30)) % 30;
        
        if (cycleDistance < 15) {
          v = 0; // + distance;
          canvasData.data[++idx] = (this.planet.hurt ? 120 : 0);
          canvasData.data[++idx] = 22;
          canvasData.data[++idx] = 47;
          canvasData.data[++idx] = 255; 
        } else {
          idx += 4;
        }
      }
    }

    //this.game.canvas.context.putImageData(canvasData, 0, 0);
    
    
    for (var i = 0; i < this.stars.length; i++) {
      var star = this.stars[i];
      var x = star[0];
      var y = star[1];
      y -= ((this.planet.y * 0.25) - 120) ^ 0;
      if ((Math.random() * 50 ^ 0) == 1) brightness += 65;  // twinkle!
      if ((Math.random() * 80 ^ 0) == 1) x += 1;  // twinkle!
      var pixelStart = y * 4 * canvasWidth + x * 4;
      var brightness = star[2];
      canvasData.data[pixelStart++] = brightness;
      canvasData.data[pixelStart++] = brightness;
      canvasData.data[pixelStart++] = brightness;
      canvasData.data[pixelStart++] = 255;
    }
    
    this.game.canvas.context.putImageData(canvasData, 0, 0);
    
    this.planet.render();
    
    for (var i = 0; i < this.game.asteroids.length; i++) {
      this.game.asteroids[i].render();
    }
    
  },
  
  enter: function() {
    this.music = Sound.get("ingame.mp3");
    this.music.play({loops: 999});
  },
  
  leave: function() {
    this.music.stop();
    clearInterval(this.asteroidInterval);
  }
});