class DOMManager{
    constructor(){
        this.mousePositionUpdating = {
            x:0,
            y:0
        };
        this.followMouse = false;
        this.mesaureOn = false;
        this.setStartMarker = false;
        this.startMesaureMarkerLocation = {
            x: 0,
            y: 0
        };
        this.mouseCurrentX = 0;
        this.mouseCurrentY = 0;
        this.onePixelMilage = 0;

        this.simpleFunc = function(){
            var self = this;
            if(self.setStartMarker)
            {
                self.setStartMarker = false;
            }
            else{
                self.setStartMarker = true;
                //capture x and y
                self.startMesaureMarkerLocation = {
                    x: self.mouseCurrentX,
                    y: self.mouseCurrentY
                }
            }
        }
    }

    getMouseCurrentGlobalPosition(){
        return this.mousePositionUpdating;
    }

    setVisibleCampaignDetails(){
        //TODO: Removed title of campaign!
        //document.getElementById("titleOfCampaign").innerHTML = campaignLoader.getFullCampaignData().campaign_title;
        document.getElementById("totalNumberOfSessions").innerHTML = campaignLoader.getFullCampaignData().sessions.length;
    }

    setHeroPanelData(){
        var self = this;
        document.getElementById("heroPanel").innerHTML = "";

        //*** NEW */
        var hros = campaignLoader.getAllCharacterData();
        for(var i = 0; i < hros.length; i++)
        {
            if(hros[i].type == "playable" && hros[i].status == "alive")
            {
                var hro = hros[i];
                var singleHero = document.createElement("div");
                singleHero.id = "hero_"+hro.id;
                singleHero.style.position = "relative";
                singleHero.setAttribute("hero",hro.id);
                    var hroImg = document.createElement("img");
                        hroImg.width = 60;
                        hroImg.src = hro.token_img;
                        hroImg.className += "heroPanelToken";
                    var hroLvl = document.createElement("span");
                        hroLvl.className += "heroLevelSpan";
                        hroLvl.innerHTML ="Lvl: "+campaignLoader.getCharacterById(hro.id).level;
                    var hroKill = document.createElement("span");
                        hroKill.className += "numberOfKillsSpan";
                        hroKill.innerHTML += "<i class='fa fa-bolt'></i> "+campaignLoader.calculateNumberOfKillsById(hro.id);
                singleHero.appendChild(hroImg);
                if(hro.level > 0)
                {
                    singleHero.appendChild(hroLvl);
                }
                singleHero.appendChild(hroKill);

                document.getElementById("heroPanel").appendChild(singleHero);
                document.getElementById("heroPanel").innerHTML += "<br/>";  
            }
        }


        // var data = campaignLoader.getFullCampaignData();        
        // for(var i = 0; i < data.heroes.alive.length; i++)
        // {
        //     var hro = data.heroes.alive[i];
        //     var singleHero = document.createElement("div");
        //     singleHero.id = "hero"+hro.id;
        //     singleHero.style.position = "relative";
        //     singleHero.setAttribute("hero",hro.id);
        //         var hroImg = document.createElement("img");
        //             hroImg.width = 80;
        //             hroImg.src = hro.token_img;
        //             hroImg.className += "heroPanelToken";
        //         var hroLvl = document.createElement("span");
        //             hroLvl.className += "heroLevelSpan";
        //             hroLvl.innerHTML ="Lvl: "+campaignLoader.getHeroDataById(hro.id).level;
        //         var hroKill = document.createElement("span");
        //             hroKill.className += "numberOfKillsSpan";
        //             hroKill.innerHTML += "<img src='media/sword.svg' width='18'/> "+campaignLoader.calculateNumberOfKillsById(hro.id);
        //     singleHero.appendChild(hroImg);
        //     if(hro.level > 0)
        //     {
        //         singleHero.appendChild(hroLvl);
        //     }
        //     singleHero.appendChild(hroKill);

        //     document.getElementById("heroPanel").appendChild(singleHero);
        //     document.getElementById("heroPanel").innerHTML += "<br/>";
        // }
        //TODO: DELETE THIS SHIT

        for(var i = 0; i < hros.length; i++)
        {
            if(hros[i].type == "playable" && hros[i].status == "alive")
            {
                $("#hero_"+hros[i].id)[0].onclick = function(){
                    self.triggerSmallCharacterDataPopup(campaignLoader.getCharacterById(this.getAttribute("hero")));
                }
            }
        }
    }

    continueToDisplaySmallCharacterDataPopup(data, information){
        var htmlOut = "";
            htmlOut += "<div style='text-align: center;'>";
            if(data.full_img){
                htmlOut += "<img src='"+data.full_img+"' width='200' style='border: 2px solid black;'/>";
            }
            else{
                htmlOut += "<img src='"+data.token_img+"' width='200'/>";                
            }

            htmlOut += "<p style='font-size: 150%; font-weight: bold; background-color: rgba(0,0,0,0.6); color: white;'>"+data.name+"</p>";
            htmlOut += "<p>";
            if(data.level > 0)
            {
                htmlOut += "Level: <span class='levelNum'>"+data.level+"</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
            }
            htmlOut += data.race+" "+data.class+"</p>";
            htmlOut += "<p>Number of kills: <span class='killNum'>"+campaignLoader.calculateNumberOfKillsById(data.id)+"</span></p>";



            //TODO: add the icons for each of the creates they kill with a x2 or x4 next to... 
            if(information != null)
            {
                htmlOut += information;
            }

            if(data.companions.length > 0)
            {
                htmlOut += "<div class='innerCompanionBlock'>Companions:";
                htmlOut += "<table border='0' style='color: white;'>";
                for (var index = 0; index < data.companions.length; index++) {
                    htmlOut += "<tr>";
                    var comp = campaignLoader.getCharacterById(data.companions[index]);
                    htmlOut += "<td><img src='"+comp.token_img+"' width='60px'/></td>";
                    htmlOut += "<td><span class='companionNameTagSpan'>"+comp.name+"</span><br/>Number of Kills: <span class='numberOfKillsSpanWithoutPosition'>"+campaignLoader.calculateNumberOfKillsById(comp.id)+"</span></td>";
                    htmlOut += "</tr>";                    
                }
                htmlOut += "</table>";
                
               htmlOut += "</div>";                
            }
            
            htmlOut += "</div>";
        floatingWindowManager.showWindow(data.name,htmlOut);
    }

    triggerSmallCharacterDataPopup(data){
        var self = this;
        if(document.getElementById("floatingWindow"))
        {
            floatingWindowManager.closeWindow();
        }
        else{
            if(Utils.isNotNull(data.information))
            {
                $.ajaxSetup({cache:true});                
                $.ajax({
                    type: 'GET',
                    url: data.information,
                    success:function(extraInfo){
                        self.continueToDisplaySmallCharacterDataPopup(data,extraInfo);
                    },
                    error:function(XMLHttpRequest,textStatus,errorThrown){
                        console.log("error", errorThrown);
                        self.continueToDisplaySmallCharacterDataPopup(data, null);                        
                    }
                });
            }
        }
    }

    killSmallCharacterDataPopup(){
    }

    getMeasureSetToOn(){
        return this.mesaureOn;
    }

    toggleMouseCoordsFollow(){
        if(this.followMouse)
        {
            this.followMouse = false;
            document.getElementById("mousePosition").style.display = "none";
        }
        else{
            this.followMouse = true;
            document.getElementById("mousePosition").style.display = "block";            
        }
    }

    toggleMeasureOn(){
        var self = this;
        if(this.mesaureOn)
        {
            this.mesaureOn = false;
            this.setStartMarker = false;
            document.getElementById("startMeasureBlock").style.display = "none";
            document.getElementById("milageInformation").style.display = "none";
            document.getElementById("startMeasureBlock").removeEventListener('click',test);
            drawer.getCanvas().removeEventListener('click',test);
            drawer.redrawAll();
        }
        else{
            this.calculateOnePixelMilage();
            var test = function(){
                self.toggleMeasureSetter();                
            }
            this.mesaureOn = true;
            this.setStartMarker = false;
            
            document.getElementById("startMeasureBlock").style.display = "block";         
            document.getElementById("milageInformation").style.display = "block";         
            document.getElementById("startMeasureBlock").onclick = test;
            drawer.getCanvas().onclick = test;
        }
    }

    toggleMeasureSetter(){
        var self = this;
        if(self.setStartMarker)
        {
            self.setStartMarker = false;
        }
        else{
            self.setStartMarker = true;
            self.startMesaureMarkerLocation = {
                x: self.mouseCurrentX,
                y: self.mouseCurrentY
            }
        }
    }

    setOnClicks(){
        var self = this;

        document.getElementById("mousePosition").style.display = "none";
        document.getElementById("startMeasureBlock").style.display = "none";
        document.getElementById("milageInformation").style.display = "none";
        
        document.getElementById("helpButton").onclick = function() { 
            self.openHelp();
        };

        if(document.getElementById("mouseToggleButton") != null)
        {
            document.getElementById("mouseToggleButton").onclick = function() { 
                self.toggleMouseCoordsFollow();
            };
        }

        if(document.getElementById("measureToggleButton") != null)
        {
            document.getElementById("measureToggleButton").onclick = function() { 
                self.toggleMeasureOn();
            };
        }
        

        document.getElementById("muteButton").onclick = function() { 
            soundManager.toggleBackgroundAudio();
        };

        document.getElementById("displayAllButton").onclick = function() { 
            storyManager.justShowAllInstantly();
        };

        document.getElementById("recapAllButton").onclick = function() { 
            self.hideControlPanel();
            floatingWindowManager.closeWindow();
            storyManager.beginTheStory();
        };

        document.getElementById("specificButton").onclick = function() {
            var display = storyManager.loadSpecificButtons();
            floatingWindowManager.showWindow("Specific Sessions...",display);
        };

        document.getElementById("calendarButton").onclick = function() {
            var display = new CalendarDisplayer().getCalendarToDisplay();
            floatingWindowManager.showWindow("Calendar",display,500);
        };

        document.getElementById("controlPanelCollapser").onclick = function(){
            var cp = $("#controlPanel")[0];
            
            if(this.getAttribute("data-collapsed") == "true"){
                cp.style.width = "auto";                
                cp.style.padding = 10;                
                this.setAttribute("data-collapsed",false);
                this.innerHTML = "<i class='fa fa-chevron-left'></i>";
            }
            else{
                cp.style.width = 0;                
                cp.style.padding = 0;                
                this.setAttribute("data-collapsed",true);
                this.innerHTML = "<i class='fa fa-chevron-right'></i>";                
            }
        };
        


        $(document).mousemove(function(event){
            this.mousePositionUpdating = {
                x: event.pageX,
                y: event.pageY
            };
            if(self.followMouse)
            {
                $("#mousePosition")[0].style.marginLeft = event.pageX + 20;
                $("#mousePosition")[0].style.marginTop = event.pageY;
                $("#mouseX")[0].innerHTML = "<b>"+event.pageX+"</b>";
                $("#mouseY")[0].innerHTML = "<b>"+event.pageY+"</b>";
            }

            if(self.mesaureOn)
            {
                self.mouseCurrentX = event.pageX;
                self.mouseCurrentY = event.pageY;


            if(self.setStartMarker)
                {
                    //marker set calc measure
                    $("#milageInformation")[0].style.marginLeft = event.pageX + 20;
                    $("#milageInformation")[0].style.marginTop = event.pageY;
                    self.calculateMeasurements(self.startMesaureMarkerLocation.x,self.startMesaureMarkerLocation.y,event.pageX, event.pageY);
                    drawer.drawLineToMouseCoords(self.startMesaureMarkerLocation.x,self.startMesaureMarkerLocation.y,event.pageX, event.pageY);
                }
                else{
                    $("#startMeasureBlock")[0].style.marginLeft = event.pageX - 2;
                    $("#startMeasureBlock")[0].style.marginTop = event.pageY - 2;

                }
            }
        });
    }

    calculateOnePixelMilage(){
        var measureData = campaignLoader.getFullCampaignData().measure;
        this.onePixelMilage = measureData.pixels / measureData.miles;
        this.onePixelMilage = this.onePixelMilage * measureData.display_scale;
        console.log(this.onePixelMilage);      
    }

    calculateMeasurements(sx,sy,mx,my)
    {
        var measureData = campaignLoader.getFullCampaignData().measure;
        /*
        display_scale
            :
            0.5
            miles
            :
            20
            pixels
            :
            121
        */
        //console.log(measureData);
        //a2 + b2 = c2
        var pixXDiff = mx - sx;
        var pixYDiff = my - sy;
        var hypt = Math.hypot(pixXDiff, pixYDiff);
        var milage = hypt / this.onePixelMilage;
        var hoursF = milage / 4;
        hoursF = hoursF.toFixed(1);
        var hoursM = milage / 3;
        hoursM = hoursM.toFixed(1);
        var hoursS = milage / 2;
        hoursS = hoursS.toFixed(1);
        
        //console.log(pixXDiff, pixYDiff, hypt,milage);
        var displayMiles = milage.toFixed(1);
        //console.log(displayMiles);
        document.getElementById("milageInformation").innerHTML = "<b>Miles:</b> " + displayMiles + "<br/><b>Fast:</b> " + hoursF+ " hrs<br/><b>Norm:</b> " + hoursM+ " hrs<br/><b>Slow:</b> " + hoursS+" hrs";
    }

    openHelp(){
        var self = this;
        if(document.getElementById("floatingWindow"))
        {
            floatingWindowManager.closeWindow();
        }
        else
        {
            $.ajaxSetup({cache:true});                
            $.ajax({
                type: 'GET',
                url: "help.html",
                success:function(htmlO){
                    floatingWindowManager.showWindow("Help",htmlO);
                },
                error:function(XMLHttpRequest,textStatus,errorThrown){
                    console.log("error", errorThrown);
                }
            });
        }
    }

    openSideBar(title, body){
        $("#locationInfoHolder")[0].style.display = "block";        
        $("#location_name")[0].innerHTML = title;     
        document.getElementById("location_html_data").innerHTML = "";   
        document.getElementById("location_html_data").innerHTML += body;
        $("#sideBar")[0].style.width = ConstantVariables.getAmountSideBarWidthShouldGrowTo(); 
    }

    closeSideBar(){
        $("#sideBar")[0].style.width = 0; 
        document.getElementById("location_html_data").innerHTML="";
    }

    hideControlPanel(){
        console.log("tssdfds");
        document.getElementById("controlPanel").style.display = "none";
    }

    showControlPanel(){
        document.getElementById("controlPanel").style.display = "block";
    }
}