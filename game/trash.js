for (var y = 0; y < this.game.canvas.height; y++) {
   for (var x = 0; x < this.game.canvas.width; x++) {
   //  v = ;
     var v = -100; //(x + _this.randoms.randPos * _this.randoms.nextElement() * y * Math.sin(y / 3) + Math.cos(x / 100)) % 36;

     var xq = Math.pow(x - (this.game.internalWidth / 2), 2);
     var yq = Math.pow(y - (this.game.internalHeight / 2), 2);
     
     var radius = (100 - (this.game.frame * 4 % 100));
     var distance = Math.sqrt(xq + yq);
         
     if (distance < radius) {
       v = 0 + distance;
     }
     
     if (distance > radius && distance < radius + 7) {
       v = -25;
     }
     
     switch(this.rotation) {
       case 0:
         canvasData.data[++idx] = this.randoms.nextElement();
         canvasData.data[++idx] = 100 + v;
         canvasData.data[++idx] = 250;
         break;
       case 1:
         canvasData.data[++idx] = this.randoms.nextElement();
         canvasData.data[++idx] = 155 + v;
         canvasData.data[++idx] = 250;
         break;
       case 2:
         canvasData.data[++idx] = 150 + v;
         canvasData.data[++idx] = 150 + v;
         canvasData.data[++idx] = this.randoms.nextElement();
         break;
       case 3:
         canvasData.data[++idx] = 255;
         canvasData.data[++idx] = 255;
         canvasData.data[++idx] = 255;
         break;
       
     }

     canvasData.data[++idx] = 255;          
   }
 }