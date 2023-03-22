function photographerFactory(data) {
    //on récupére les différentes variables de l'objet json
    const { name,id,city,country,tagline,price, portrait } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {

        //on crée et on ajoute les différents éléments du dom pour l'affichage des informations 
        const linkPhotographer = document.createElement('a');
        linkPhotographer.href=`photographer/${id}`;

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
        location.innerText = city+", "+country;
        pTagline.innerText = tagline;
        pPrice.innerText = price+"€/jour";
        h2.textContent = name;
        linkPhotographer.appendChild(article);
        article.appendChild(img);
        article.appendChild(divInfosPhotographer);
        divInfosPhotographer.appendChild(h2);
        divInfosPhotographer.appendChild(location);
        divInfosPhotographer.appendChild(pTagline);
        divInfosPhotographer.appendChild(pPrice);

        return (linkPhotographer);
    }
    return { name, picture, getUserCardDOM }
}