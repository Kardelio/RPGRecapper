/**
 * Object Declaration...
 */
var mapIconLoader = new MapIconImageLoader();
//Needs to go first to get all the icon images in..

var domManager = new DOMManager();
var campaignLoader = new CampaignDataLoader();
var mapManager = new MapManager();
var drawer = new Drawer();
var storyManager = new StoryManager();
var animator = new Animator();
var soundManager = new SoundManager();
var floatingWindowManager = new FloatingWindowManager();
//NEW:
var eventManager = new EventManager();


/**
 * Global Variables Declaration...
*/
var clientWidth, clientHeight;

//========================================================================
//===================     Code Body Below     ============================
//========================================================================

window.onload = function(){
    init();  
};

function init(){
    console.log("Starting the Campaing Recapper!");
    campaignLoader.loadCampaign(); 
}

function campaignLoaderHasFinishedLoadingCampaignData(){
    console.log("Finished loading the campaign data, stored in: ", campaignLoader.getFullCampaignData());
    console.log("The Session data is extracted to: ", campaignLoader.getAllSessionObjects());
    domManager.setVisibleCampaignDetails();
    domManager.setHeroPanelData();
    $("#currentInfoBlock").hide();

    clientHeight = window.innerHeight;
    clientWidth = window.innerWidth;

    //TODO: individual Buttons for sessions...
    //    for(var i = 0; i < campaignLoader.getAllSessionObjects().length; i++){
    //         document.getElementById("controlPanel").innerHTML += '<button class="individualSessionButton" onclick="beginRecappingTheEntireCampaign()">Session '+(i+1)+'</button><br/>';
    //    }

    drawer.setAllDrawingData(document.getElementById("mapCanvas"),campaignLoader.getFullCampaignData().map_size_width,campaignLoader.getFullCampaignData().map_size_height,clientWidth/2,clientHeight/2);
    mapManager.setUpOnClickAtPageStart();
    domManager.setOnClicks();
    document.body.removeChild(document.getElementById("spinnerDiv"));
}

function closeSideBar(){
    $("#sideBar")[0].style.width = 0;    
}