class Drawer{
    constructor(){
        this.ctx;
        this.mapCanvas;
        this.mapImage;
        this.mapSrc;
        this.lookingAtNow = {
            x: 0,
            y: 0
        };
        this.differenceInLocationCurrent = {
            x: 0,
            y: 0
        };
        this.locationToAnimateToCurrent = {
            x: 0,
            y: 0
        };
    }

    setAllDrawingData(canvas, width, height,lookingatx,lookingaty){
        this.ctx = canvas.getContext("2d");
        this.mapCanvas = canvas;
        this.mapCanvas.width = width;
        this.mapCanvas.height = height;
        this.lookingAtNow.x = lookingatx;
        this.lookingAtNow.y = lookingaty;
        this.mapImage = new Image();

        this.trackTransforms();

        var self = this;
        this.mapImage.src = this.mapSrc;
        this.mapImage.onload = function(){
            console.log("Map Image is loaded, applying src now...");
            self.redrawAll();
        }
    }

    setCanvasSource(src){
        this.mapSrc = src;
    }

    setLookingAtNow(x,y){
        this.lookingAtNow.x = x;
        this.lookingAtNow.y = y;
    }

    getLookingAtNow(){
        return this.lookingAtNow;
    }

    getCanvas(){
        return this.mapCanvas;
    }

    clearTheCanvas(){
        this.ctx.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
    }

    redrawAll(){
        var p1 = this.ctx.transformedPoint(0,0);
        var p2 = this.ctx.transformedPoint(this.mapCanvas.width,this.mapCanvas.height);
        
        this.ctx.clearRect(p1.x,p1.y,p2.x-p1.x,p2.y-p1.y);
    
        this.ctx.save();
        this.ctx.setTransform(1,0,0,1,0,0);
        this.ctx.clearRect(0,0,this.mapCanvas.width,this.mapCanvas.height);
        this.ctx.restore();
    
        this.ctx.drawImage(this.mapImage,0,0,this.mapCanvas.width,this.mapCanvas.height);
    
        var tempHoldingTravelLines = mapManager.getAllTravelLines();
        for(var i = 0; i < tempHoldingTravelLines.length; i++){
            tempHoldingTravelLines[i].draw(this.ctx);
        }
    
        // var tempHoldingCombatLocations = mapManager.getAllBattleLocations();
        // for(var i = 0; i < tempHoldingCombatLocations.length; i++){
        //     tempHoldingCombatLocations[i].draw(this.ctx);
        // }
        
        var tempHoldingMapLocations = mapManager.getAllMapLocations();
        for(var i =0; i < tempHoldingMapLocations.length; i++)
        {
            tempHoldingMapLocations[i].draw();
            //console.log(tempHoldingMapLocations[i]);
        }

        // var tempHoldingCombatLocations = mapManager.getAllBattleLocations();
        // for(var i = 0; i < tempHoldingCombatLocations.length; i++){
        //     tempHoldingCombatLocations[i].draw(this.ctx);
        // }
    }

    lookAt(xin,yin) {
        this.locationToAnimateToCurrent = {
            x: xin, y: yin
        };
        this.differenceInLocationCurrent = {
            x: this.lookingAtNow.x - xin, y: this.lookingAtNow.y - yin
        };
        this.ctx.translate(this.differenceInLocationCurrent.x,this.differenceInLocationCurrent.y);
    }

    zoomTo(scale){
        var pt = this.ctx.transformedPoint(this.lookingAtNow.x,this.lookingAtNow.y);
        this.ctx.translate(pt.x,pt.y);
        this.ctx.scale(scale,scale);
        this.ctx.translate(-pt.x,-pt.y);
    }

    resetCamera(){
        var scaleUsed = storyManager.getZoomScaleJustUsed();
        if(scaleUsed == 2)
        {
            this.zoomTo(0.5);
        }
        else if(scaleUsed == 4)
        {
            this.zoomTo(0.25);
        }
        else{
            //assume 2
            this.zoomTo(0.5);
        }
        this.locationToAnimateToCurrent = {
            x: clientWidth/2 - -this.differenceInLocationCurrent.x,
            y: clientHeight/2 - -this.differenceInLocationCurrent.y
        };
        this.differenceInLocationCurrent = {
            x: this.lookingAtNow.x - this.locationToAnimateToCurrent.x, y: this.lookingAtNow.y - this.locationToAnimateToCurrent.y
        };
        this.ctx.translate(this.differenceInLocationCurrent.x,this.differenceInLocationCurrent.y);
        drawer.redrawAll();
    }

    drawLineToMouseCoords(sx,sy,mx,my)
    {
        this.redrawAll();
        this.ctx.beginPath();
        this.ctx.lineWidth = 2;
        this.ctx.strokeStyle = "#FFFFFF"; 
        this.ctx.moveTo(sx,sy);
        this.ctx.lineTo(mx,my);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    drawSpecifcImage(img,x,y,w,h){       
        this.ctx.drawImage(img,x,y,w,h);
    }

    drawMapLocationWithBattle(img,x,y,w,h){
        this.ctx.beginPath();
        this.ctx.lineWidth = "2";
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "#f00";
        this.ctx.rect(x-1, y-1, w+2, h+2);
        this.ctx.stroke();
        this.ctx.fill();           
        this.ctx.closePath();
        this.ctx.drawImage(img,x,y,w,h);
    }

    drawMapLocationWithSocial(img,x,y,w,h){
        this.ctx.beginPath();
        this.ctx.lineWidth = "2";
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "#0f0";
        this.ctx.rect(x-1, y-1, w+2, h+2);
        this.ctx.stroke();
        this.ctx.fill();           
        this.ctx.closePath();
        this.ctx.drawImage(img,x,y,w,h);
    }

    drawMapLocationWithMisc(img,x,y,w,h){
        this.ctx.beginPath();
        this.ctx.lineWidth = "2";
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "#00f";
        this.ctx.rect(x-1, y-1, w+2, h+2);
        this.ctx.stroke();
        this.ctx.fill();           
        this.ctx.closePath();
        this.ctx.drawImage(img,x,y,w,h);
    }

    drawMapLocationWithBoth(img,x,y,w,h){
        this.ctx.beginPath();
        this.ctx.lineWidth = "2";
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "#f00";
        this.ctx.rect(x-1, y-1, w/2, h+2);
        this.ctx.stroke();
        this.ctx.fill();           
        this.ctx.closePath();
        this.ctx.beginPath();
        this.ctx.lineWidth = "2";
        this.ctx.strokeStyle = "black";
        this.ctx.fillStyle = "#0f0";
        this.ctx.rect(x+(w/2), y-1, (w/2) + 1, h+2);
        this.ctx.stroke();
        this.ctx.fill();           
        this.ctx.closePath();
        this.ctx.drawImage(img,x,y,w,h);
    }

    drawSmallPartOfTravelLine(w, c, mx, my, lx, ly){
        this.ctx.beginPath();
        this.ctx.lineWidth = w;
        this.ctx.strokeStyle = c; 
        this.ctx.moveTo(mx,my);
        this.ctx.lineTo(lx,ly);
        this.ctx.stroke();
        this.ctx.closePath();
    }

    // drawSmallPartOfCombatCircle(frame, c, x, y, cr, sc, sw){
    //     if(frame > 49)
    //     {
    //         this.redrawAll();
    //     }

    //     this.ctx.beginPath();
    //     this.ctx.lineWidth = sw;
    //     this.ctx.strokeStyle = sc; 
    //     this.ctx.arc(x,y,cr,0,2*Math.PI);
    //     this.ctx.fillStyle = c;
    //     this.ctx.fill();
    //     this.ctx.stroke();
    // }

    drawSmallPartOfCircle(frame, c, x, y, cr, sc, sw){
        if(frame > 49)
        {
            this.redrawAll();
        }

        this.ctx.beginPath();
        this.ctx.lineWidth = sw;
        this.ctx.strokeStyle = sc; 
        this.ctx.arc(x,y,cr,0,2*Math.PI);
        this.ctx.fillStyle = c;
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawCircle(x,y,r,sw,sc,fc){
        this.ctx.beginPath();
        this.ctx.lineWidth = sw;   
        this.ctx.strokeStyle = sc;
        this.ctx.arc(x,y,r,0,2*Math.PI);
        this.ctx.fillStyle = fc;
        this.ctx.fill();
        this.ctx.stroke();
    }

    // drawSmallPartOfSocialCircle(frame, c, x, y, cr, sc, sw){
    //     if(frame > 49)
    //     {
    //         this.redrawAll();
    //     }

    //     this.ctx.beginPath();
    //     this.ctx.lineWidth = sw;
    //     this.ctx.strokeStyle = sc; 
    //     this.ctx.arc(x,y,cr,0,2*Math.PI);
    //     this.ctx.fillStyle = c;
    //     this.ctx.fill();
    //     this.ctx.stroke();
    // }

    // drawMapLocationDuringShrinkAndGrow(img, x, y, w, h)
    // {
    //     this.ctx.drawImage(img,x,y,w,h);
    // }


    //========================================================================
    //==================    Utility Code Below    ============================
    //========================================================================

    trackTransforms(){
        var self = this;
        var svg = document.createElementNS("http://www.w3.org/2000/svg",'svg');
        var xform = svg.createSVGMatrix();
        this.ctx.getTransform = function(){ return xform; };
    
        var savedTransforms = [];
        var save = this.ctx.save;
        this.ctx.save = function(){
            savedTransforms.push(xform.translate(0,0));
            return save.call(self.ctx);
        };
      
        var restore = this.ctx.restore;
        this.ctx.restore = function(){
          xform = savedTransforms.pop();
          return restore.call(self.ctx);
        };
    
        var scale = this.ctx.scale;
        this.ctx.scale = function(sx,sy){
          xform = xform.scaleNonUniform(sx,sy);
          return scale.call(self.ctx,sx,sy);
        };
      
        var rotate = this.ctx.rotate;
        this.ctx.rotate = function(radians){
            xform = xform.rotate(radians*180/Math.PI);
            return rotate.call(self.ctx,radians);
        };
      
        var translate = this.ctx.translate;
        this.ctx.translate = function(dx,dy){
            xform = xform.translate(dx,dy);
            return translate.call(self.ctx,dx,dy);
        };
      
        var transform = this.ctx.transform;
        this.ctx.transform = function(a,b,c,d,e,f){
            var m2 = svg.createSVGMatrix();
            m2.a=a; m2.b=b; m2.c=c; m2.d=d; m2.e=e; m2.f=f;
            xform = xform.multiply(m2);
            return transform.call(self.ctx,a,b,c,d,e,f);
        };
      
        var setTransform = this.ctx.setTransform;
        this.ctx.setTransform = function(a,b,c,d,e,f){
            xform.a = a;
            xform.b = b;
            xform.c = c;
            xform.d = d;
            xform.e = e;
            xform.f = f;
            return setTransform.call(self.ctx,a,b,c,d,e,f);
        };
      
        var pt  = svg.createSVGPoint();
        this.ctx.transformedPoint = function(x,y){
            pt.x=x; pt.y=y;
            return pt.matrixTransform(xform.inverse());
        }
    }
}