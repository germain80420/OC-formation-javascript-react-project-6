
async function getMedias() {
    //on récupére les datas du fichier json 
     let medias =  fetch("/data/photographers.json")
                         .then(res => res.json())      
                         .catch(err => console.log('an error occurs', err))
     console.log(medias);
     return medias;
 }

 async function displayData(medias) {
    const mediasSection = document.querySelector(".medias_section");
    
    medias.forEach((media) => {
        const mediaModel = mediaFactory(media);
        const userCardDOM = mediaModel.getMediaCardDom();
        mediasSection.appendChild(userCardDOM);
    });
 };
async function init() {
    
    const { media } = await getMedias();
    const { photographers } = await getMedias();
    const listeMedias = [];
    const idPhotographer = parseInt(window.location.search.substring(4));
    let photographer;
    console.log(window.location.search.substring(4));
    photographers.forEach(element => {
        photographer = new Photographer(element);
        console.log(photographer.id);
        if(photographer.id == idPhotographer){
            media.forEach(element => {
                if(element.photographerId==idPhotographer){
                    console.log(element);
                    let media = new Media(element);
                    media.photographer = photographer;
                    listeMedias.push(media);
                }
            })
            photographer.medias = listeMedias;
        }
        return;
    })
   
    displayData(listeMedias);
};

init();
 
