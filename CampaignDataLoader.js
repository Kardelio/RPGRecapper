class CampaignDataLoader{
    constructor(){
        this.fullCampaignData = {};
        this.allSessionObjects = [];
        this.allCharacterData = [];
    }

    calculateNumberOfKillsById(id)
    {
        var total = 0;
        for(var i = 0; i < this.allSessionObjects.length; i++)
        {
            for(var j = 0; j < this.allSessionObjects[i].focus_areas.length; j++)
            {
                for(var e = 0; e < this.allSessionObjects[i].focus_areas[j].events.length; e++)
                {
                    if(this.allSessionObjects[i].focus_areas[j].events[e].type == "combat")
                    {
                        for(var en = 0; en < this.allSessionObjects[i].focus_areas[j].events[e].enemies.length; en++)
                        {
                            for(var k = 0; k < this.allSessionObjects[i].focus_areas[j].events[e].enemies[en].killers.length; k++)
                            {
                                if(this.allSessionObjects[i].focus_areas[j].events[e].enemies[en].killers[k] == id)
                                {
                                    total++;
                                }
                            }
                        }
                    }
                }
            }
        }
        return total;
    }

    getFullCampaignData(){
        return this.fullCampaignData;
    }

    getAllSessionObjects(){
        return this.allSessionObjects;
    }

    getAllCharacterData(){
        return this.allCharacterData;
    }

    getCharacterById(id)
    {
        for(var i = 0; i < this.allCharacterData.length; i++)
        {
            if(this.allCharacterData[i].id == id)
            {
                return this.allCharacterData[i];
            }
        }
        return {
            name: "unknown",
            token_img: "media/Random.png"
        };
    }

    //DEPRECATED -----
    getHeroDataById(id){
        var hros = this.fullCampaignData.heroes.alive;
        for(var i = 0; i < hros.length; i++)
        {
            if(hros[i].id == id)
            {

                return hros[i];
            }
        }
        return {
            name: "unknown",
            token_img: "media/Random.png"
        };
    }

    loadCharacterData(){
        var self = this;
        $.getJSON(self.fullCampaignData.characters, function (result) {
            for(var p = 0; p < result.playable.length; p++)
            {
                result.playable[p].type = "playable";
                self.allCharacterData.push(result.playable[p]);
            }

            for(var c = 0; c < result.companions.length; c++)
            {
                result.companions[c].type = "companion";
                self.allCharacterData.push(result.companions[c]);
            }

            for(var n = 0; n < result.npcs.length; n++)
            {
                result.npcs[n].type = "npc";
                self.allCharacterData.push(result.npcs[n]);
            }
            console.log(self.allCharacterData);
            campaignLoaderHasFinishedLoadingCampaignData();            
        });
    }

    loadEachSession(iter){
        var self = this;
        $.getJSON(self.fullCampaignData.sessions[iter], function (result) {
            self.allSessionObjects.push(result);
            if((iter + 1) < self.fullCampaignData.sessions.length)
            {
                var held = iter + 1;
                self.loadEachSession(held);
            }
            else{
                self.loadCharacterData();
            }
        });
    };

    loadCampaign(){
        var self = this;
        $.ajaxSetup({cache:false});
        $.ajax({
            type: 'GET',
            url: "data/campaign.json",
            dataType: 'JSON',
            success:function(data){
                self.fullCampaignData = data;
                drawer.setCanvasSource(self.fullCampaignData.world_map);
                self.loadEachSession(0);
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){
                console.log("error", errorThrown);
            }
        });
    };
}
