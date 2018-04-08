fullCampaignData = {};
allSessionObjects = [];
allCharacterData = [];
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

function init(){
    loadCampaign();
}

function campaignLoaderHasFinishedLoadingCampaignData(){
    console.log("Loading complete...");
    console.log(fullCampaignData);
    console.log(allSessionObjects);
    console.log(allCharacterData);
}

function loadCampaign(){
    var self = this;
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