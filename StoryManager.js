class StoryManager{
    constructor(){
        this.sessionIterator = 0;
        this.focusAreaIterator = 0;
        this.eventIterator = 0;

        this.currentFocusAreaData = {};
        this.currentEventInScope = {};

        this.zoomScaleUsed = 2;

        this.justRunningSingleSessionRecap = false;

        var self = this;
       
    }

    recapSingleSession(sessionId){
        console.log("Recapping Session", sessionId);
    }

    loadSpecificButtons()
    {
        console.log("Returning specific buttons to be pressed...");
        var outHtml = "<div style='text-align: center;'>";
        var campaignsNow = campaignLoader.getAllSessionObjects();
        
        outHtml += "<p>Here you can choose a single specific session to recap...</p>";
        for(var c = 0; c < campaignsNow.length; c++)
        {
            outHtml += "<button class='specificSessionButton' onclick='storyManager.specificSessionButtonPressed(\"" + c + "\")'>Session "+(c+1)+"</button></br>";
        }
        outHtml+="</div>";
        return outHtml;
    }

    specificSessionButtonPressed(sessionId)
    {
        console.log("Playing... ", sessionId);
        this.clearTheStoryBoard();
        domManager.hideControlPanel();
        floatingWindowManager.closeWindow();
        this.sessionIterator = parseInt(sessionId);
        this.focusAreaIterator = 0;
        this.eventIterator = 0;
        this.justRunningSingleSessionRecap = true;        
        this.handleNextSingleFocusArea();
    }

    justShowAllInstantly(){
        console.log("Just Showing all without animation");

        this.clearTheStoryBoard();
        this.sessionIterator = 0;
        this.focusAreaIterator = 0;
        this.eventIterator = 0;

        var campaignsNow = campaignLoader.getAllSessionObjects();

        for(var c = 0; c < campaignsNow.length; c++)
        {
            for(var f = 0; f < campaignsNow[c].focus_areas.length; f++)
            {
                for(var e = 0; e < campaignsNow[c].focus_areas[f].events.length; e++)
                {
                    var singleEvent = campaignsNow[c].focus_areas[f].events[e];
                    if(singleEvent.type == "travel")
                    {
                        mapManager.saveTravelLine(singleEvent);
                    }
                    else if(singleEvent.type == "combat")
                    {
                        if(Utils.isNotNull(singleEvent.atSpecificMapLocation))
                        {
                            var combat = new Combat(singleEvent,c+1);
                            mapManager.getLocationWithSpecificId(singleEvent.atSpecificMapLocation).addBattleToLocation(combat);
                        }
                        else{
                            mapManager.saveBattleCircle(singleEvent, c+1);
                        }
                    }
                    else if(singleEvent.type == "social")
                    {
                        if(Utils.isNotNull(singleEvent.atSpecificMapLocation))
                        {
                            var social = new Social(singleEvent,c+1);                            
                            mapManager.getLocationWithSpecificId(singleEvent.atSpecificMapLocation).addSocialToLocation(social);
                        }
                        else{
                            mapManager.saveSocialCircle(singleEvent, c+1);
                        }
                    }
                    else if(singleEvent.type == "misc")
                    {
                        if(Utils.isNotNull(singleEvent.atSpecificMapLocation))
                        {
                            var misc = new Misc(singleEvent,c+1);                            
                            mapManager.getLocationWithSpecificId(singleEvent.atSpecificMapLocation).addMiscToLocation(misc);
                        }
                        else{
                            mapManager.saveMiscCircle(singleEvent, c+1);
                        }
                    }
                    else{
                    }
                }
            }
        }

       drawer.redrawAll();
    
    }

    beginTheStory(){
        console.log("The Campaign data: ", campaignLoader.getFullCampaignData());
        console.log("All the session files coming in: ",campaignLoader.getAllSessionObjects());
    
        this.clearTheStoryBoard();

        this.sessionIterator = 0;
        this.focusAreaIterator = 0;
        this.eventIterator = 0;
        this.justRunningSingleSessionRecap = false;        

        this.handleNextSingleFocusArea();
    }

    updateSessionHeaderBar(){
        var present = "";
        for(var i = 0; i < campaignLoader.getAllSessionObjects()[this.sessionIterator].present.length; i++)
        {
            //getCharacterById
           // var hro = campaignLoader.getHeroDataById(campaignLoader.getAllSessionObjects()[this.sessionIterator].present[i]);
            var hro = campaignLoader.getCharacterById(campaignLoader.getAllSessionObjects()[this.sessionIterator].present[i]);
            present += "<img src='"+hro.token_img+"' width='30'/>";
        }
        document.getElementById("currentInfoBlockSession").innerHTML = "Session: "+ (this.sessionIterator+1);
        document.getElementById("currentInfoBlockPresent").innerHTML = present;
    }

    getZoomScaleJustUsed(){
        return this.zoomScaleUsed;
    }

    handleNextSingleFocusArea(){
       var self = this;
    
       this.eventIterator = 0;
       
       this.currentFocusAreaData = campaignLoader.getAllSessionObjects()[this.sessionIterator].focus_areas[this.focusAreaIterator];
       this.updateSessionHeaderBar();
  
       document.getElementById("currentInfoBlockTitle").innerHTML = this.currentFocusAreaData.title;
       $("#currentInfoBlock").fadeIn( "fast", function() {});

       drawer.setLookingAtNow(clientWidth/2,clientHeight/2);
       drawer.lookAt(this.currentFocusAreaData.x,this.currentFocusAreaData.y);
       if(this.currentFocusAreaData.zoomScale == 2 || this.currentFocusAreaData.zoomScale == 4)
       {
            this.zoomScaleUsed = this.currentFocusAreaData.zoomScale;
            drawer.zoomTo(this.currentFocusAreaData.zoomScale); // 2
       }
       else
       {
            this.currentFocusAreaData.zoomScale = 2;
            drawer.zoomTo(2); // 2
       }
       drawer.redrawAll();

       setTimeout(function() {
          self.handleNextSingleEvent();
       }, ConstantVariables.getTimeToWaitBeforeStartingEventsMS());
    }

    getCurrentEventInScope(){
        return this.currentEventInScope;
    }

    handleNextSingleEvent(){
        this.currentEventInScope = this.currentFocusAreaData.events[this.eventIterator];
        document.getElementById("currentInfoBlockSubtitle").innerHTML = this.currentEventInScope.subtitle;

        switch (this.currentEventInScope.type) {
            case "travel":
                this.carryOutTravelEvent();
                break;
            case "combat":
                this.carryOutCombatEvent();
                break;
            case "social":
                this.carryOutSocialEvent();
                break;
            case "misc":
                this.carryOutMiscEvent();
                break;
            default:
                break;
        }
    }

    carryOutTravelEvent(){
        var vertices=[];
        vertices.push({x:this.currentEventInScope.from.x,y:this.currentEventInScope.from.y});
        vertices.push({x:this.currentEventInScope.to.x,y:this.currentEventInScope.to.y});
        animator.calculateAnimationFramesForTravel(vertices,100); //bigger the duration longer it takes
        animator.prepareToAnimateTravel(ConstantVariables.getVariablesForTravelLine());

        soundManager.playSoundEffect("travel",false);
        animator.beginAnimation();
    }

    carryOutCombatEvent(){
        var self = this;  
        soundManager.playSoundEffect("combat", true);   
        if(Utils.isNotNull(this.currentEventInScope.atSpecificMapLocation))
        {
            animator.prepareToAnimateLocationEvent("combat");
            mapManager.getLocationWithSpecificId(this.currentEventInScope.atSpecificMapLocation).triggerGrowAndShrinkAnimation("combat");
        }
        else{
            animator.calculateAnimationFramesForBattle(ConstantVariables.getVariablesForLocationCircle().largeRadius, ConstantVariables.getVariablesForLocationCircle().endRadius, 100);
            animator.prepareToAnimateBattle(ConstantVariables.getVariablesForBattleCircle(), {x: this.currentEventInScope.at.x, y: this.currentEventInScope.at.y});
            animator.beginAnimation();
        }
    }

    carryOutSocialEvent(){
        soundManager.playSoundEffect("social", true);           
        if(Utils.isNotNull(this.currentEventInScope.atSpecificMapLocation))
        {
            animator.prepareToAnimateLocationEvent("social");
            mapManager.getLocationWithSpecificId(this.currentEventInScope.atSpecificMapLocation).triggerGrowAndShrinkAnimation("social");
        }
        else{
            animator.calculateAnimationFramesForSocial(ConstantVariables.getVariablesForLocationCircle().largeRadius,ConstantVariables.getVariablesForLocationCircle().endRadius,100);
            animator.prepareToAnimateSocial(ConstantVariables.getVariablesForSocailCircle(),{x: this.currentEventInScope.at.x, y: this.currentEventInScope.at.y});
            animator.beginAnimation();
        }
    }
    
    carryOutMiscEvent(){
        /**
         * Involved
         * Location
         */

        if(Utils.isNotNull(this.currentEventInScope.atSpecificMapLocation))
        {
            animator.prepareToAnimateLocationEvent("misc");
            mapManager.getLocationWithSpecificId(this.currentEventInScope.atSpecificMapLocation).triggerGrowAndShrinkAnimation("misc");
        }
        else{
            animator.calculateAnimationFramesForSocial(ConstantVariables.getVariablesForLocationCircle().largeRadius,ConstantVariables.getVariablesForLocationCircle().endRadius,100);
            animator.prepareToAnimateSocial(ConstantVariables.getVariablesForMiscCircle(),{x: this.currentEventInScope.at.x, y: this.currentEventInScope.at.y});
            animator.beginAnimation();
        }

        //misc sound
        //animate it!
        // if(Utils.isNotNull(this.currentEventInScope.atSpecificMapLocation))
        // {
        //     animator.prepareToAnimateLocationEvent("social");
        //     mapManager.getLocationWithSpecificId(this.currentEventInScope.atSpecificMapLocation).triggerGrowAndShrinkAnimation("social");
        // }
        // else{
        //     animator.calculateAnimationFramesForSocial(ConstantVariables.getVariablesForLocationCircle().largeRadius,ConstantVariables.getVariablesForLocationCircle().endRadius,100);
        //     animator.prepareToAnimateSocial(ConstantVariables.getVariablesForSocailCircle(),{x: this.currentEventInScope.at.x, y: this.currentEventInScope.at.y});
        //     animator.beginAnimation();
        // }
    }

    animatorHasFinishedItsAnimation(){
       soundManager.canEndRepeatingSoundEffect();

        var self = this;
        switch (this.currentEventInScope.type) {
            case "travel":
                mapManager.saveTravelLine(this.currentEventInScope);
                break;
            case "combat":
                if(Utils.isNotNull(this.currentEventInScope.atSpecificMapLocation))
                {
                    var combat = new Combat(this.currentEventInScope, this.sessionIterator+1);
                    mapManager.getLocationWithSpecificId(this.currentEventInScope.atSpecificMapLocation).addBattleToLocation(combat);
                }
                else{
                    mapManager.saveBattleCircle(this.currentEventInScope, this.sessionIterator+1);
                }
                break;
            case "social":
                if(Utils.isNotNull(this.currentEventInScope.atSpecificMapLocation))
                {
                    var social = new Social(this.currentEventInScope, this.sessionIterator+1);
                    mapManager.getLocationWithSpecificId(this.currentEventInScope.atSpecificMapLocation).addSocialToLocation(social);
                }
                else{
                    mapManager.saveSocialCircle(this.currentEventInScope, this.sessionIterator+1);
                }
                break;
            case "misc":
                if(Utils.isNotNull(this.currentEventInScope.atSpecificMapLocation))
                {
                    var misc = new Misc(this.currentEventInScope, this.sessionIterator+1);
                    mapManager.getLocationWithSpecificId(this.currentEventInScope.atSpecificMapLocation).addMiscToLocation(misc);
                }
                else{
                    mapManager.saveMiscCircle(this.currentEventInScope, this.sessionIterator+1);
                }
                break;
            default:
                break;
        }

        if((this.eventIterator+1) < this.currentFocusAreaData.events.length)
        {
            this.eventIterator++;
            setTimeout(function(){
                self.handleNextSingleEvent();
            },ConstantVariables.getTimeToWaitAfterEachEvent());
        }
        else{
            this.eventsAreAllDone();
        }
    }

    eventsAreAllDone(){
        var self = this;              
        setTimeout(function(){
            $("#currentInfoBlock").fadeOut( "fast", function() {
                drawer.resetCamera();
                self.checkForNextCampaignData();
            });
        },this.currentFocusAreaData.waitToViewTime);
    }

    checkForNextCampaignData(){
        var self = this;
        if((this.focusAreaIterator + 1) < campaignLoader.getAllSessionObjects()[this.sessionIterator].focus_areas.length)
        {
            this.focusAreaIterator++;
            console.log("Continuing with session "+this.sessionIterator+", incrementing Focus Area Iter to: " + this.focusAreaIterator);
            setTimeout(function(){
                self.handleNextSingleFocusArea();   
            },ConstantVariables.getTimeToWaitBetweenFocusAreasMS()); 
        }
        else{
            
            this.focusAreaIterator = 0;
            if(campaignLoader.getAllSessionObjects()[this.sessionIterator].level != null)
            {
                var luAnimator = new LevelUpAnimator();
                luAnimator.carryOutLevelUp(campaignLoader.getAllSessionObjects()[this.sessionIterator].level);
            }
            else{
                this.continueWithStoryAfterLevelUp();
            }
        }
    }

    continueWithStoryAfterLevelUp(){
        var self = this;
        if(((this.sessionIterator + 1) < campaignLoader.getAllSessionObjects().length) && this.justRunningSingleSessionRecap == false)
        {
            this.sessionIterator++;
            console.log("Moving onto the next session! " + this.sessionIterator + " Focus Iter is at: "+this.focusAreaIterator);        
            setTimeout(function(){
                self.handleNextSingleFocusArea();   
            },ConstantVariables.getTimeToWaitBetweenFocusAreasMS());   
            
        }
        else{
            console.log("Full Campaign recap complete!");
            domManager.showControlPanel();
        }
    }

    clearTheStoryBoard(){
        drawer.clearTheCanvas();
        mapManager.clearAllLists();
        drawer.redrawAll();
    }
}