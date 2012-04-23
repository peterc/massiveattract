// an extended and tweaked version based upon ideas in
// http://www.html5rocks.com/en/tutorials/games/assetmanager/

function AssetManager() {
  this.downloadQueue = [];
  this.successCount = 0;
}

AssetManager.prototype.queueDownload = function(path) {
    this.downloadQueue.push(path);
}

AssetManager.prototype.downloadAll = function(finished) {
  for (var i = 0; i < this.downloadQueue.length; i++) {
    var path = this.downloadQueue[i];
    
    if (/\.(mp3|aac|wav)$/.test(path)) {
      var asset = new Audio();
      var eventName = "canplaythrough";
    } else {
      var asset = new Image();
      var eventName = "load";
    }
    
    var that = this;
    
    asset.addEventListener(eventName, function() {
      that.successCount += 1;
      if (that.successCount === that.downloadQueue.length) {
        finished();
      }
    }, false);
    
    asset.src = path;
  }
}