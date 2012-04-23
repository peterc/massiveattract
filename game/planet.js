var Planet = function(s) {
  s = s || {};
  s.attach_game = function(game) { this.game = game; };
  
  var sprite = new Image();
  sprite.src = 'gfx/planet.png';
  
  s.sprite = sprite;
  s.x = 180;
  s.y = 120;
  s.size = 30;
  s.accel = 0;
  s.accelRate = 0.1;
  s.decay = 0.05;
  s.hurt = false;
  
  var _this = s;
  s.decayInterval = setInterval(function() {
    _this.decay += 0.004;
  }, 4000);

  if (!s.render) s.render = function() {
    this.game.canvas.context.drawImage(this.sprite, this.x - (this.size / 2), this.y - (this.size / 2), this.size, this.size);
  };
  
  if (!s.init) s.init = function() {
  };
  if (!s.enter) s.enter = function() {
  };
  
  if (!s.leave) s.leave = function() {
    clearInterval(this.decayInterval);
  };
  
  if (!s.update) s.update = function() {
    //this.x += this.delta * Math.sin(this.direction / 57.2957795);
    //this.y -= this.delta * Math.cos(this.direction / 57.2957795);
    //this.rotation += this.rotationDelta % 360;
    
    this.size -= (this.decay + (this.size / 500));
    
    this.accelRate = 1.2 / (Math.log(this.size) * 1.7);
    
    if (this.size < 4) {
      this.game.switchToState('lost');
    }
    
    if (this.size > 100) {
      this.game.switchToState('win');
    }
    
    var asteroids = this.game.asteroids;
    
    for (var i = 0; i < asteroids.length; i++) {
      var asteroid = asteroids[i];
      if (
        (asteroid.x >= this.x - (this.size / 2) - asteroid.size) && (asteroid.x <= this.x + (this.size / 2))
        &&
        (asteroid.y >= this.y - (this.size / 2) - asteroid.size) && (asteroid.y <= this.y + (this.size / 2))        
      ) {
        // collision
        Sound.playFile('crash.mp3');
        if (asteroid.magic) {
          this.size += 25;
        } else {
          this.size += 6;
        }
        this.game.asteroids.splice(this.game.asteroids.indexOf(asteroid), 1);
      }
    }
    
    if (Keyboard.isDown(38)) {
      if (this.accel === 0) { this.accel = -0.2; }
      this.accel -= s.accelRate;
    }
    
    if (Keyboard.isDown(40)) {
      if (this.accel === 0) { this.accel = 0.2; }
      this.accel += s.accelRate;
    }
    
    if ((this.y > 15 || this.accel > 0) && (this.y < 225 || this.accel < 0)) { 
      this.y += this.accel;
      this.hurt = false;
    } else if (!this.hurt) {
      this.hurt = true;
      this.accel *= -0.2;
      Sound.playFile('noise.mp3');
      this.size *= 0.6;
    }
    
  };
  
  if (!s.exit) s.exit = function() {};
  
  return s;
};