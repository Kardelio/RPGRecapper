class SocialBoxAnimator{
    constructor(){
        this.socialBox = document.createElement("div");

        this.id = "socialBox";
        this.jid = "#"+this.id;
            this.socialBox.id = this.id;
            this.socialBox.style.width = "80%";
            //this.socialBox.style.height = "90%";
            //this.socialBox.style.height = "60%";
            this.socialBox.style.height = "60%";
            this.socialBox.style.minHeight = 200;
            this.socialBox.style.minWidth = 400;
            this.socialBox.style.padding = 10;
            this.socialBox.style.textAlign = "center";
        this.textDiv = document.createElement("div");
            this.textDiv.style.marginTop = 25;
            this.textDiv.style.marginBottom = 25;
            this.textDiv.style.fontSize = "200%";
           // this.textDiv.innerHTML = "Social!"; //TODO:
        this.socialBox.appendChild(this.textDiv);

        this.npcDiv;
        this.npcSpeechDiv;
        this.npcImgDiv;
        this.npcImgInside;
        this.npcUnderImgInside;
        this.npcSpeechInside;
        

        this.idForNpcDiv;
        this.idForNpcDivImg;
        this.idForNpcDivSpeech;
        this.currentSocialData;        
        this.currentNPClist = [];
        this.npcIter = 0;
        this.messageIter = 0;
        this.typeWriterIter = 0;
        this.currentTypeWriteText;

    }

    showBox(eventData){
        var self = this;
        this.currentSocialData = eventData;
        this.textDiv.innerHTML = this.currentSocialData.sublocation;      
        document.body.appendChild(this.socialBox);
        $(this.jid).hide();        
        $(this.jid).fadeIn("slow", function(){
            self.loadUpSocialBoxAndBegin();
        });
    }
    

    loadUpSocialBoxAndBegin(){
        //for(var i = 0; i < this.currentSocialData.involved.length; i++)
        //{
            // var singleNpc = this.currentSocialData.involved[i];
            // console.log(singleNpc);

            var self = this;
            this.npcDiv;
            this.npcSpeechDiv;
            this.npcImgDiv;

            this.npcDiv = document.createElement("div");
            this.npcDiv.className += "row";
            
            this.npcSpeechDiv = document.createElement("div");
            this.npcImgDiv = document.createElement("div");
            this.npcSpeechDiv.className += "column75 speechBubbleHolder";
            //this.npcSpeechDiv.innerHTML = ".";
            this.npcImgDiv.className += "column25";

            this.npcImgInside = document.createElement("img");
            this.npcUnderImgInside = document.createElement("span");
            this.npcUnderImgInside.className += " nameUnderSpeechImg";
            this.npcImgInside.style.float = "left";
            //this.npcImgInside.width = "300";            
            this.npcImgInside.style.width = "100%";            
            this.npcImgDiv.appendChild(this.npcImgInside);
            this.npcImgDiv.appendChild(this.npcUnderImgInside);

            this.npcSpeechInside = document.createElement("div");
            this.npcSpeechInside.className += "speech-bubble";
            this.npcSpeechInside.innerHTML = "...";
            this.npcSpeechDiv.appendChild(this.npcSpeechInside);
                //for-
            //for(var j = 0; j < singleNpc.messages.length; j++)
           // {
            // var npcSpeech = document.createElement("div");
            // npcSpeech.className += "speech-bubble";
            // npcSpeech.innerHTML = "";
            // this.npcSpeechDiv.appendChild(npcSpeech);

            //}

            this.npcDiv.style.margin = 10;
            this.npcDiv.className += " oddSpeechBox";
            this.npcDiv.appendChild(this.npcSpeechDiv);
            this.npcDiv.appendChild(this.npcImgDiv);

            this.npcDiv.id = "npcdiv";
            this.npcImgDiv.id = "npcdivI";
            this.npcSpeechDiv.id = "npcdivS";

            this.socialBox.appendChild(this.npcDiv);
            this.idForNpcDiv = "#"+this.npcDiv.id;
            this.idForNpcDivImg = "#"+this.npcImgDiv.id;
            this.idForNpcDivSpeech = "#"+this.npcSpeechDiv.id;
            //$(heldDivs[i]).css("opacity", 0.0);
            $(this.idForNpcDiv).css("opacity", 0.0);
            $(this.idForNpcDivImg).css("opacity", 0.0);
            $(this.idForNpcDivSpeech).css("opacity", 0.0);
            //this.currentNPClist.push(npcDiv);
            $(this.idForNpcDiv).animate({opacity:1.0},ConstantVariables.getTimeForTokenToFadeInForsocialBox(),function(){
                self.npcSpeechInside.innerHTML = "";
                self.beginSingleInvoledBlock();    
            });            
            //this.beginSingleInvoledBlock();    
        //}
    }

    beginSingleInvoledBlock(){
        var self = this;
        console.log(this.currentSocialData.involved[this.npcIter]);
        if(Utils.isNotNull(this.currentSocialData.involved[this.npcIter])){
            console.log("grdgdf");
            this.npcImgInside.src = this.currentSocialData.involved[this.npcIter].token;
            this.npcUnderImgInside.innerHTML = this.currentSocialData.involved[this.npcIter].name;    
            $(self.idForNpcDivImg).animate({opacity:1.0},ConstantVariables.getTimeForTokenToFadeInForsocialBox(),function(){
                $(self.idForNpcDivSpeech).animate({opacity:1.0},ConstantVariables.getTimeForTokenToFadeInForsocialBox(),function(){
                    self.loopMessages();                        
                });
            });
        

            // $(self.idForNpcDiv).fadeIn(ConstantVariables.getTimeForTokenToFadeInForsocialBox(),function(){
            //     $(self.idForNpcDivImg).fadeIn(ConstantVariables.getTimeForTokenToFadeInForsocialBox(),function(){
            //         $(self.idForNpcDivSpeech).fadeIn(ConstantVariables.getTimeForTokenToFadeInForsocialBox(),function(){
            //             self.loopMessages();
            //         });
            //     });
            // });
        }
    }

    loopMessages(){
        var self = this;
        this.npcSpeechInside.innerHTML = "";      
        this.typeWriterIter = 0;        
        this.currentTypeWriteText = this.currentSocialData.involved[this.npcIter].messages[this.messageIter].message;
        this.typewriteMessage();
    }

    typewriteMessage(){
        var self = this;
        if (this.typeWriterIter < this.currentTypeWriteText.length) {
            this.npcSpeechInside.innerHTML += this.currentTypeWriteText.charAt(this.typeWriterIter);
            this.typeWriterIter++;
            setTimeout(self.typewriteMessage.bind(this), ConstantVariables.getSpeedOfTypeWriterEffect());
        }
        else{
            setTimeout(self.nextThingAfterTypeWait.bind(this), ConstantVariables.getTimeToWaitAfterMessageHasBeenTypedOut());
            

        }
    }

    nextThingAfterTypeWait(){
        var self = this;
        if(this.messageIter < this.currentSocialData.involved[this.npcIter].messages.length-1)
        {
            this.messageIter++;
            this.loopMessages();
        }
        else{
            //messages done try and move to next npc
            if(this.npcIter < this.currentSocialData.involved.length-1)
            {
                $(self.idForNpcDivImg).animate({opacity:0.0},ConstantVariables.getTimeForTokenToFadeInForsocialBox(),function(){
                    $(self.idForNpcDivSpeech).animate({opacity:0.0},ConstantVariables.getTimeForTokenToFadeInForsocialBox(),function(){
                        self.messageIter = 0;
                        self.npcIter++;
                        self.npcSpeechInside.innerHTML = "";      
    
                        self.beginSingleInvoledBlock();
                    });
                });

            }
            else{
                //super done
                console.log("All messages done!");
                this.animationIsOver();
            }
        }
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
        document.body.removeChild(document.getElementById(this.socialBox.id));
        this.socialBox = null;
    }
}