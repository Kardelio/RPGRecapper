class ConstantVariables{
    constructor(){  
    }

    static getSpeedOfTypeWriterEffect(){
        return 50;
    }

    static getSpeedOfTypeWriterEffectMiscBox(){
        return 25;
    }

    static getTimeToWaitAfterMessageHasBeenTypedOut(){
        return 3000;
    }

    static getTimeToWaitAfterMessageHasBeenTypedOutMisc(){
        return 5000;
    }

    static getTimeForTokenToFadeInForBattleBox(){
        return 500;
    }

    static getTimeForTokenToFadeInForsocialBox(){
        return 500;
    }

    static getTimeForTokenToFadeInFormiscBox(){
        return 500;
    }

    static getTimeToWaitAfterBattleBoxIsFinished(){
        return 3000;
    }

    static getAmountSideBarWidthShouldGrowTo(){
        return "35%";
    }

    static getTimeToWaitBeforeStartingEventsMS(){
        return 1000;
    }

    static getTimeToWaitBetweenFocusAreasMS(){
        return 1500;
    }

    static getTimeToWaitAfterEachEvent(){
        return 1500;
    }

    static getVariablesForTravelLine(){
        return {
            color: "#0000FF",
            width: 2
        };
    }

    static getVariablesForLocationCircle(){
        return {
            largeRadius: 20,
            endRadius: 8
        };
    }

    static getVariablesForBattleCircle(){
        return {
            color: "#FF0000",
            strokeColor: "black",
            strokeWidth: 2
        };
    }

    static getVariablesForSocailCircle(){
        return {
            color: "#00FF00",
            strokeColor: "black",
            strokeWidth: 2
        };
    }

    static getVariablesForMiscCircle(){
        return {
            color: "#0000FF",
            strokeColor: "black",
            strokeWidth: 2
        };
    }

    static getVariablesForBothCircle(){
        return {
            color: "#FFFF00",
            strokeColor: "black",
            strokeWidth: 2
        };
    }
}