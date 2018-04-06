class SoundManager{
    constructor(){
        this.campaignSoundObj = campaignLoader.getSoundData();
        console.log(this.campaignSoundObj);
        this.backgroundMusic = new Audio(this.campaignSoundObj.background);
        this.walkingSoundEffect = new Audio(this.campaignSoundObj.travel_event);
        this.combatSoundEffect = new Audio(this.campaignSoundObj.combat_event);
        this.socialSoundEffect = new Audio(this.campaignSoundObj.social_event);

        this.currentSoundEffect;
    
        this.mayPlayEffects = true;
        this.mayPlayBacking = false;
        this.mayStillContinueToRepeatSound = false;
    }

    setMayPlayEffects(answer){
        this.mayPlayEffects = answer;
    }

    toggleBackgroundAudio(){
        if(this.mayPlayBacking)
        {
            this.mayPlayBacking = false;
        }
        else{
            this.mayPlayBacking = true;
        }

        if(this.mayPlayBacking)
        {
            this.backgroundMusic.play();

        }
        else{
            this.backgroundMusic.pause();
        }   
    }

    playSoundEffect(which, shouldRepeat){

        switch(which)
        {
            case "travel":
                this.currentSoundEffect = this.walkingSoundEffect;
            break;
            case "combat":
                this.currentSoundEffect = this.combatSoundEffect;
            break;
            case "social":
                this.currentSoundEffect = this.socialSoundEffect;
            break;
            default:
                console.error("PROBLEM WIHT THE SOUNDS");
            break;
        }

        if(this.mayPlayEffects)
        {
            if(shouldRepeat)
            {
                this.mayStillContinueToRepeatSound = true;
                this.currentSoundEffect.addEventListener('ended', this.handleRepeatAudio.bind(this), false);  
            } 
            this.currentSoundEffect.play();
        }
    }

    handleRepeatAudio(){
         if(this.mayStillContinueToRepeatSound)
         {
             this.currentSoundEffect.currentTime = 0;
             this.currentSoundEffect.play();
         }
         else{
             this.currentSoundEffect.removeEventListener("ended",this.handleRepeatAudio,false);
         }
    }

    canEndRepeatingSoundEffect(){
        if(this.mayStillContinueToRepeatSound){
            this.mayStillContinueToRepeatSound = false;
            this.currentSoundEffect.removeEventListener("ended",this.handleRepeatAudio);
            this.currentSoundEffect.pause();
            this.currentSoundEffect.currentTime = 0;
        }
    }
}