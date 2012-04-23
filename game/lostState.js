var lostState = new State({
  init: function() {
  },
  
  update: function() {
    if (Keyboard.wasPressed(32)) {
      this.game.switchToState('loading');
    }
  },
  
  render: function() {    
    this.game.canvas.clear("#013");
    
    var ctx = this.game.canvas.context;
    
    ctx.fillStyle = "#f00";
    ctx.font = "40px ernest";
    ctx.textAlign = "center";
    
    var msg = "THANKS FOR NOTHING!";
    ctx.fillText(msg, this.game.canvas.width / 2, this.game.canvas.height / 2 - 20);
    
    ctx.font = "20px ernest";
    ctx.fillText("OUR PLANET IS HOSED AND WE", this.game.canvas.width / 2, this.game.canvas.height / 2 + 20);
    ctx.fillText("ARE ALL DEAD. GOOD JOB.", this.game.canvas.width / 2, this.game.canvas.height / 2 + 40);

    ctx.fillText("PRESS SPACE TO DO BETTER", this.game.canvas.width / 2, this.game.canvas.height - 30);
    
  },
  
  enter: function() {
    this.music = Sound.get("laughter.mp3");
    this.music.play();  
  },
  
  leave: function() {
    this.music.stop();
  }
});