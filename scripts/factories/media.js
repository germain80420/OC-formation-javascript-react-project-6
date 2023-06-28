function mediaFactory(media, medias, compteur) {
   // const media = media //new Media(data);
   console.log(media.photographer.name);
   let picture = `assets/media/${media.photographer.name.split(" ")[0]}/${media.image}`;
   function getMediaCardDom() {
      const articleMedia = document.createElement("article");

      const lightboxModal = document.getElementById("lightbox-modal");
      const header = document.getElementById("header");
      const main = document.getElementById("main");

      const body = document.getElementById("body");
      articleMedia.setAttribute("class", "article-media");
      let isLiked = false;
      let aImg;
      let img;
      if (media.image != undefined) {
         aImg = document.createElement("a");
         aImg.ariaLabel=media.title+", close up view";
         img = document.createElement("img");
         img.setAttribute("src", picture);
         img.alt="";
         img.addEventListener("click", function () {
            lightboxModal.style.display = "flex";
            header.setAttribute("class","hidden");
            main.setAttribute("class","hidden");
            body.style.overflow = "hidden";
            document.getElementById("indexMedia").value=compteur;
            console.log(compteur);
            setActiveMedia();

         });
         aImg.appendChild(img);
         articleMedia.appendChild(aImg);
      }
      else {
         let video = document.createElement("video");

         video.setAttribute("src", `assets/media/${media.photographer.name.split(" ")[0]}/${media.video}`);
         video.setAttribute("controls", "true");
         video.alt="";
         video.addEventListener("click", function () {
            lightboxModal.style.display = "flex";
            header.setAttribute("class","hidden");
            main.setAttribute("class","hidden");
            body.style.overflow = "hidden";
            document.getElementById("indexMedia").value=compteur;

            setActiveMedia();

         });
         articleMedia.appendChild(video);

      }
      const divInfosMedia = document.createElement("div");
      divInfosMedia.setAttribute("class", "divInfosMedia");
      const titreMedia = document.createElement("h2");
      titreMedia.innerText = media.title;
      const spanLikes = document.createElement("span");
      spanLikes.innerHTML = media.likes + "  <i class='fa-solid fa-heart'></i>";
      spanLikes.addEventListener("click", function () {
         if(!isLiked){
            media.likes++;
            isLiked=true;
            document.getElementById("stats-likes").innerHTML=calcLikes(medias)+" <i class='fa-solid fa-heart'></i>";
         }
         console.log(media.likes);
         spanLikes.innerHTML = media.likes + "  <i class='fa-solid fa-heart'></i>";
      });
      divInfosMedia.appendChild(titreMedia);
      divInfosMedia.appendChild(spanLikes);
      articleMedia.appendChild(divInfosMedia);

      return articleMedia;

   }
   return { getMediaCardDom }

}
