import {MakeInfobox, showInfo } from './create.js';
import { handleRoutes } from './router.js'; 

export const display = document.getElementById('artItems');
display.textContent = "Loading...";

const artArray = [];
export function getAndRenderData() {
    const getURL = 'https://www.rijksmuseum.nl/api/nl/collection?key=OoTZzgc6&ps=100'
    fetch(getURL)
        .then(response => response.json())
        .then(response => {
            response.artObjects.forEach(art => {
                artArray.push({
                    id: art.id,
                    title: art.title,
                    maker: art.principalOrFirstMaker,
                    img: art.webImage.url,
                    place: art.productionPlaces,
                    link: art.links.web

                });
            })

            display.textContent = "";
            display.classList.remove("loading");
            showInfo(artArray);
            MakeInfobox(artArray);
            handleRoutes();
        }).catch(error => console.log(error))
}