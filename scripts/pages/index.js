    async function getPhotographers() {
       //on récupére les datas du fichier json 
        let photographers =  fetch("./data/photographers.json")
                            .then(res => res.json())      
                            .catch(err => console.log('an error occurs', err))
        console.log(photographers);
        return photographers;
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");
        
        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
     };

    function setActivePhotographer(indexPhotographer){
        let listPhotographer = document.getElementsByClassName("card-photographer");
        let compteur = 0;
        for(let photographer of listPhotographer){
            if(compteur === indexPhotographer)
                photographer.style.border = "2px solid black";
            else
                photographer.style.border ="none";

            compteur++;
        }
    }

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
       // const { media } = await getPhotographers();
       // const listeMedias = [];
        // media.forEach(element => {
        //     const media1 = new Media(element);
        //     listeMedias.push(media1);
        // });
        // console.log(listeMedias[1].type);
        displayData(photographers);
        let indexPhotographer = -1;
        document.addEventListener("keyup",function(e){
            switch(e.key){
                case "ArrowRight":
                    indexPhotographer++;
                    if(indexPhotographer>photographers.length-1)
                        indexPhotographer=-1;
                    
                break;
                case "ArrowLeft":
                    if(indexPhotographer>=0)
                    indexPhotographer--;
                break;
                case " ":
                    if(indexPhotographer!=-1)
                        window.location = "photographer.html?id="+photographers[indexPhotographer].id;
                break;
            }
            setActivePhotographer(indexPhotographer);
        });
    };
    
    init();
    
