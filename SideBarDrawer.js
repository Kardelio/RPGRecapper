class SideBarDrawer{
    constructor(){

    }

    static createHTMLForSocialLocations(socials){
        console.log("Drawing social in the sidebar location: ", socials);        
        var passingHTML = "";
        var outMore = "";
        
        for(var i = 0; i < socials.length; i++)
        {
            outMore += "<span class='battleLocationInformationsessionNumber' onclick='SideBarDrawer.toggleSection(\"s" + i + "\")'><img src='media/up.png' id='arrs"+i+"'></img>  Session: "+socials[i].sessionNum+"<span style='font-size: 50%;'> - Social</span></span>";                
            outMore += "<div style='width: 100%; height: 10px; background-color: black; margin-bottom: 5px;'></div>";
            outMore += "<div class='socialOrCombatSection' id='s"+i+"' style='display: block;'>";            
            socials[i].eventData.involved.forEach(element => {  
                outMore += "<div class='row battleLocationInformation' style='text-align: center; padding-bottom: 10px; border-bottom: 2px dotted;'>";        
                    outMore += "<div class='column'>";
                    element.messages.forEach(mess => {
                        outMore += "<div class='speech-bubble-small'>"+mess.message+"</div>";
                    });
                    outMore += "</div><div class='column'>";
                    outMore += "<img src='"+element.token+"' width='150'/>"; //180
                    outMore += "<div><span class='nameUnderImageSpan'>"+element.name+"</span></div>";
                    outMore += "</div>";
                    outMore += "</div>";
            });
            //outMore += "<div style='width: 100%; height: 10px; background-color: black;'></div>";
            outMore += "</div>";            

        }
        passingHTML += outMore;

        return passingHTML;

    }

    static toggleSection(id)
    {
        console.log("Section to hide: " +id);
        if(document.getElementById(id).style.display == "block")
        {
            document.getElementById(id).style.display = "none";
            document.getElementById("arr"+id).src = "media/down.png";

        }
        else{
            document.getElementById(id).style.display = "block";
            document.getElementById("arr"+id).src = "media/up.png";
        }
    }

    static createHTMLForMiscLocations(miscData){
        var passingHTML = "";
        var outMore = "";
        
        for(var i = 0; i < miscData.length; i++)
        {
            outMore += "<span class='battleLocationInformationsessionNumber' onclick='SideBarDrawer.toggleSection(\"m" + i + "\")'><img src='media/up.png' id='arrm"+i+"'></img>  Session: "+miscData[i].sessionNum+"<span style='font-size: 50%;'> - Misc</span></span>";                   
            outMore += "<div style='width: 100%; height: 10px; background-color: black; margin-bottom: 5px;'></div>";
            outMore += "<div class='socialOrCombatSection' id='m"+i+"' style='display: block; text-align: center;'>";
            outMore += "<div class='row battleLocationInformation' style='text-align: center; padding-bottom: 10px; border-bottom: 2px dotted;'>";        
            
                for(var j = 0; j < miscData[i].eventData.heroesPresent.length; j++)
                {
                    var hro = campaignLoader.getCharacterById(miscData[i].eventData.heroesPresent[j]);
                    outMore += "<img src='"+hro.token_img+"' width='50'/>";
                }
                outMore += "<br/>"+miscData[i].eventData.description;
            outMore += "</div>";
            outMore += "</div>";
        }
        passingHTML += outMore;

        return passingHTML;
    }

    static createHTMLForBattleLocations(battleLocations){
        console.log("Drawing battle in the sidebar location: ", battleLocations);

        var passingHTML = "";
        var outMore = "";
        
        for(var i = 0; i < battleLocations.length; i++)
        {
            outMore += "<span class='battleLocationInformationsessionNumber' onclick='SideBarDrawer.toggleSection(\"b" + i + "\")'><img src='media/up.png' id='arrb"+i+"'></img>  Session: "+battleLocations[i].sessionNum+"<span style='font-size: 50%;'> - Combat</span></span>";                   
            outMore += "<div style='width: 100%; height: 10px; background-color: black; margin-bottom: 5px;'></div>";
            outMore += "<div class='socialOrCombatSection' id='b"+i+"' style='display: block;'>";
            
            battleLocations[i].eventData.enemies.forEach(element => {  
                outMore += "<div class='row battleLocationInformation' style='text-align: center; padding-bottom: 10px; border-bottom: 2px dotted;'>";        
                    outMore += "<div class='column'>";
                        outMore += "<img src='"+element.token+"' width='180'/>";
                    outMore += "</div><div class='column'>";
                        outMore += "<div>";
                            if(element.boss)
                            {
                                outMore += "<span id='bossName'>"+element.name+"</span><br/><br/>";
                            }
                            else{
                                outMore += "<span id='enemyName'>"+element.name+"</span><br/><br/>";                        
                            }
                            outMore += "<span id='numThere'>x"+element.number+"</span><br/><br/>";
                            if(element.killers.length == element.number)
                            {
                                outMore += "<span id='numKilledAll'>Killed: "+element.killers.length+"/"+element.number+"</span>";
                            }
                            else{
                                outMore += "<span id='numKilled'>Killed: "+element.killers.length+"/"+element.number+"</span>";
                            }
                    outMore += "</div></div></div>";
                    if(element.killers.length > 0)
                    {
                        outMore += "<div class='row whoKilledMonsterRow'>";
                        element.killers.forEach(klr => {
                            //var hero = campaignLoader.getHeroDataById(klr);
                            var hero = campaignLoader.getCharacterById(klr);
                            outMore += "<img src='"+hero.token_img+"' width='50' title='"+hero.name+"'/>";
                        });
                        outMore += "</div>";
                    }
            });
            outMore += "</div>";
            

        }
        passingHTML += outMore;

        return passingHTML;
    }

    static sideBarOpenAndDisplay(title, battles, socials, miscs, locationData){
        var displayingHTML = "";
        // if(battles.length != 0 || socials.length != 0)
        // {
        //     displayingHTML += "<div style='width: 100%; height: 10px; background-color: black;'></div>";

        // }
        if(battles.length != 0)
        {
            var madeHTMLBattles = this.createHTMLForBattleLocations(battles);
            displayingHTML += madeHTMLBattles;
        }
        if(socials.length != 0)
        {
            var madeHTMLSocials = this.createHTMLForSocialLocations(socials);
            displayingHTML += madeHTMLSocials;
        }
        if(miscs.length != 0)
        {
            var madeHTMLMiscs = this.createHTMLForMiscLocations(miscs);
            displayingHTML += madeHTMLMiscs;
        }
        if(Utils.isNotNull(locationData))
        {
            displayingHTML += locationData;
        }
        //var displayingHTML = madeHTMLBattles + madeHTMLSocials + locationData;
        domManager.openSideBar(title, displayingHTML);        
    }

    static drawSocial(socialLocation){

    }
}