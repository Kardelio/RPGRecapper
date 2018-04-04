class MiscBoxAnimator{
    constructor(){
        this.miscBox = document.createElement("div");

        this.id = "miscBox";
        this.jid = "#"+this.id;
            this.miscBox.id = this.id;
            this.miscBox.style.width = "40%";
            this.miscBox.style.height = "30%";
            this.miscBox.style.padding = 10;
            this.miscBox.style.textAlign = "center";
        this.textDiv = document.createElement("div");
            this.textDiv.style.marginTop = 25;
            this.textDiv.style.marginBottom = 25;
            this.textDiv.style.fontSize = "150%";
        this.miscBox.appendChild(this.textDiv);

        this.miscContentDiv;

        this.currentMiscData;        

        this.messageIter = 0;
        this.typeWriterIter = 0;
        this.currentTypeWriteText;

    }

    showBox(eventData){
        var self = this;
        this.currentMiscData = eventData;
        this.textDiv.innerHTML = this.currentMiscData.sublocation;      
        document.body.appendChild(this.miscBox);
        $(this.jid).hide();        
        $(this.jid).fadeIn("slow", function(){
            self.loadUpSocialBoxAndBegin();
        });
    }

    loadUpSocialBoxAndBegin(){
            var self = this;
            this.miscContentDiv;
            this.npcSpeechDiv;
            this.npcImgDiv;

            this.presentDiv = document.createElement("div");
            this.presentDiv.style.marginTop = 25;
            this.presentDiv.style.marginBottom = 25;
            for(var i = 0; i < this.currentMiscData.heroesPresent.length; i++)
            {
                var hro = campaignLoader.getCharacterById(this.currentMiscData.heroesPresent[i]);
                this.presentDiv.innerHTML += "<img src='"+hro.token_img+"' width='60'/>";
            }       
            this.miscBox.appendChild(this.presentDiv);


            this.miscContentDiv = document.createElement("div");
            this.miscContentDiv.className += "row";

            this.miscContentDiv.id = "miscdiv";

            this.miscBox.appendChild(this.miscContentDiv);
            this.beginDisplayingMisc();
    }

    beginDisplayingMisc(){
        var self = this;
        if(Utils.isNotNull(this.currentMiscData.description)){
            this.typeWriterIter = 0;        
            this.currentTypeWriteText = this.currentMiscData.description;
            this.typewriteMessage();
        }
    }


    typewriteMessage(){
        var self = this;
        if (this.typeWriterIter < this.currentTypeWriteText.length) {
            this.miscContentDiv.innerHTML += this.currentTypeWriteText.charAt(this.typeWriterIter);
            this.typeWriterIter++;
            setTimeout(self.typewriteMessage.bind(this), ConstantVariables.getSpeedOfTypeWriterEffectMiscBox());
        }
        else{
            setTimeout(self.finishedTyping.bind(this), ConstantVariables.getTimeToWaitAfterMessageHasBeenTypedOutMisc());
        }
    }

    finishedTyping(){
        this.animationIsOver();
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
        document.body.removeChild(document.getElementById(this.miscBox.id));
        this.miscBox = null;
    }
}