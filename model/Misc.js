class Misc{
    constructor(eventData,sesh){
        this.eventData = eventData;
        this.sessionNum = sesh;
    }

    getMiscData(){
        return this.eventData;
    }

    getSessionNumber(){
        return this.sessionNum;
    }
}