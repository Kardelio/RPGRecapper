class Combat{
    constructor(eventData,sesh){
        this.eventData = eventData;
        this.sessionNum = sesh;
    }

    getCombatData(){
        return this.eventData;
    }

    getSessionNumber(){
        return this.sessionNum;
    }
}