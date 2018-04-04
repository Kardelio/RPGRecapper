class MapIconImageLoader{
    constructor(){
        this.cityImage = new Image();
        this.townImage = new Image();
        this.citadelImage = new Image();
        this.ruinsImage = new Image();
        this.towerImage = new Image();
        this.unknownImage = new Image();
        this.numerOfIconsLoaded = 0;
        this.startLoadingImages();
    }

    startLoadingImages(){
        var self = this;
        this.cityImage.src = "media/city.png";
        this.cityImage.onload =function(){
            self.numerOfIconsLoaded++;
            self.checkIfAllIconsAreLoaded();
            
        };
       this.townImage.src = "media/town.png";
       this.townImage.onload =function(){
            self.numerOfIconsLoaded++;
            self.checkIfAllIconsAreLoaded();
            
        };
       this.citadelImage.src = "media/citadel.png";
       this.citadelImage.onload =function(){
            self.numerOfIconsLoaded++;
            self.checkIfAllIconsAreLoaded();
            
        };
        this.ruinsImage.src = "media/ruins.png";
        this.ruinsImage.onload =function(){
            self.numerOfIconsLoaded++;
            self.checkIfAllIconsAreLoaded();
            
        };
        this.towerImage.src = "media/tower.png";
        this.towerImage.onload =function(){
            self.numerOfIconsLoaded++;
            self.checkIfAllIconsAreLoaded();
        };
        this.unknownImage.src = "media/unknown.png";
        this.unknownImage.onload =function(){
            self.numerOfIconsLoaded++;
            self.checkIfAllIconsAreLoaded();
        };
    }

    getCityImage(){
        return this.cityImage;
    }

    getTownImage(){
        return this.townImage;
    }

    getCitadelImage(){
        return this.citadelImage;
    }

    getTowerImage(){
        return this.towerImage;
    }

    getRuinsImage(){
        return this.ruinsImage;
    }

    getUnknownImage(){
        return this.unknownImage;
    }

    checkIfAllIconsAreLoaded(){
        if(this.numerOfIconsLoaded == 6)
        {
            console.log("All Icons are loaded!");
            mapManager.loadIconsOnToMap();
        }
    }
}