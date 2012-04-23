soundManager.url = '/vendor/sm2/swf/';
soundManager.waitForWindowLoad = true;
soundManager.flashVersion = 9;

var Sound = {
  init: function(filename) {
    this.sound = soundManager.createSound({
      id: 'sound' + filename.split('.')[0],
      url: '/sound/' + filename
    });
    
    return this;
  },
  
  play: function(options) {
    options = options || {};
    options.multiShotEvents = true;
    this.sound.play(options);
  },
  
  stop: function() {
    this.sound.stop();
  },
  
  loadedSounds: {},
  
  get: function(filename) {
    if (this.loadedSounds[filename]) {
      return this.loadedSounds[filename];
    }
    return this.loadedSounds[filename] = Object.create(Sound).init(filename);
  },
  
  playFile: function(filename) {
    this.get(filename).play();
  }
};

