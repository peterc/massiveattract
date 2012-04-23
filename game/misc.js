var RandomGenerator = function() {
  this.prepare = function() {
    var randoms = [];
    this.randSize = 4332;  
    this.randPos = 0;
    for (var i = 0; i <= this.randSize; i++)
      randoms.push(Math.floor(Math.random() * 255));
    this.randoms = randoms;
  };
  
  this.nextElement = function() {
    this.randPos = (this.randPos + 1) % this.randSize;
    return this.randoms[this.randPos];
  };
};

Math.randomInt = function(max) {
  return (Math.random() * max) ^ 0;
}