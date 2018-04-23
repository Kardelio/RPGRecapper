class FileParser{
    constructor(){

    }

    static parseFileIntoInputs(){
        var outHtml = "";
        for (var key in fullCampaignData) {
            if (fullCampaignData.hasOwnProperty(key)) {
               var obj = fullCampaignData[key];
               console.log(obj,key);
               if(!existsInArray(dontDisplayTitles,key)){
                    outHtml += getHtmlDependingOnType(obj,key,null);
               }
            }
         }
        //document.getElementById("session_list_area").innerHTML = outHtml;
    }
}