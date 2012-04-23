var winState = new State({
  init: function() {
    this.game.endTime = new Date().getTime() / 1000 ^ 0;
  },
  
  update: function() {
    if (Keyboard.wasPressed(32)) {
      this.game.switchToState('loading');
    }
  },
  
  render: function() {    
    this.game.canvas.clear("#013");
    
    var ctx = this.game.canvas.context;
    
    ctx.fillStyle = "#ff0";
    ctx.font = "80px ernest";
    ctx.textAlign = "center";
    
    ctx.fillText("THANKS!", this.game.canvas.width / 2, this.game.canvas.height / 2);
    
    ctx.fillStyle = "#fff";
    ctx.font = "20px ernest";
    ctx.fillText("YOU SAVED OUR PLANET IN", this.game.canvas.width / 2, this.game.canvas.height / 2 + 30);
    ctx.fillText(this.game.endTime - this.game.startTime + " SECONDS!", this.game.canvas.width / 2, this.game.canvas.height / 2 + 50);
  },
  
  enter: function() {
    this.music = Sound.get("win.mp3");
    this.music.play();
    var _this = this;
    setTimeout(function() {
      _this.game.switchToState('loading');
    }, 10000);
  },
  
  leave: function() {
    this.music.stop();
  }
});