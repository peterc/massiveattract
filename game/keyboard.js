var Keyboard = {
  active: true,
  keysDown: [],
  keysUnprocessed: [],
  
  keyDown: function(e) {
    if (!this.active)
      return;
    
    if (this.keysDown.indexOf(e.keyCode) === -1) {
      this.keysDown.push(e.keyCode);
      this.keysUnprocessed = this.keysDown.slice(0);
    }
      
    if ((e.keyCode > 36 && e.keyCode < 41) || e.keyCode == 32)
      e.preventDefault();      
  },
  
  keyUp: function(e) {
    if (!this.active) {
      this.keysDown = [];
      return;
    }
    
    this.keysDown.splice(this.keysDown.indexOf(e.keyCode), 1);
  },
  
  isDown: function(char) {
    if (typeof char == 'string') {
      char = char.charCodeAt(0);
    }
    return this.keysDown.indexOf(char) > -1;
  },
  
  wasPressed: function(char) {
    if (typeof char == 'string') {
      char = char.charCodeAt(0);
    }
    if (this.keysUnprocessed.indexOf(char) > -1) {
      this.keysUnprocessed.splice(this.keysUnprocessed.indexOf(char), 1);
      return true;
    } else {
      return false;
    }
  },
  
  init: function() {
    document.onkeydown = function(e) { return Keyboard.keyDown(e); }
    document.onkeyup = function(e) { return Keyboard.keyUp(e); }    
  }
};

