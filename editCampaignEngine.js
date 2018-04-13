fullCampaignData = {};
allSessionObjects = [];
allCharacterData = [];

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
    
    var allSessionListHTML = "";
    for (let index = 0; index < allSessionObjects.length; index++) {
        const element = allSessionObjects[index];
        console.log(element);
        allSessionListHTML += "<div><a onclick='editASession("+index+")'>Edit</a>Session #"+(index+1)+" - <span>"+element.session_title+"</span></div>";
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
	populateDataInDOM();
}

function dealWithUploadedMapImage(){
    //
    //need to take the image and upload it to /media
    //need to determine the map scales

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
        area.innerHTML = `
                <div class="single_data_div">
                    <label class="data_single_label">Session Title</label><br/>
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
    dealWithUploadedMapImage();
}

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

function loadCampaign(){
    var self = this;
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
        campaignLoaderHasFinishedLoadingCampaignData();            
    });
}
