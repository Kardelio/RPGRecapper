class Animator{
    constructor(){
        this.noFrameInCurrentAnimation = 1;
        this.gloablAnimatorHandler;
        this.animationIntervalSpeed = 20;
        this.currentAnimationMode = "travel";
        this.currentAnimatableObj = [];

        this.currentLineData = {};
        this.currentCircleData = {};
    }

    animate(){

    }

    calculateAnimationFramesForTravel(verts, duration)
    {
        var waypoints=[];
        for(var i=1;i<verts.length;i++){
            var pt0=verts[i-1];
            var pt1=verts[i];
            var dx=pt1.x-pt0.x;
            var dy=pt1.y-pt0.y;
            for(var j=0;j<duration;j++){ //duration - used to be 100
                var x=pt0.x+dx*j/duration;
                var y=pt0.y+dy*j/duration;
                waypoints.push({x:x,y:y});
            }
        }
        this.currentAnimatableObj = waypoints;
    }

    calculateAnimationFramesForSocial(largeRad,endRad,duration){
        var radiusList=[];
        for(var j=0;j<duration/2;j++){
            var pt0=0;
            var pt1=largeRad;
            var d=pt1-pt0;
            var r=pt0+d*j/(duration/2);
            radiusList.push(r);
        }
        for(var j=0;j<duration/2;j++){
            var pt0=largeRad;
            var pt1=endRad;
            var d=pt1-pt0;
            var r=pt0+d*j/(duration/2);        
            radiusList.push(r);
        }
        this.currentAnimatableObj = radiusList; 
    }

    calculateAnimationFramesForBattle(largeRad,endRad,duration){
        var radiusList=[];
        for(var j=0;j<duration/2;j++){
            var pt0=0;
            var pt1=largeRad;
            var d=pt1-pt0;
            var r=pt0+d*j/(duration/2);
            radiusList.push(r);
        }
        for(var j=0;j<duration/2;j++){
            var pt0=largeRad;
            var pt1=endRad;
            var d=pt1-pt0;
            var r=pt0+d*j/(duration/2);        
            radiusList.push(r);
        }
        this.currentAnimatableObj = radiusList; 
    }

    prepareToAnimateTravel(lineData){
        console.log("Preparing variables for travel line", lineData);
        this.currentAnimationMode = "travel";
        this.currentLineData = lineData;
    }

    //combat

    prepareToAnimateBattle(circleData, battle){
        console.log("Preparing variables for combat circle", circleData, battle);
        this.currentAnimationMode = "combat";        
        this.currentCircleData = circleData;
        this.currentBattleLocation = battle;
    }

    prepareToAnimateSocial(circleData, social){
        console.log("Preparing variables for social circle", circleData, social);
        this.currentAnimationMode = "social";        
        this.currentCircleData = circleData;
        this.currentSocialLocation = social;
    }

    prepareToAnimateLocationEvent(type)
    {
        this.currentAnimationMode = type;
    }

    beginAnimation(){
        this.noFrameInCurrentAnimation = 1;
        this.gloablAnimatorHandler = setInterval(this.carryOutGenericAnimationThread.bind(this),this.animationIntervalSpeed);
    } 

    carryOutGenericAnimationThread(){
        var mayContinue = true;

        if(this.noFrameInCurrentAnimation < this.currentAnimatableObj.length - 1)
        {
        }
        else
        {
            clearInterval(this.gloablAnimatorHandler);
            this.animationComplete();
        }

        if(mayContinue)
        {
            if(this.currentAnimationMode == "travel")
            {
                drawer.drawSmallPartOfTravelLine(this.currentLineData.width, this.currentLineData.color, this.currentAnimatableObj[this.noFrameInCurrentAnimation-1].x,this.currentAnimatableObj[this.noFrameInCurrentAnimation-1].y,this.currentAnimatableObj[this.noFrameInCurrentAnimation].x,this.currentAnimatableObj[this.noFrameInCurrentAnimation].y);
            }
            else if(this.currentAnimationMode == "combat")
            {
                drawer.drawSmallPartOfCircle(this.noFrameInCurrentAnimation,this.currentCircleData.color, this.currentBattleLocation.x, this.currentBattleLocation.y, this.currentAnimatableObj[this.noFrameInCurrentAnimation],this.currentCircleData.strokeColor, this.currentCircleData.stokeWidth);
            }
            else if(this.currentAnimationMode == "social")
            {
                drawer.drawSmallPartOfCircle(this.noFrameInCurrentAnimation,this.currentCircleData.color, this.currentSocialLocation.x, this.currentSocialLocation.y, this.currentAnimatableObj[this.noFrameInCurrentAnimation],this.currentCircleData.strokeColor, this.currentCircleData.stokeWidth);
            }
            else{
                console.log("Problem with animator");
            }
            this.noFrameInCurrentAnimation++;
        }
    }

    animationComplete(){
        console.log("Animation is complete!");
        if(this.currentAnimationMode == "combat")
        {
            console.log("Battle Box Animator coming up!");
            var bba = new BattleBoxAnimator();
            bba.showBox(storyManager.getCurrentEventInScope());
        }
        else if(this.currentAnimationMode == "social")
        {
            console.log("Battle Box Animator coming up!");
            // var bba = new BattleBoxAnimator();
            // bba.showBox(storyManager.getCurrentEventInScope());
            var sba = new SocialBoxAnimator();
            sba.showBox(storyManager.getCurrentEventInScope());
            //storyManager.animatorHasFinishedItsAnimation();

            //TODO: 
        }
        else if(this.currentAnimationMode == "misc"){
            //Misc
            console.log("misc event box incoming!");
            var mba = new MiscBoxAnimator();
            mba.showBox(storyManager.getCurrentEventInScope());
        }
        else{
            storyManager.animatorHasFinishedItsAnimation();
        }
    }
}