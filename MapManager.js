class MapManager{
    constructor(){
        this.allMapLocationObjects = [];
        //this.mapLocatorIterator = 0;
        this.travelRouteObjectList = [];
        this.battleLocationObjectList = [];
        this.socialLocationObjectList = []; //new social list
    }

    saveTravelLine(eventData){
        this.travelRouteObjectList.push(new TravelLine(eventData.from.x, 
            eventData.from.y,
            eventData.to.x, 
            eventData.to.y,
            ConstantVariables.getVariablesForTravelLine().width,
            ConstantVariables.getVariablesForTravelLine().color));
    }

    checkIfRandomLocationHasACircleAlready(x,y){
        for(var i = 0; i < this.allMapLocationObjects.length; i++){
            if(this.allMapLocationObjects[i].x == x)
            {
                if(this.allMapLocationObjects[i].y == y)
                {
                    console.log("THERE IS A CIRCLE MATCH!");
                    console.log("NEED TO MERGE LOCATIONS!");
                    return this.allMapLocationObjects[i];
                }
            }
        }
        return false;
    }

    saveBattleCircle(eventData, sessionNo){
        var hasCircleAlready = this.checkIfRandomLocationHasACircleAlready(eventData.at.x,eventData.at.y);
        console.log(hasCircleAlready);      
        var combat = new Combat(eventData,sessionNo);

        if(!hasCircleAlready){
            var location = new MapLocation(null, null, eventData.at.x,eventData.at.y,null,null,null);
            location.addBattleToLocation(combat);
            this.allMapLocationObjects.push(location);
        }
        else
        {
            hasCircleAlready.addBattleToLocation(combat);
        }        

    }

    saveSocialCircle(eventData, sessionNo){
        var hasCircleAlready = this.checkIfRandomLocationHasACircleAlready(eventData.at.x,eventData.at.y);
        console.log(hasCircleAlready); 
        var social = new Social(eventData,sessionNo);

        if(!hasCircleAlready){
            var location = new MapLocation(null, null, eventData.at.x,eventData.at.y,null,null,null);
            location.addSocialToLocation(social);
            this.allMapLocationObjects.push(location);
        }
        else{
            //add to hasC
            hasCircleAlready.addSocialToLocation(social);            
        }
    }

    saveMiscCircle(eventData, sessionNo){
        var hasCircleAlready = this.checkIfRandomLocationHasACircleAlready(eventData.at.x,eventData.at.y);
        console.log(hasCircleAlready); 
        var misc = new Misc(eventData,sessionNo);

        if(!hasCircleAlready){
            var location = new MapLocation(null, null, eventData.at.x,eventData.at.y,null,null,null);
            location.addMiscToLocation(misc);
            this.allMapLocationObjects.push(location);
        }
        else{
            //add to hasC
            hasCircleAlready.addMiscToLocation(misc);            
        }
    }

    getAllTravelLines(){
        return this.travelRouteObjectList;
    }

    getAllBattleLocations(){
        return this.battleLocationObjectList;
    }

    getAllMapLocations(){
        return this.allMapLocationObjects;
    }

    getLocationWithSpecificId(id)
    {
        for(var i = 0; i < this.allMapLocationObjects.length; i++)
        {
            if(this.allMapLocationObjects[i].id == id)
            {
                return this.allMapLocationObjects[i];
            }
        }
        return null;
    }

    clearAllLists(){
        this.travelRouteObjectList = [];
        //this.battleLocationObjectList = [];

        for(var i = 0; i < this.allMapLocationObjects.length; i++)
        {
            if(this.allMapLocationObjects[i].hasBattlesIn())
            {
                this.allMapLocationObjects[i].combats = [];
            }

            if(this.allMapLocationObjects[i].hasSocialsIn())
            {
                this.allMapLocationObjects[i].socials = [];
            }

            if(this.allMapLocationObjects[i].hasMiscsIn())
            {
                this.allMapLocationObjects[i].miscs = [];
            }
            

            if(this.allMapLocationObjects[i].getId() == null){
                //delete this one!
                this.allMapLocationObjects.splice(i,1);
            }


            // if(this.allMapLocationObjects[i].getId() == null)
            // {
            //     //self made loacqiton

            // }
            // if(this.allMapLocationObjects[i].hasBattleIn)
            // {
            //     this.allMapLocationObjects[i].hasBattleIn = false;
            //     this.allMapLocationObjects[i].battles = [];
            // }
        }
    }


    setUpOnClickAtPageStart(){
        var self = this;
        drawer.getCanvas().addEventListener('mousedown', function(e) {
            var clickX = e.pageX - this.offsetLeft;
            var clickY = e.pageY - this.offsetTop;
            var itemClicked = false;

            if(domManager.getMeasureSetToOn())
            {
                //console.log("Set the start location");
                //leave block there! draw line to wher emouse is now! and draw measurement data
            }
            else{
                for (var i = 0; i < self.allMapLocationObjects.length; i++) {
                    var l = self.allMapLocationObjects[i];
                    if(l.getId() != null)
                    {
                        if (clickX < (l.x + l.sizeWidth) && clickX > l.x && clickY > l.y && clickY < (l.y + l.sizeHeight)) {
                            itemClicked = true;
                            l.click(clickX,clickY);
                        }
                    }
                    else{
                        var dx = l.x - clickX;
                        var dy = l.y - clickY;
                        if(dx * dx + dy * dy <= ConstantVariables.getVariablesForLocationCircle().endRadius * ConstantVariables.getVariablesForLocationCircle().endRadius)
                        {
                            itemClicked = true;                    
                            l.click(clickX,clickY);              
                        }
                    }
                }
    
                if(!itemClicked)
                {
                    console.log("Clicked outside of the important items");
                    domManager.closeSideBar();
                }
            }
            
            // for (var i = 0; i < self.allMapLocationObjects.length; i++) {
            //     var l = self.allMapLocationObjects[i];
            //     if(l.getId() != null)
            //     {
            //         if (clickX < (l.x + l.sizeWidth) && clickX > l.x && clickY > l.y && clickY < (l.y + l.sizeHeight)) {
            //             itemClicked = true;
            //             l.click(clickX,clickY);
            //         }
            //     }
            //     else{
            //         var dx = l.x - clickX;
            //         var dy = l.y - clickY;
            //         if(dx * dx + dy * dy <= ConstantVariables.getVariablesForLocationCircle().endRadius * ConstantVariables.getVariablesForLocationCircle().endRadius)
            //         {
            //             itemClicked = true;                    
            //             l.click(clickX,clickY);              
            //         }
            //     }
            // }

            // if(!itemClicked)
            // {
            //     console.log("Clicked outside of the important items");
            //     domManager.closeSideBar();
            // }
        });
    }

    loadAdditionallyDiscoverdLocationsOnToMap(){
        var self = this;

        $.ajax({
            type: 'GET',
            url: 'data/discovered.json',
            dataType: 'JSON',
            success:function(data){
                console.log("Additionally discovered...", data);
                for(var i = 0; i < data.locations.length; i++)
                {
                    var element = data.locations[i];
                    if(element.discovered){
                        switch(element.type){
                            case "unknown":
                            self.allMapLocationObjects.push(new MapLocation(element.id, element.name,element.x,element.y,element.type,mapIconLoader.getUnknownImage(), element.data));
                            break;
                        }
                    }
                }
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){
                console.log("error", errorThrown);
            }
        });
    }

    loadIconsOnToMap(){
        var self = this;
        //this.mapLocatorIterator = 0;

        $.ajax({
            type: 'GET',
            url: 'data/map.json',
            dataType: 'JSON',
            success:function(data){
                for(var i = 0; i < data.locations.length; i++)
                {
                    var element = data.locations[i];
                    switch(element.type){
                        case "town":
                        self.allMapLocationObjects.push(new MapLocation(element.id, element.name,element.x,element.y,element.type,mapIconLoader.getTownImage(), element.data));
                        break;
                        case "city":
                        self.allMapLocationObjects.push(new MapLocation(element.id, element.name,element.x,element.y,element.type,mapIconLoader.getCityImage(), element.data));
                        break;
                        case "citadel":
                        self.allMapLocationObjects.push(new MapLocation(element.id, element.name,element.x,element.y,element.type,mapIconLoader.getCitadelImage(), element.data));
                        break;
                        case "ruins":
                        self.allMapLocationObjects.push(new MapLocation(element.id, element.name,element.x,element.y,element.type,mapIconLoader.getRuinsImage(), element.data));
                        break;
                        case "tower":
                        self.allMapLocationObjects.push(new MapLocation(element.id, element.name,element.x,element.y,element.type,mapIconLoader.getTowerImage(), element.data));
                        break;
                    }
                }
                self.loadAdditionallyDiscoverdLocationsOnToMap();
            },
            error:function(XMLHttpRequest,textStatus,errorThrown){
                console.log("error", errorThrown);
            }
        });
    }
}