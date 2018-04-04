class CampaignInfomationViewer{
    constructor(){

    }

    static getCampaingDetailsAsHTML(){
        var data = campaignLoader.getFullCampaignData();
        console.log(data);
        var out = "";
        out += "<table style='width: 100%'>";        
        data.heroes.alive.forEach(element => {
            console.log("Hero:",element);
            out += "<tr><td>";
            out += "<img src='"+element.token_img+"' width='100' style='margin: 10px;'/>";
            out += "</td><td>";
            out += "<div class='absorbing-column'>";
            out += "<h3>"+element.name+"</h3>";
            if(element.level > 0)
            {
                out += "<p>Level: <b>"+element.level+"</b></p>";
            }
            out += "<p>"+element.race+" "+element.class+" "+element.background+"</p>";
            out += "</div>";
            out += "</td></tr>";            
        });
        out += "</table>";                    
        return "<div id='floatingWindowContents'>"+out+"</div>";
    }
}