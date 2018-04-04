class CalendarDisplayer{
    constructor(){
        this.currentCampaignDataTimeInfo = null;
        this.sessionTimeDataConCat = [];
        this.daysInWeek = 5;
        this.colorBase = 100;
        this.colorTop = 150;
        this.evenColor = [132,0,0];
        this.oddColor = [199,58,58];
    }

    getCalendarToDisplay(){
        this.gatherData();
        return this.getCalendarHTMLOut();
    }

    gatherData(){
        this.currentCampaignDataTimeInfo = campaignLoader.getFullCampaignData().time_info;
        var allSessions = campaignLoader.getAllSessionObjects();
        for(var i = 0; i < allSessions.length; i++)
        {
            this.sessionTimeDataConCat.push(allSessions[i].time_taken);
        }
        this.daysInWeek = this.currentCampaignDataTimeInfo.days_in_a_week;
    }

    getBiggestDayNumber(dayData)
    {
        var highest = 0;
        for(var i = 0; i < dayData.length; i++)
        {
            if(dayData[i].end_day > highest)
            {
                highest = dayData[i].end_day;
            }
        }
        return highest;
    }

    convertSessionDataToDays(ses){
        var days = [];
        var largestDay = this.getBiggestDayNumber(ses);

        for(var s = 0; s < ses.length; s++)
        {
            if(ses[s].start_day == ses[s].end_day){
                if(days[ses[s].start_day] != undefined && days[ses[s].start_day] != null)
                {
                    days[ses[s].start_day].sessions.push({
                        "start_hour": ses[s].start_hour,
                        "end_hour": ses[s].end_hour
                    })
                   
                }
                else{
                    days[ses[s].start_day] = {
                        "sessions":[
                            {
                                "start_hour": ses[s].start_hour,
                                "end_hour": ses[s].end_hour
                            }
                        ] 
                    };
                }
            }
            else{
                if(days[ses[s].start_day] != undefined && days[ses[s].start_day] != null)
                {
                    days[ses[s].start_day].sessions.push({
                        "start_hour": ses[s].start_hour,
                        "end_hour": 24,
                        "continues": true
                    })
                   
                }
                else{
                    days[ses[s].start_day] = {
                        "sessions":[
                            {
                                "start_hour": ses[s].start_hour,
                                "end_hour": 24,
                                "continues": true
                            }
                        ] 
                    };
                }

                var diffInDays = ses[s].end_day - ses[s].start_day; // 1 - 3

                if(diffInDays == 1)
                {
                    days[ses[s].start_day+1] = {
                        "sessions":[
                            {
                                "start_hour": 0,
                                "end_hour": ses[s].end_hour
                            }
                        ] 
                    }
                }
                else{
                    for(var y = 0; y < diffInDays; y++)
                    {
                        if(y == (diffInDays-1))
                        {
                            days[ses[s].start_day+(diffInDays+1)] = {
                                "sessions":[
                                    {
                                        "start_hour": 0,
                                        "end_hour": ses[s].end_hour
                                    }
                                ] 
                            }
                        }
                        else{
                            days[ses[s].start_day+(diffInDays+1)] = {
                                "sessions":[
                                    {
                                        "start_hour": 0,
                                        "end_hour": 24,
                                        "continues": true
                                    }
                                ] 
                            }
                        }
                    }
                }
            }
        }
        return days;
    }

    getCalendarHTMLOut(){

        var data = this.sessionTimeDataConCat;
        var convertedDays = this.convertSessionDataToDays(data);
        var largestDay = this.getBiggestDayNumber(data);
        var out = "<div id='sessionInfoBlock'>Session....</div>";
        out += "<div>";
        var weeksToDis = Math.round(largestDay / this.daysInWeek);
        if(weeksToDis < largestDay / this.daysInWeek)
        {
            weeksToDis++;
        }
        var previousColor = this.oddColor;
        var sessionCounter = 0;
        var cont = false;
        var days = convertedDays;
        for(var i = 0; i < weeksToDis; i++)
        {
            out += "<div class='rowCal'>";
            for(var j = 1; j <= this.daysInWeek; j++)
            {
                out += "<div class='colCal'>";
                var dayNum = j+(i*5);
                out += "<div class='calendarDayNum'>"+dayNum+"</div>";                
                var specificDayData = days[dayNum];
                if(specificDayData!=null)
                {
                    for(var s = 0; s < specificDayData.sessions.length; s++)
                    {
                        var colour;
                        if(cont)
                        {
                            colour = previousColor;
                        }
                        else{
                            sessionCounter++;                        
                            colour = this.getColorForSessionBlock(sessionCounter);
                            previousColor = colour;
                        }   
                        out += "<div class='singleCal' onmouseout='CalendarDisplayer.hideSessionBlock()' onmouseover='CalendarDisplayer.mouseOverElm("+sessionCounter+",event)' style='float: left; width: "+this.calculateSessionWidth(specificDayData.sessions[s])+"%; background-color: rgb("+colour[0]+","+colour[1]+","+colour[2]+");'></div>";    
                        if(specificDayData.sessions[s].continues)
                        {
                            cont = true;
                        }
                        else{   
                            cont = false;
                        }
                    }
                }
                out += "</div>";
            }
            out += "</div>";
        }
    
        out += "</div>";
        return out;
    }

    calculateSessionWidth(session){
        var diff = session.end_hour - session.start_hour;
        return (diff/24)*100
    }

    getColorForSessionBlock(num){
        if(num % 2 == 0)
        {
            return this.evenColor;
        }
        else{
            return this.oddColor;
        }
    }
    

     static hideSessionBlock(){
        $("#calSessionNumberBlock").hide();
        $("#sessionInfoBlock")[0].innerText = ".";
        
    }
    
     static mouseOverElm(num,e){
        var sessionTitle = campaignLoader.getAllSessionObjects()[num-1].focus_areas[0].title;
        $("#sessionInfoBlock")[0].innerText = "Session: "+num+" - "+sessionTitle;
    }
 
}