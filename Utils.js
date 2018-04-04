class Utils{
    constructor(){

    }

    static isNotNull(content){
        if(content != null && content != "" && content != undefined)
        {
            return true;
        }
        else{
            return false;
        }
    }
}