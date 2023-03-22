    async function getPhotographers() {
       //on récupére les datas du fichier json 
        let photographers =  fetch("/data/photographers.json")
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

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    
