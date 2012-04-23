var Asteroid = function(s) {
  s = s || {};
  s.attach_game = function(game) { this.game = game; };
  
  var sprite = new Image();
  sprite.src = 'gfx/asteroid1.png';
  
  s.sprite = sprite;
  s.x = -30 - Math.randomInt(50);
  s.y = Math.randomInt(260) - 20;
  s.direction = Math.randomInt(50) + 65;
  s.rotation = 0;
  s.delta = Math.randomInt(8) + 1;
  s.rotationDelta = 1;
  s.magic = false;
  s.size = s.sprite.width;

  if (!s.render) s.render = function() {
    var rotation = this.rotation / 57.2957795;
    var xt = this.x + (this.sprite.width / 2);
    var yt = this.y + (this.sprite.height / 2);
    
    this.game.canvas.context.translate(xt, yt);
    this.game.canvas.context.rotate(rotation);
    this.game.canvas.context.drawImage(this.sprite, -(this.sprite.width / 2), -(this.sprite.height / 2), s.size, s.size);
    this.game.canvas.context.rotate(-rotation);
    this.game.canvas.context.translate(-xt, -yt);
  };
  
  s.makeMagic = function() {
    this.sprite = new Image();
    this.sprite.src = 'gfx/asteroid2.png';
    this.magic = true;
    this.delta = 4;
    this.size = 16;
  }
  
  if (!s.init) s.init = function() {
  };
  if (!s.enter) s.enter = function() {
  };
  
  if (!s.leave) s.leave = function() {};
  
  if (!s.update) s.update = function() {
    this.x += this.delta * Math.sin(this.direction / 57.2957795);
    this.y -= this.delta * Math.cos(this.direction / 57.2957795);    
    this.rotation += (this.rotationDelta * this.delta) % 360;
    if (Math.randomInt(45) === 40) {
      this.direction = (this.direction + Math.randomInt(20) - 10) % 360;
    }
  };
  
  if (!s.exit) s.exit = function() {};
  
  return s;
};