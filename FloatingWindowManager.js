class FloatingWindowManager{
    constructor(){
    }

    showWindow(title, htmlToInsert, widthSet){
        var self = this;
        if(document.getElementById("floatingWindow"))
        {
            this.closeWindow();
        }
        else{
            var elem = document.createElement("div");
            elem.id = "floatingWindow";
            elem.className += "floatingWindow";
            if(widthSet != undefined && widthSet != null)
            {
                elem.style.width = widthSet+"px";
            }
            var dragHead = document.createElement("div");
            dragHead.id = "floatingWindowHeader";
            dragHead.innerHTML = title;
            var closeButton = document.createElement("Button");
            closeButton.innerHTML = "X";
            closeButton.onclick = function(){
                self.closeWindow();
            };
            closeButton.id = "floatingWindowCloseButton";
            var section = document.createElement("div");
            section.innerHTML = htmlToInsert;
            dragHead.appendChild(closeButton);
            elem.appendChild(dragHead);
            elem.appendChild(section);            
            document.body.appendChild(elem);
            this.dragElement(elem);
        }
    }

    closeWindow(){
        if(document.getElementById("floatingWindow"))
        {
            document.body.removeChild(document.getElementById("floatingWindow"));
        }
    }

    dragElement(elmnt){
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        document.getElementById("floatingWindowHeader").onmousedown = dragMouseDown;
      
        function dragMouseDown(e) {
          e = e || window.event;
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          document.onmousemove = elementDrag;
        }
      
        function elementDrag(e) {
          e = e || window.event;
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }
      
        function closeDragElement() {
          document.onmouseup = null;
          document.onmousemove = null;
        }
    }
}