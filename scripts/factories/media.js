function mediaFactory(media){
   // const media = media //new Media(data);
console.log(media.photographer.name);
    let picture = `assets/media/${media.photographer.name.split(" ")[0]}/${media.image}`;
    function getMediaCardDom(){
        const articleMedia = document.createElement("article");
        articleMedia.setAttribute("class","article-media")

        let img;
       if(media.image!=undefined){
            img = document.createElement("img");
            img.setAttribute("src", picture)
            articleMedia.appendChild(img);
         }
         else{
            let video = document.createElement("video");

            video.setAttribute("src",  `assets/media/${media.photographer.name.split(" ")[0]}/${media.video}`)
            video.setAttribute("controls","true");
            articleMedia.appendChild(video);

         }
        const divInfosMedia = document.createElement("div");
        divInfosMedia.setAttribute("class","divInfosMedia");
        const titreMedia = document.createElement("h2");
        titreMedia.innerText = media.title;
        const spanLikes = document.createElement("span");
        spanLikes.innerHTML = media.likes+"  <i class='fa-solid fa-heart'></i>";
        divInfosMedia.appendChild(titreMedia);
        divInfosMedia.appendChild(spanLikes);
        articleMedia.appendChild(divInfosMedia);

        return articleMedia;

    }
    return {getMediaCardDom}

}

function getMediasByPhotographer(idPhotographer){

}