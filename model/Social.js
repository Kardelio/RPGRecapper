class Social{
    constructor(eventData,sesh){
        this.eventData = eventData;
        this.sessionNum = sesh;
    }

    getSocialData(){
        return this.eventData;
    }

    getSessionNumber(){
        return this.sessionNum;
    }
}