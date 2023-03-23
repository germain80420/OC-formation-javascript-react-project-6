function photographerFactory(data) {
    //on créé un objet Photographer en envoyant les données de l'objet json en parametre
    const photographer = new Photographer(data);

    const picture = `assets/photographers/${photographer._portrait}`;

    function getUserCardDOM() {

        //on crée et on ajoute les différents éléments du dom pour l'affichage des informations 
        const linkPhotographer = document.createElement('a');
        linkPhotographer.href=`/photographer.html?id=${photographer._id}`;

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
        location.innerText = photographer._city+", "+photographer._country;
        pTagline.innerText = photographer._tagline;
        pPrice.innerText = photographer._price+"€/jour";
        h2.textContent = photographer._name;
        linkPhotographer.appendChild(article);
        article.appendChild(img);
        article.appendChild(divInfosPhotographer);
        divInfosPhotographer.appendChild(h2);
        divInfosPhotographer.appendChild(location);
        divInfosPhotographer.appendChild(pTagline);
        divInfosPhotographer.appendChild(pPrice);

        return (linkPhotographer);
    }
    return { getUserCardDOM }
}