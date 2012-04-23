var Game = function() {
  var _this = this;
  
  this.soundReady = false;
  this.statsEnabled = true;
  this.loading = true;
  this.assetsReady = false;

  this.internalWidth = 360;
  this.internalHeight = 240;
  this.displayWidth = 720;
  this.displayHeight = 480;
  
  this.frame = 0;
  
  this.states = {};
    
  this.prepareStats = function() {
    var stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.bottom = '0px';
    stats.domElement.style.right = '0px';
    document.body.appendChild(stats.domElement);
    this.stats = stats;
  };
  
  this.addState = function(name, state) {
    this.states[name] = state;
    state.attach_game(this);
  };
  
  this.init = function() {
    if (this.statsEnabled) this.prepareStats();
    this.canvas = new Canvas();
    this.canvas.prepare(this.internalWidth, this.internalHeight, this.displayWidth, this.displayHeight);
    //this.canvasData = this.canvas.canvasData;
    Keyboard.init();
    
    var _this = this;
    soundManager.onready(function() {
      _this.soundReady = true;
      if (_this.assetsReady) { _this.loading = false; }
    });
    
    var assetMan = new AssetManager();
    assetMan.queueDownload('sound/music2.mp3');
    assetMan.queueDownload('sound/laughter.mp3');
    assetMan.queueDownload('sound/win.mp3');
    assetMan.queueDownload('sound/crash.mp3');
    assetMan.queueDownload('sound/ingame.mp3');
    assetMan.queueDownload('sound/noise.mp3');
    assetMan.queueDownload('sound/gold.mp3');
    assetMan.queueDownload('gfx/asteroid1.png');
    assetMan.queueDownload('gfx/asteroid2.png');
    assetMan.queueDownload('gfx/planet.png');
    assetMan.downloadAll(function() {
      _this.assetsReady = true;
      if (_this.soundReady) { _this.loading = false; }
    });
    
    // just in case
    setTimeout(function() {
      _this.loading = false;
    }, 5500);
    
    return this;
  };
  
  this.switchToState = function(state) {
    if (typeof state === 'string')
      state = this.states[state];
      
    state.init();
    if (this.state) this.state.leave();
    this.state = state;
    if (state.enter) state.enter();
  };
  
  this.start = function() {
    if (!this.state) this.switchToState(this.states[Object.keys(this.states)[0]]);
    this.queueNewFrame();
    setInterval(this.update, 24);
  };
  
  this.update = function() {
    _this.state.update();
  };
  
  this.queueNewFrame = function() { 
    //this.queueNewFrame = function() {};
    //return window.setInterval(this.render, 1000);
           
    if (window.requestAnimationFrame)
      window.requestAnimationFrame(this.render);
    else if (window.msRequestAnimationFrame)
      window.msRequestAnimationFrame(this.render);
    else if (window.webkitRequestAnimationFrame)
      window.webkitRequestAnimationFrame(this.render);
    else if (window.mozRequestAnimationFrame)
      window.mozRequestAnimationFrame(this.render);
    else if (window.oRequestAnimationFrame)
      window.oRequestAnimationFrame(this.render);
    else {
      this.queueNewFrame = function() {};
      return window.setInterval(this.render, 20);
    }
  };
  
  this.render = function() {
    _this.frame += 1;
    _this.state.render();
    _this.queueNewFrame();
    _this.stats.update();
  };
  
  return this;
};


