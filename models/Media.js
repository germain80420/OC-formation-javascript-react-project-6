/*eslint-disable no-unused-vars */
class Media{
    
    constructor(data){
        this._id = data.id;
        this._photographer = data.photographerId;
        this._title = data.title;
        this._image = data.image;
        this._video = data.video;
        this._likes = data.likes;
        this._date = data.date;
        this._price = data.price;
        
        
    }
    
    
    get id(){
        return this._id;
    }

    get photographer(){
        return this._photographer;
    }

    get title(){
        return this._title;
    }

    get image(){
        return this._image;
    }

    get video(){
        return this._video;
    }
    
    get likes(){
        return this._likes;
    }

    get date(){
        return this._date;
    }

    get price(){
        return this._price;
    }

    set likes(likes){
        this._likes = likes;
    }

   

    set photographer(photographer){
        this._photographer = photographer;
    }

    

    
    
}