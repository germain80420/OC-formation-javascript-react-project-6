function setActiveMedia() {

    let index = parseInt(document.getElementById("indexMedia").value);
    console.log(index);
    let mediaActive = document.getElementsByClassName("media-active")[0];
    if (mediaActive != undefined || mediaActive != null) {
        mediaActive.setAttribute("class", "media");
    }
    let titreActive = document.getElementsByClassName("titre-media-active")[0];
    if (titreActive != undefined || titreActive != null) {
        titreActive.setAttribute("class", "titre-media");
    }
    let listeMedias = document.getElementsByClassName("media");
    let listeTitresMedias = document.getElementsByClassName("titre-media");
    for (let i = 0; i < listeMedias.length; i++) {
        if (i === index) {
            listeMedias[i].setAttribute("class", "media-active");
            listeTitresMedias[i].setAttribute("class", "titre-media-active");
            break;
        }
    }


}

function orderBy(filter,array){
    switch(filter){
        case "date":
            array = orderByDate(array);
        break;
        case "likes":
            array = orderByLikes(array);
        break;
        case "title":
            array = orderByTitle(array);
        break;
    }
    return array;
    
}

function orderByLikes(array) {
    const sortByMapped = (map, compareFn) => (a, b) => compareFn(map(a), map(b));
    const byValue = (a, b) => a - b;
    const toLikes = e => e.likes;

    const byLikes = sortByMapped(toLikes, byValue);
    array.sort(byLikes);
    return array;
}
function orderByDate(array) {
    const sortByMapped = (map, compareFn) => (a, b) => compareFn(map(a), map(b));
    const byValue = (a, b) => a - b;
    const toDate = e => new Date(e.date).getTime();

    const byDate = sortByMapped(toDate, byValue);
    array.sort(byDate);
    return array;
}

function orderByTitle(array) {
    const sortByMapped = (map, compareFn) => (a, b) => compareFn(map(a), map(b));
    const byValue = (a, b) => a.localeCompare(b);
      
    const toTitle = e => e.title;

    const byTitle = sortByMapped(toTitle, byValue);
    array.sort(byTitle);
    return array;
}

function calcLikes(listMedias){
    let nbLikes = 0;
    for(const media of listMedias){
        nbLikes+=media.likes;
    }
    return nbLikes;
}



async function getMedias() {
    //on récupére les datas du fichier json 
    let medias = fetch("./data/photographers.json")
        .then(res => res.json())
        .catch(err => console.log('an error occurs', err))
    console.log(medias);
    return medias;
}

async function displayData(medias) {
    const mediasSection = document.querySelector(".medias_section");
    mediasSection.innerHTML="";
    let compteur = 0;
    let divImg = document.getElementById("currentImage");
    divImg.innerHTML="";
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media, medias, compteur);
        const userCardDOM = mediaModel.getMediaCardDom();
        mediasSection.appendChild(userCardDOM);
        compteur++;

        let img = document.createElement("img");
        let picture = `assets/media/${media.photographer.name.split(" ")[0]}/${media.image}`;
        let title;

        if (media.image != undefined) {


            img.setAttribute("src", picture);
            img.setAttribute("class", "media");
            img.setAttribute("id", "media" + media.id);
            divImg.appendChild(img);
        }
        else {

            let video = document.createElement("video");
            video.setAttribute("src", `assets/media/${media.photographer.name.split(" ")[0]}/${media.video}`);
            video.setAttribute("class", "media");
            video.setAttribute("id", "media" + media.id);
            divImg.addEventListener("click", function () {
                if (video.controls === false)
                    video.setAttribute("controls", true);
            })

            // video.setAttribute("controls",true);

            divImg.appendChild(video);

        }
        title = document.createElement("p");
        title.innerText = media.title;
        title.setAttribute("class", "titre-media");
        title.setAttribute("id", "title" + media.id);
        divImg.appendChild(title);
    });

    
};

async function init(filterBy) {

    const { media } = await getMedias();
    const { photographers } = await getMedias();
    let listeMedias = [];
    const idPhotographer = parseInt(window.location.search.substring(4));
    const divInfosPhotographer = document.getElementById("infos-photographer");
    const divImgPhotographer = document.getElementById("imgPhotographer");
    const contactMe = document.getElementById("contactMe");
    const divImg = document.getElementById("currentImage");
    const previousImg = document.getElementById("left-side");
    const nextImg = document.getElementById("right-side");
    const closeLightbox = document.getElementById("close-lightbox");
    const lightboxModal = document.getElementById("lightbox-modal");
    const selectFilter = document.getElementById("filterBy");
    filterBy = selectFilter.value;
    selectFilter.addEventListener("change",function(e){
        filterBy = selectFilter.value;

        displayData(orderBy(filterBy,listeMedias));
    })
    let indexMedia = 0;

    let photographer;

    photographers.forEach(element => {
        photographer = new Photographer(element);
        console.log(photographer.id);
        if (photographer.id == idPhotographer) {
            document.getElementById("stats-price").innerHTML = photographer.price+"€ / jour";

            media.forEach(element => {
                if (element.photographerId == idPhotographer) {
                    console.log(element);
                    let media = new Media(element);

                    media.photographer = photographer;
                    listeMedias.push(media);
                }
            })
            listeMedias = orderBy(filterBy,listeMedias);
            
            closeLightbox.addEventListener("click", function (e) {
                e.preventDefault();
                lightboxModal.style.display = "none";
                const header = document.getElementById("header");
                const main = document.getElementById("main");

                const body = document.getElementById("body");
                header.removeAttribute("class", "hidden");

                main.removeAttribute("class", "hidden");
                body.style.overflow = "auto";
            })
            previousImg.addEventListener("click", function (e) {
                e.preventDefault();
                let index = parseInt(document.getElementById("indexMedia").value);

                if (index === 0) {
                    index = listeMedias.length - 1;
                } else
                    index--;
                document.getElementById("indexMedia").value = index;
                setActiveMedia();

            });
            nextImg.addEventListener("click", function (e) {
                e.preventDefault();
                let index = parseInt(document.getElementById("indexMedia").value);

                if (index >= listeMedias.length - 1) {
                    index = 0;
                } else
                    index++;
                document.getElementById("indexMedia").value = index;
                setActiveMedia();

            });

            photographer.medias = listeMedias;
            const headingPhotographer = document.createElement("h1");
            const location = document.createElement("p");
            const tagLine = document.createElement("p");
            const img = document.createElement('img');
            contactMe.innerHTML += "<br>" + photographer.name;
            img.setAttribute("src", `assets/photographers/${photographer.portrait}`);



            location.setAttribute('class', 'location');
            headingPhotographer.textContent = photographer.name;
            location.innerText = photographer.city + ", " + photographer.country;
            tagLine.innerText = photographer.tagline;
            divInfosPhotographer.appendChild(headingPhotographer);
            divInfosPhotographer.appendChild(location);
            divInfosPhotographer.appendChild(tagLine);
            // divInfosPhotographer.style.width = "35%";
            divImgPhotographer.appendChild(img);


        }
        return;
    })
    document.getElementById("stats-likes").innerHTML=calcLikes(listeMedias)+" <i class='fa-solid fa-heart'></i>";
    displayData(listeMedias);
};


init("likes");


