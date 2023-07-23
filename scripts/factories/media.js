function mediaFactory(media, medias, compteur) {
   let picture = `assets/media/${media.photographer.name.split(" ")[0]}/${media.image}`;
   function getMediaCardDom() {
      const articleMedia = document.createElement("article");
      const lightboxModal = document.getElementById("lightbox-modal");
      const header = document.getElementById("header");
      const main = document.getElementById("main");
      const body = document.getElementById("body");
      articleMedia.setAttribute("class", "article-media");
      articleMedia.setAttribute("id", "article-media-" + compteur);
      let isLiked = false;
      let aImg;
      let img;
      aImg = document.createElement("a");
      aImg.href = compteur;
      aImg.dataset.index = compteur;
      aImg.addEventListener("click", function (e) {
         let index = aImg.dataset.index;
         e.preventDefault();
         lightboxModal.style.display = "flex";
         header.setAttribute("class", "hidden");
         main.setAttribute("class", "hidden");
         header.ariaHidden = "true";
         main.ariaHidden = "true";
         lightboxModal.ariaHidden = "false";
         body.style.overflow = "hidden";
         document.getElementById("indexMedia").value = index;
         setActiveMedia(index);
      })
      aImg.disabled = true;
      aImg.ariaLabel = media.title + ", close up view";
      if (media.image != undefined) {

         img = document.createElement("img");
         img.setAttribute("src", picture);
         img.alt = "";
         aImg.appendChild(img);
         articleMedia.appendChild(aImg);
      }
      else {
         let video = document.createElement("video");
         video.setAttribute("src", `assets/media/${media.photographer.name.split(" ")[0]}/${media.video}`);
         video.alt = "";
         video.addEventListener("click", function () {
            lightboxModal.style.display = "flex";
            header.setAttribute("class", "hidden");
            main.setAttribute("class", "hidden");
            body.style.overflow = "hidden";
            document.getElementById("indexMedia").value = compteur;
            setActiveMedia();
         });
         aImg.appendChild(video);
         articleMedia.appendChild(aImg);
      }
      const divInfosMedia = document.createElement("div");
      divInfosMedia.setAttribute("class", "divInfosMedia");
      const titreMedia = document.createElement("h2");
      titreMedia.innerText = media.title;
      const spanLikes = document.createElement("span");
      spanLikes.innerHTML = media.likes + "  <i class='fa-solid fa-heart'></i>";
      spanLikes.addEventListener("click", function () {
         if (!isLiked) {
            media.likes++;
            isLiked = true;
            document.getElementById("stats-likes").innerHTML = calcLikes(medias) + " <i class='fa-solid fa-heart'></i>";
         }
         spanLikes.innerHTML = media.likes + "  <i class='fa-solid fa-heart'></i>";
      });
      divInfosMedia.appendChild(titreMedia);
      divInfosMedia.appendChild(spanLikes);
      articleMedia.appendChild(divInfosMedia);

      return articleMedia;

   }
   return { getMediaCardDom }

}
