import {
    searchOpen
} from './modules/handling.js';

const display = document.getElementById('artitems');
display.textContent = "Loading...";

searchOpen()
getAndRenderData()




const artArray = [];
const body = document.querySelector("body");
const html = document.querySelector("html");

function getAndRenderData() {
    const getURL = 'https://www.rijksmuseum.nl/api/nl/collection?key=OoTZzgc6&ps=100'
    fetch(getURL)
        .then(response => response.json())
        .then(response => {
            console.log(response)
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
            showItemInfo(artArray);
            MakeInfobox(artArray);
        }).catch(error => console.log(error))
}

console.log(artArray);

function showInfo(data) {
    data.forEach(item => {
        const tempItem = document.createElement('a');
        tempItem.setAttribute("class", "art");
        tempItem.id = item.id;
        const output = '<article><div><img src="' + item.img.slice(0, -3) + "=s1000" + '" alt=""></div><h2>' + item.title + '</h2></article>';
        tempItem.innerHTML = output;
        display.appendChild(tempItem);
    })
}

function MakeInfobox(data) {
    data.forEach(item => {
        const tempInfobox = document.createElement('article');
        tempInfobox.setAttribute("class", "infobox");
        tempInfobox.id = "info-box_" + item.id;
        const output = '<button><div></div><div></div></button><div><img src="' + item.img.slice(0, -3) + "=s1000" + '" alt=""></div>';
        tempInfobox.innerHTML = output;
        const infoboxWrapper = document.getElementById("info_boxes");
        infoboxWrapper.appendChild(tempInfobox);
    })
}

function search() {
    //Empty results
    display.innerHTML = "";

    var input = document.getElementById("inputfield");

    //search on input
    var search = data.filter(function (d) {
        return (
            d.title.toLowerCase().includes(input.value.toLowerCase()) ||
            d.principalOrFirstMaker.toLowerCase().includes(input.value.toLowerCase())
        );
    });

    //TODO: ignore capital letters & empty state

    showInfo(search);
}


function showItemInfo(data) {
    Array.from(document.getElementsByClassName("art")).forEach(element => {
        element.addEventListener("click", function (event) {
            event.preventDefault();

            const tempTag = this.querySelector("article");
            const button = tempTag.querySelector("button");
            tempTag.classList.add("active");
            button.setAttribute("id", "close_popup");
            
            body.classList.add("popOn");
            html.classList.add("popOn");
        });
    })
}


function closeItemInfo(data) {
        const close = document.getElementById("close_popup");
        const active = document.getElementsByClassName("active");
            close.addEventListener("click", function () {
                console.log(close);
            // body.classList.add("popOn");
            // html.classList.add("popOn");
            });
    Array.from(document.getElementsByClassName("art")).forEach(element => {
        element.addEventListener("click", function (event) {
            event.preventDefault();

            const tempTag = this.querySelector("article");
            const button = tempTag.querySelector("button");
            tempTag.classList.add("active");
            button.setAttribute("id", "close_popup");
            
            body.classList.add("popOn");
            html.classList.add("popOn");
        });
    })
}
// function closeItemInfo() {
//     const close = document.getElementById("close_popup");
//     console.log(close);
//     close.addEventListener("click", function (event) {
//         Array.from(document.getElementsByClassName("art")).forEach(element => {
//             tempTag = document.querySelector("article");
//             if (temptag.classList.contains("active")) {
//                 tempTag.classList.remove("active");
//             }
//             body.classList.remove("popOn");
//         });
//     })
// }
// closeItemInfo();