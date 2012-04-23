var State = function(s) {
  s.attach_game = function(game) { this.game = game; };

  if (!s.render) s.render = function() {};
  if (!s.init) s.init = function() {};
  if (!s.enter) s.enter = function() {};
  if (!s.leave) s.leave = function() {};
  if (!s.update) s.update = function() {};
  if (!s.exit) s.exit = function() {};
  
  return s;
};