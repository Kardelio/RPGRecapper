class LevelUpAnimator{
    constructor(){
        this.levelUpBox;
        this.inFadeIter = 0;
        this.fadeOutFromIter = 0;
        this.fadeInToIter = 0;

        this.currentLUObj;
        this.audio = new Audio(campaignLoader.getSoundData().level_up_event);
        var self = this;
        this.audio .addEventListener("ended", function(){
            console.log("ended");
            //end the level up screen
            self.destroyLevelUpBanner();
            storyManager.continueWithStoryAfterLevelUp();
       });
    }

    carryOutLevelUp(luObj){

        this.currentLUObj = luObj;

        this.levelUpBox = document.createElement("div");
        this.levelUpBox.style.width = "100%";
        this.levelUpBox.style.height = "100%";
        this.levelUpBox.style.backgroundColor = "rgba(0,0,0,0.8)";
        this.levelUpBox.style.position = "absolute";
        this.levelUpBox.style.top = "0";
        document.body.appendChild(this.levelUpBox);

        var holdingRow = document.createElement("div");
        holdingRow.style.textAlign = "center";

        var ltxt = document.createElement("div");
        ltxt.innerHTML = "LEVEL UP";
        ltxt.className += "levelUpText shake";
        ltxt.style.opacity = 0;


        luObj.forEach(element => {
            console.log(element);
            //var hero = campaignLoader.getHeroDataById(element.id);
            var hero = campaignLoader.getCharacterById(element.id);
            var heroDiv = document.createElement("div");
            heroDiv.style.display = "inline-block";
            heroDiv.className += "heroLevelUpDiv";
            heroDiv.style.marginLeft = 20;
            heroDiv.style.marginRight = 20;
                var imgg = document.createElement("img");
                imgg.src = hero.token_img;
                imgg.className += "heroLevelUpImg";                
                imgg.width = 200;
            heroDiv.appendChild(imgg);
            var heroTextFrom = document.createElement("span");
            heroTextFrom.className += "levelFromSpan";
            heroTextFrom.innerHTML = element.from;
            var heroTextTo = document.createElement("span");
            heroTextTo.className += "levelToSpan";            
            heroTextTo.innerHTML = element.to;
            heroTextTo.style.opacity = 0;
            heroTextTo.style.top = -300;
            heroDiv.appendChild(document.createElement("br"));            
            heroDiv.appendChild(heroTextFrom); 
            heroDiv.appendChild(document.createElement("br"));                                   
            heroDiv.appendChild(heroTextTo);            
            holdingRow.appendChild(heroDiv);
            heroDiv.style.visibility = "none";
        });
        this.levelUpBox.appendChild(ltxt);
        this.levelUpBox.appendChild(holdingRow);

        var heldDivs = $(".heroLevelUpDiv");
        for(var i = 0; i < heldDivs.length; i++)
        {
            $(heldDivs[i]).css("opacity", 0.0);
            
        }
        this.fadeInChars();
        
    }

    fadeInChars(){
        var self = this;
        var elm =  $(".heroLevelUpDiv")[this.inFadeIter];
        
        $(elm).animate({opacity:1.0},1000,function(){ //2000
            if(self.inFadeIter < self.currentLUObj.length - 1)
            {
                self.inFadeIter++;
                self.fadeInChars();
            }
            else{
                self.fadeOutLevelsFrom();
            }
        });
    }

    deleteTheOldLevelsSpans(){
        $(".levelFromSpan").remove();
    }

    fadeOutLevelsFrom(){
        var self = this;
        var elm =  $(".levelFromSpan")[this.fadeOutFromIter];
        
        $(elm).animate({opacity:0.0},150,function(){ //500

            if(self.fadeOutFromIter < self.currentLUObj.length - 1)
            {
                self.fadeOutFromIter++;
                self.fadeOutLevelsFrom();
            }
            else{
                self.deleteTheOldLevelsSpans();
                self.audio.play();                
                self.revealLevelUpText();
            }
        });
    }

    revealLevelUpText(){
        var self = this;
        $(".levelUpText").animate({opacity:1.0},1000,function(){ //500
            self.bringInTheNewLevels();

        });
    }

    bringInTheNewLevels(){
        var self = this;
        var elm =  $(".levelToSpan")[this.fadeInToIter];
        
        $(".levelToSpan").animate({opacity: 1, top: "+=300"},200,function(){ //500
            // if(self.fadeInToIter < self.currentLUObj.length - 1)
            // {
            //     self.fadeInToIter++;
            //     self.bringInTheNewLevels();
            // }
            // else{
            //     console.log("Done");
            // }
        });
    }

    destroyLevelUpBanner(){
        document.body.removeChild(this.levelUpBox);
    }

}