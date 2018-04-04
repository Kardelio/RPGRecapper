class SoundManager{
    constructor(){
        this.backgroundMusic = new Audio("media/audio/back.mp3");

        this.walkingSoundEffect = new Audio('media/audio/walking.wav');
        this.combatSoundEffect = new Audio('media/audio/fightO.wav');
        this.socialSoundEffect = new Audio('media/audio/talking.wav');

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