class BattleBoxAnimator{
    constructor(){
        this.battleBox = document.createElement("div");
        this.id = "battleBox";
        this.jid = "#"+this.id;
            this.battleBox.id = this.id;
            this.battleBox.style.maxWidth = 600;
            this.battleBox.style.maxHeight = 600;
            this.battleBox.style.minHeight = 200;
            this.battleBox.style.minWidth = 400;
            this.battleBox.style.padding = 10;
            this.battleBox.style.textAlign = "center";
            this.battleBox.style.top = window.innerHeight/2;
            this.battleBox.style.left = window.innerWidth/2;
        this.currentBattleData;
        this.textDiv = document.createElement("div");
            this.textDiv.style.marginTop = 25;
            this.textDiv.style.marginBottom = 25;
            this.textDiv.style.fontSize = "200%";
            this.textDiv.innerHTML = "Battle!"; //TODO:
        this.battleBox.appendChild(this.textDiv);

        this.currentEnemyCount = 1;

        this.currentEnemiesList = [];
        this.enemyIter = 0;
        this.killIter = 0;

        this.currentEnemiesToDieList = [];
    }

    showBox(eventData){
        var self = this;
        this.currentBattleData = eventData;
        document.body.appendChild(this.battleBox);
        $(this.jid).hide();        
        this.battleBox.style.top = (window.innerHeight/2) - 200;
        this.battleBox.style.left = (window.innerWidth/2) - 200;

        $(this.jid).fadeIn("slow", function(){
            self.beginBattleAnimation();
        });
    }
    
    updateBoxParams(){
        this.battleBox.style.top = (window.innerHeight/2) - this.battleBox.offsetHeight / 2;
        this.battleBox.style.left = (window.innerWidth/2) - this.battleBox.offsetWidth / 2;
    }

    beginBattleAnimation(){
        for(var i = 0; i < this.currentBattleData.enemies.length; i++)
        {
            var en = this.currentBattleData.enemies[i];
            for(var j = 0; j < en.number; j++)
            {
                var singleEnemy = document.createElement("div");
                var singleEnemyImg = document.createElement("img");
                singleEnemyImg.src = en.token;
                singleEnemy.style.display = "inline-block";
                singleEnemy.style.position = "relative";
                singleEnemy.style.margin = 10;

                singleEnemy.appendChild(singleEnemyImg);
                
                singleEnemy.id = i+""+j;

                if(en.killers.length > j)
                {
                    singleEnemy.setAttribute("killedBy", en.killers[j]);
                }
                singleEnemyImg.width = 80;
                singleEnemyImg.style.position = "relative";
                singleEnemyImg.style.top = 0;
                singleEnemyImg.style.left = 0;
                this.battleBox.appendChild(singleEnemy);
                this.updateBoxParams();
                
                $("#"+singleEnemy.id).hide();                
                this.currentEnemiesList.push(singleEnemy);
            }
        }
        this.appearEachEnemy();
    }

    appearEachEnemy(){
        var self = this;
        
        $("#"+this.currentEnemiesList[this.enemyIter].id).fadeIn(ConstantVariables.getTimeForTokenToFadeInForBattleBox(),function(){
            if(self.enemyIter < self.currentEnemiesList.length-1)
            {
                self.updateBoxParams();
                self.currentEnemyCount++;
                self.textDiv.innerHTML = "Enemies: "+ self.currentEnemyCount;
                self.enemyIter++;
                self.appearEachEnemy();
            }
            else{
                setTimeout(function(){
                    self.prepareEnemiesToDie();
                },1000);
            }

        });
    }

    prepareEnemiesToDie(){
        this.currentEnemiesToDieList = $("[killedby]");
        this.killEnemy();
    }

    killEnemy()
    {
        var self = this;
        var temp = $("#"+this.currentEnemiesToDieList[this.killIter].id)[0];        
        var xImg = document.createElement("img");
            xImg.src = "media/x.png";
            xImg.width = 80;
            xImg.id = "x"+this.killIter;
            xImg.style.opacity = 0.6;
            xImg.style.position = "absolute";
            xImg.style.left = 0;
            xImg.style.top = 0;
        var hroImg = document.createElement("img");        
            //hroImg.src = campaignLoader.getHeroDataById(temp.getAttribute("killedBy")).token_img;
            hroImg.src = campaignLoader.getCharacterById(temp.getAttribute("killedBy")).token_img;
            hroImg.width = 50;
            hroImg.id = "h"+this.killIter;
            hroImg.style.position = "absolute";
            hroImg.style.right = 0;
            hroImg.style.bottom = 0;
        temp.appendChild(xImg);
        temp.appendChild(hroImg);

        $("#x"+this.killIter).hide();
        $("#h"+this.killIter).hide();
        $("#x"+this.killIter).fadeIn(ConstantVariables.getTimeForTokenToFadeInForBattleBox(),function(){
            $("#h"+self.killIter).fadeIn(200,function(){
                self.textDiv.innerHTML = "Enemies: "+ self.currentEnemyCount + "<br/> Kills: "+(self.killIter+1);
                
                if(self.killIter < self.currentEnemiesToDieList.length-1)
                {
                    self.killIter++;
                    self.killEnemy();
                }
                else{
                    setTimeout(function(){
                        self.animationIsOver();
                    },ConstantVariables.getTimeToWaitAfterBattleBoxIsFinished());
                }
            });

        });
    }

    animationIsOver(){
        var self = this;
        $(this.jid).fadeOut("slow", function(){
            self.destroyBox();
            storyManager.animatorHasFinishedItsAnimation();
        });
    }

    destroyBox(){
        this.currentEnemiesToDieList = [];
        document.body.removeChild(document.getElementById(this.battleBox.id));
        this.battleBox = null;
    }
}