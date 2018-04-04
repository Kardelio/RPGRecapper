class TravelLine{
    constructor(x,y,tx,ty,w,c)
    {
        console.log("New TravelLine created");
        this.fromx = x;
        this.fromy = y;
        this.tox = tx;
        this.toy = ty;
        this.width = w;
        this.color = c;
    }

    draw(conx){
        conx.beginPath();
        conx.lineWidth = this.width;    
        conx.strokeStyle = this.color;        
        conx.moveTo(this.fromx,this.fromy);
        conx.lineTo(this.tox,this.toy);
        conx.closePath();
        conx.stroke();
    }
}