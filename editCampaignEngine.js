fullCampaignData = {};
allSessionObjects = [];
allCharacterData = [];

descriptionData = {};

dontDisplayTitles = ["sessions","characters"];
audioFileLocation = "media/audio/";
heroTokenFileLocation = "media/heroes/";
tokenFileLocation = "media/npcs/";
mediaFileLocation = "media/";
dataFileLocation = "data/";
annoyingFakeFilePath = "C:\\fakepath\\";

currentNewSession = {};
//========================================================================
//===================     Code Body Below     ============================
//========================================================================

window.onload = function(){
    document.getElementById("defaultOpen").click();			    
    init();  
};

function openPage(pageName,elmnt,color) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablink");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].style.backgroundColor = "";
        tablinks[i].style.color = "#fff";				
    }
    document.getElementById(pageName).style.display = "block";
    elmnt.style.backgroundColor = "#bbb";
    elmnt.style.color = "#000";
}


function populateDataInDOM(){
    document.getElementById("session_list_area").innerHTML = "";

	console.log("Populating the DOM now");
    document.getElementById("campaign_title").value = fullCampaignData.campaign_title;
    document.getElementById("days_in_a_week").value = fullCampaignData.time_info.days_in_a_week;
    
    var allSessionListHTML = "";
    for (let index = 0; index < allSessionObjects.length; index++) {
        const element = allSessionObjects[index];
        console.log(element);
        allSessionListHTML += "<div class='singleEditRowForSession'><a onclick='editASession("+index+")'>Edit</a>Session #"+(index+1)+" - <span>"+element.session_title+"</span></div>";
    }
    document.getElementById("session_list_area").innerHTML = allSessionListHTML;
}

function init(){
    loadCampaign();
}

function campaignLoaderHasFinishedLoadingCampaignData(){
    console.log("Loading complete...");
    console.log(fullCampaignData);
    console.log(allSessionObjects);
    console.log(allCharacterData);
    //populateDataInDOM();
    
    document.getElementById("campaign_data_collector_area").innerHTML = parseFileIntoInputs();
    parseInputsIntoFile();
    console.log(annoyingFakeFilePath);
    //========================================================================
    //========================================================================
    //========================================================================
    //========================================================================
}

// function getv(){
//     var test2 = $('#background').val();
//     var test = document.getElementById("background");
//     console.log(test.value);
//     console.log(test2);
// }

function dealWithUploadedMapImage(){
    //
    //need to take the image and upload it to /media
    //need to determine the map scales

}

function closeEditSessionBox(){
    clearAllInputsInEditSession();
    var area = document.getElementById("session_data_collector_area");
    area.innerHTML = "";    
    area.style.padding = "0px";
    area.style.maxHeight = "0";
}

function clearAllInputsInEditSession(){
    $(':input').val('');
}

function editASession(num){
    console.log(num);
    if(num == null || num == undefined)
    {
        console.log("Make a new session");
        console.log("New session...");
        currentNewSession = {};
        var area = document.getElementById("session_data_collector_area");
        area.innerHTML = "";
        area.style.padding = "10px";
        area.innerHTML = `
                <div class="single_data_div">
                    <label class="data_single_label">Session Title:</label><br/>
                    <input type="text" id="session_title" onchange="updateCurrentSession()"/>
                </div>
                <div class="single_data_div">
                    <label class="data_single_label">Time Taken:</label><br/>
                    <input type="text" id="session_title" onchange="updateCurrentSession()"/>
                </div>
                <div style="text-align: center;">
                    <button id="save_btn_single_new_session" class="successButton" onclick="saveDetailsOfSession()" align="center">Save Session</button>
                </div>
            `
        area.style.maxHeight = "1000";
    }
    else{
        
    }

}

function updateCurrentSession(){
    currentNewSession.session_title = document.getElementById("session_title").value;
    console.log(currentNewSession);
}

function updateData(){
    fullCampaignData.campaign_title = document.getElementById("campaign_title").value; 
    fullCampaignData.time_info.days_in_a_week = parseInt(document.getElementById("days_in_a_week").value);
    dealWithUploadedMapImage();
}


function getNiceTitle(original){
    var out = original.replace(/_/g, " ");
    return out.charAt(0).toUpperCase() + out.slice(1);
}

function existsInArray(arr,item){
    console.log("----> ",item, arr);
    
    for(var i = 0; i < arr.length; i++){
        if(arr[i] == item){
            console.log("aye ",item, arr);
            return true;
        }
    }
    return false;    
}

function getHtmlDependingOnType(obj,key, parents){
    var overallCleanKey = getNiceTitle(key);
    var htmlOut = "";
    if(obj.constructor === String && (obj.indexOf("media") > -1 || obj.indexOf("data") > -1)){
        console.log("FILE!!", obj);
        var previewer = "";
        var filePre = "";
        if(obj.indexOf("png") > -1  || obj.indexOf("jpg") > -1 ){
            previewer = "<br/><img src='"+obj+"' width='200'/>";
            filePre = mediaFileLocation;
        } else if(obj.indexOf("mp3") > -1  || obj.indexOf("wav") > -1 ){
            previewer = `<br/>            
                <audio controls>
                    <source src="`+obj+`" type="audio/ogg">
                    <source src="`+obj+`" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            `;    
            filePre = audioFileLocation;        
        }
        htmlOut += `
            <div class="single_data_div">
                <label class="data_single_label">`+overallCleanKey+`</label><br/>
                <input type="file" id="`+key+`" name="file_`+key+`" onchange="updateData()" data-parent="`+parents+`" data-file-pre="`+filePre+`" style="width: 75px;"/><span class="fileName">`+obj+`</span>
                `+previewer+`
            </div>
        `;     
    }
    else if(obj.constructor === Object){
        console.log("Object!!");
        htmlOut += '<div class="single_data_div">';
        htmlOut += "<label class='data_single_label'>"+overallCleanKey+"</label><br/>";
        htmlOut += "<div class='RPG_data_collector_area' data-adult='"+key+"' data-parent='"+parents+"'>";
        
        for (var lowerkey in obj) {
            if (obj.hasOwnProperty(lowerkey)) {
            var lowerobj = obj[lowerkey];
            var nicelowerkey = getNiceTitle(lowerkey);
            console.log(lowerobj);
            htmlOut += getHtmlDependingOnType(lowerobj,lowerkey,key);
            }
        }
        htmlOut += "</div>";               
        htmlOut += "</div>";               
        
    }
    else if(obj.constructor === Array){
        console.log("ARRAY!!");
        htmlOut += '<div class="single_data_div">';
        htmlOut += "<label class='data_single_label'>"+overallCleanKey+"</label><br/>";
        htmlOut += "<div class='RPG_data_collector_area'>";
        
        for (var lowerkey in obj) {
            if (obj.hasOwnProperty(lowerkey)) {
            var lowerobj = obj[lowerkey];
            var nicelowerkey = getNiceTitle(lowerkey);
            console.log(lowerobj);
            htmlOut += getHtmlDependingOnType(lowerobj,lowerkey,key);
            }
        }
        htmlOut += "</div>";               
        htmlOut += "</div>";  
    }
    else if(obj.constructor === String){
        console.log("String!!");
        htmlOut += `
            <div class="single_data_div">
                <label class="data_single_label">`+overallCleanKey+`</label><br/>
                <input type="text" id="`+key+`" onchange="updateData()" data-parent="`+parents+`" value="`+obj+`"/><!--value=""-->
            </div>
        `;
    }
    else if(obj.constructor === Number){
        console.log("Number!!");
        htmlOut += `
            <div class="single_data_div">
                <label class="data_single_label">`+overallCleanKey+`</label><br/>
                <input type="number" id="`+key+`" onchange="updateData()" data-parent="`+parents+`" value="`+obj+`"/><!--value=""-->
            </div>
        `;
    }
    return htmlOut;
}

function parseFileIntoInputs(){
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
    return outHtml;
    //document.getElementById("session_list_area").innerHTML = outHtml;
     
}

function buildParentChain(elm,path){
    var outchain = path;
    var par = elm.getAttribute("data-parent");
    if(par != null && par != " " && par != undefined && par != "null"){
        var adultElm = $("[data-adult='"+par+"']")[0];
        outchain += "/"+par;
        return buildParentChain(adultElm, outchain);
    }else{
        //get var
        return path;
    }
}


function parseInputsIntoFile(){
    /**
     * Take all the inputs from a specifc div and turn them automatically into the file
     */
    // Text...
    var ex = {
    };
    var arrayOfExs=[];
    var allInputsText = $(":input[type='text']");
    var allInputsNumber = $(":input[type='number']");
    var allInputsFiles = $(":input[type='file']");
    for(var i = 0; i < allInputsText.length; i++){
        var elm = allInputsText[i];
        var parentChain = buildParentChain(elm,"");
        if(parentChain == ""){
            ex[elm.id] = elm.value;
        }
        else{
            parentChain = parentChain.substring(1);
            var split = parentChain.split("/");
            split.reverse();
            split.push(elm.id);
            var strObj = "{";
            var counter = 0;
            for(var index = 0; index < split.length; index++)
            {
                if(index == (split.length - 1)){
                    strObj += '"'+split[index]+'":"'+elm.value+'"';
                }
                else{
                    strObj += '"'+split[index]+'":{';
                    counter++;
                }
            }
            for(var s = 0; s < counter; s++){
                strObj += "}";
            }
            strObj += "}";   

            if(counter > 0){
                arrayOfExs.push(JSON.parse(strObj));
            }
        }
    }

    for(var i = 0; i < allInputsNumber.length; i++){
        var elm = allInputsNumber[i];
    }

    for(var i = 0; i < allInputsFiles.length; i++){
        var elm = allInputsFiles[i];
        var filenameWithoutMess = elm.value.replace(annoyingFakeFilePath,'');
        if(filenameWithoutMess != "" && filenameWithoutMess != null && filenameWithoutMess != undefined)
        {
            var prePath = elm.getAttribute("data-file-pre");
            console.log(filenameWithoutMess,prePath);
        }
        else{
            //file not specified please take defautl already.
        }
    }

    var overallEx = {};
    for(var j = 0; j < arrayOfExs.length; j++)
    {
        var a = arrayOfExs[j];
        overallEx = mergeDeep(a,overallEx);
    }
    overallEx = mergeDeep(overallEx,ex);
    console.log(overallEx);

    //Files...
}

function mergeDeep (o1, o2) {
    var tempNewObj = o1;

    if (o1.length === undefined && typeof o1 !== "number") {
        $.each(o2, function(key, value) {
            if (o1[key] === undefined) {
                tempNewObj[key] = value;
            } else {
                tempNewObj[key] = mergeDeep(o1[key], o2[key]);
            }
        });
    }
    else if (o1.length > 0 && typeof o1 !== "string") {
        $.each(o2, function(index) {
            if (JSON.stringify(o1).indexOf(JSON.stringify(o2[index])) === -1) {
                tempNewObj.push(o2[index]);
            }
        });
    }
    else {
        tempNewObj = o2;
    }
    return tempNewObj;
};

function saveDetailsOfSession(){
    //add to campaign json too...
    var num = allSessionObjects.length + 1;
    var sessionFileName = "data/session"+num+".json";
    fullCampaignData.sessions.push(sessionFileName);
    $.ajax({
        type: "POST",
        dataType : 'json',        
        async: false,
        url: 'phpscripts/saveANewSession.php',
        data: { sessionFileName: sessionFileName, sessionData: JSON.stringify(currentNewSession)},
        success: function (data) {
            if(data.success)
            {
                console.log("Session saved: ");
                closeEditSessionBox();
                saveDetails();
            }
        },
        error: function() {alert("Error! sesh");}
    });
}

function saveDetails(){
    $.ajax({
        type: "GET",
        dataType : 'json',
        async: false,
        url: 'phpscripts/saveData.php',
        data: { data: JSON.stringify(fullCampaignData) },
        success: function (data) {
            if(data.success)
            {
                init();
            }
        },
        error: function() {
        }
    });
}

function loadFieldDescriptions(){
    allSessionObjects = [];    
    $.ajaxSetup({cache:false});
    $.ajax({
        type: 'GET',
        url: "editPage/campaignDescriptions.json",
        dataType: 'JSON',
        success:function(data){
            descriptionData = data;
            campaignLoaderHasFinishedLoadingCampaignData();                
        },
        error:function(XMLHttpRequest,textStatus,errorThrown){
            console.log("error", errorThrown);
        }
    });
}

function loadCampaign(){
    allSessionObjects = [];    
    $.ajaxSetup({cache:false});
    $.ajax({
        type: 'GET',
        url: "data/campaign.json",
        dataType: 'JSON',
        success:function(data){
            fullCampaignData = data;
            loadEachSession(0);
        },
        error:function(XMLHttpRequest,textStatus,errorThrown){
            console.log("error", errorThrown);
        }
    });
};

function loadEachSession(iter){
    $.getJSON(fullCampaignData.sessions[iter], function (result) {
        allSessionObjects.push(result);
        if((iter + 1) < fullCampaignData.sessions.length)
        {
            var held = iter + 1;
            loadEachSession(held);
        }
        else{
            loadCharacterData();
        }
    });
};

function loadCharacterData(){
    allCharacterData = [];
    $.getJSON(fullCampaignData.characters, function (result) {
        for(var p = 0; p < result.playable.length; p++)
        {
            result.playable[p].type = "playable";
            allCharacterData.push(result.playable[p]);
        }

        for(var c = 0; c < result.companions.length; c++)
        {
            result.companions[c].type = "companion";
            allCharacterData.push(result.companions[c]);
        }

        for(var n = 0; n < result.npcs.length; n++)
        {
            result.npcs[n].type = "npc";
            allCharacterData.push(result.npcs[n]);
        }
        //campaignLoaderHasFinishedLoadingCampaignData();  
        loadFieldDescriptions();          
    });
}
