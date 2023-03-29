function photographerFactory(data) {
    //on créé un objet Photographer en envoyant les données de l'objet json en parametre
    const photographer = new Photographer(data);

    const picture = `assets/photographers/${photographer.portrait}`;

    function getUserCardDOM() {

        //on crée et on ajoute les différents éléments du dom pour l'affichage des informations 
        const linkPhotographer = document.createElement('a');
        linkPhotographer.href=`/photographer.html?id=${photographer.id}`;

        const article = document.createElement( 'article' );
        const img = document.createElement( 'img' );
        img.setAttribute("src", picture)

        const divInfosPhotographer = document.createElement("div");
        divInfosPhotographer.setAttribute("class","infos-photographer");
        const h2 = document.createElement( 'h2' );
        const location = document.createElement('p');
        location.setAttribute('class','location');
        const pTagline = document.createElement('p');
        pTagline.setAttribute('class','tagline');
        const pPrice = document.createElement("p");
        pPrice.setAttribute("class","price");
        location.innerText = photographer.city+", "+photographer.country;
        pTagline.innerText = photographer.tagline;
        pPrice.innerText = photographer.price+"€/jour";
        h2.textContent = photographer.name;
        linkPhotographer.appendChild(img);
        linkPhotographer.appendChild(h2)

        article.appendChild(linkPhotographer);
        article.appendChild(divInfosPhotographer);
        divInfosPhotographer.appendChild(location);
        divInfosPhotographer.appendChild(pTagline);
        divInfosPhotographer.appendChild(pPrice);

        return (article);
    }
    return { getUserCardDOM }
}
function getPhotographerById(id){
    getPhotographers().forEach(photographer => {
        if(photographer.id==id){
            return photographer;
        }
    });
}