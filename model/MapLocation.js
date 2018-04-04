class MapLocation{
    constructor(id,n,x,y,t,i,d){
        this.id = id;
        this.name = n;
        this.x = x;
        this.y = y;
        if(i != null)
        {
            this.sizeWidth = i.width/2;
            this.sizeHeight = i.height/2;
            this.x = x - (this.sizeWidth/2);
            this.y = y - (this.sizeWidth/2);
        }

        this.type = t;
        this.image = i;

        this.data = d;

        this.combats = [];
        this.socials = [];
        this.miscs = [];

        this.noFrameInCurrentAnimation = 1;
        this.gloablAnimatorHandler 

        this.aniWidthNow;
        this.aniHeightNow;
        this.aniX;
        this.aniY;
        this.htw;
        this.hth;
        this.mayAnimate = true;
    }

    getId(){
        return this.id;
    }

    draw(){
        var com = this.combats.length > 0 ? 1 : 0; 
        var soc = this.socials.length > 0 ? 1 : 0; 
        var mis = this.miscs.length > 0 ? 1 : 0; 
        let sum = com + soc + mis;

        if(Utils.isNotNull(this.id))
        {
            if(sum > 1)
            {
                drawer.drawMapLocationWithBoth(this.image,this.x,this.y,this.sizeWidth,this.sizeHeight);                           
            }
            else{
                if(this.combats.length > 0)
                {
                    drawer.drawMapLocationWithBattle(this.image,this.x,this.y,this.sizeWidth,this.sizeHeight);
                }
                else if(this.socials.length > 0)
                {
                    drawer.drawMapLocationWithSocial(this.image,this.x,this.y,this.sizeWidth,this.sizeHeight);
                }
                else if(this.miscs.length > 0)
                {
                    drawer.drawMapLocationWithMisc(this.image,this.x,this.y,this.sizeWidth,this.sizeHeight);
                }
                else{
                    drawer.drawSpecifcImage(this.image,this.x,this.y,this.sizeWidth,this.sizeHeight);
                }
            }
        }
        else{
            if(sum > 1)
            {
                drawer.drawCircle(this.x, 
                    this.y, 
                    ConstantVariables.getVariablesForLocationCircle().endRadius,
                    ConstantVariables.getVariablesForBothCircle().strokeWidth,
                    ConstantVariables.getVariablesForBothCircle().strokeColor,
                    ConstantVariables.getVariablesForBothCircle().color);                            
            }
            else{
                if(this.combats.length > 0)
                {
                    drawer.drawCircle(this.x, 
                        this.y, 
                        ConstantVariables.getVariablesForLocationCircle().endRadius,
                        ConstantVariables.getVariablesForBattleCircle().strokeWidth,
                        ConstantVariables.getVariablesForBattleCircle().strokeColor,
                        ConstantVariables.getVariablesForBattleCircle().color);
                }
                else if(this.socials.length > 0)
                {
                    drawer.drawCircle(this.x, 
                        this.y, 
                        ConstantVariables.getVariablesForLocationCircle().endRadius,
                        ConstantVariables.getVariablesForSocailCircle().strokeWidth,
                        ConstantVariables.getVariablesForSocailCircle().strokeColor,
                        ConstantVariables.getVariablesForSocailCircle().color);
                }
                else if(this.miscs.length > 0)
                {
                    drawer.drawCircle(this.x, 
                        this.y, 
                        ConstantVariables.getVariablesForLocationCircle().endRadius,
                        ConstantVariables.getVariablesForMiscCircle().strokeWidth,
                        ConstantVariables.getVariablesForMiscCircle().strokeColor,
                        ConstantVariables.getVariablesForMiscCircle().color);
                }
            } 
        }
    }           

    continueToRenderMapInfo(){
        SideBarDrawer.sideBarOpenAndDisplay(this.name, this.combats, this.socials, this.miscs, this.data);
    }

    hasBattlesIn(){
        if(this.combats.length > 0)
        {
            return true;
        }
        else{
            return false;
        }
    }

    hasMiscsIn(){
        if(this.miscs.length > 0)
        {
            return true;
        }
        else{
            return false;
        }
    }

    hasSocialsIn(){
        if(this.socials.length > 0)
        {
            return true;
        }
        else{
            return false;
        }
    }

    
    addBattleToLocation(combat){
        console.log("saving battle to location: ", combat);
        this.combats.push(combat);
    }

        
    addSocialToLocation(socail){
        console.log("saving socail to location: ", socail);
        this.socials.push(socail);
    }

    addMiscToLocation(misc){
        console.log("saving misc to location: ", misc);
        this.miscs.push(misc);
    }

    // addBattleToLocation(sessionNum, battle){
    //     console.log("saving battle to location: ", sessionNum, battle);
    //     this.battles.push({sessionNo: sessionNum, battleData: battle});
    // }

    // addSocialToLocation(sessionNum, social)
    // {
    //     console.log("saving socail to location: ", sessionNum, social);
    //     this.socials.push({sessionNo: sessionNum, socialData: social});
    // }

    getId()
    {
        return this.id;
    }

    click(x,y){
        console.log("Clicked Map location: ", this);        
        var self = this;
        if(Utils.isNotNull(this.data))
        {
            $.ajaxSetup({cache:true});                
            $.ajax({
                type: 'GET',
                url: self.data,
                success:function(extraInfo){
                    console.log("success",extraInfo);
                    self.data = extraInfo;
                    self.continueToRenderMapInfo();
                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                    console.log("error", errorThrown);
                    self.continueToRenderMapInfo();                        
                }
            });
        }
        else{
            self.continueToRenderMapInfo(null);                                    
        }
    }

    triggerGrowAndShrinkAnimation(type){
        this.eventComingIn = type;
        this.mayAnimate = true;        
        this.noFrameInCurrentAnimation = 1;
        // this.startingWidth = this.sizeWidth;
        // this.startingHeight = this.sizeHeight;
        this.aniWidthNow = this.sizeWidth;
        this.aniHeightNow = this.sizeHeight;
        this.aniX = this.x;
        this.aniY = this.y;
        this.gloablAnimatorHandler = setInterval(this.carryOutGrowAndShrinkAnimation.bind(this),20);
    }

    carryOutGrowAndShrinkAnimation(){
        if(this.noFrameInCurrentAnimation < 100)
        {
        }
        else
        {
            this.mayAnimate = false;
            clearInterval(this.gloablAnimatorHandler);
            this.draw();
            this.animationComplete();
        }

        if(this.mayAnimate)
        {
            if(this.noFrameInCurrentAnimation < 50)
            {
                this.aniWidthNow = this.sizeWidth +(this.noFrameInCurrentAnimation/2);
                this.aniHeightNow = this.sizeHeight +(this.noFrameInCurrentAnimation/2);
                this.aniX = this.x - (this.noFrameInCurrentAnimation/4);
                this.aniY = this.y - (this.noFrameInCurrentAnimation/4);
                this.hth = this.aniHeightNow;
                this.htw = this.aniWidthNow;
                drawer.redrawAll();
                drawer.drawSpecifcImage(this.image,this.aniX,this.aniY,this.aniWidthNow,this.aniHeightNow);            
            }
            else{
                this.aniWidthNow = this.htw -((this.noFrameInCurrentAnimation/2) - 25);
                this.aniHeightNow = this.hth -((this.noFrameInCurrentAnimation/2) - 25);
                this.aniX = this.x + ((this.noFrameInCurrentAnimation/4) - 25);
                this.aniY = this.y + ((this.noFrameInCurrentAnimation/4) - 25);
                drawer.redrawAll();
                drawer.drawSpecifcImage(this.image,this.aniX,this.aniY,this.aniWidthNow,this.aniHeightNow);            
            }
            this.noFrameInCurrentAnimation++;
        }
    }

    animationComplete(){
        console.log("Map Battle Location Animation is complete!");
        if(this.eventComingIn == "combat")
        {
            //this.hasBattleIn = true;
        }
        else if(this.eventComingIn == "social"){
            //this.hasSocialIn = true;
        }
        else{
            //Misc
        }
        //here is where it is set
        drawer.redrawAll();
        animator.animationComplete();
    }
}