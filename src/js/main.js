'use strict';
// 1-DECLARACIÓN DE VARIABLES
//queryselector
    
const charactersList = document.querySelector('.jsCharactersList');
const character = document.querySelector('.jsCharacter');
const input = document.querySelector('.jsInput');
const btn = document.querySelector('.jsBtn');
const favouritesList= document.querySelector('.jsFavouritesList');

const titleCharacters= document.querySelector('.jsTitleCharacters');
const titleFavourites= document.querySelector('.jsTitleFav');
const articleCharacters= document.querySelector('.jsArticleCharacters');
const articleFavourites= document.querySelector('.jsFavouritesList');

//Variables globales 
let characters = [];
let favouritesCharacters = [];

// DECLARACIÓN DE FUNCIONES

//función añadir a fav

function addToFavourite(event){
    event.preventDefault();
    const id = parseInt(event.currentTarget.dataset.id);
    const selectedCharacter = characters.find((character) => character.char_id === id);
    if(!favouritesCharacters.find((character) => character.char_id === id)){ //Para evitar que se me añada varias veces el mismo favorito
        favouritesCharacters.push(selectedCharacter);
        localStorage.setItem('favouritesCharacters', JSON.stringify(favouritesCharacters));
        drawCharacter(selectedCharacter, favouritesList, true);
    } 
}

function removeFromFavourite(event){
    event.preventDefault();
    const id = parseInt(event.currentTarget.dataset.id);
    favouritesCharacters = favouritesCharacters.filter((character) => character.char_id !== id);
    localStorage.setItem('favouritesCharacters', JSON.stringify(favouritesCharacters));
    event.currentTarget.remove();
}

//3-función renderizar
function drawCharacter(character, list, isFavourite){
    //sólo me pinta un personaje. en la función fetch con el bucle pinto todos.
    //Le paso parámetros (personaje, lista donde va a ir guardada,si es fav), para poder reutilizarla en fav y en la busqueda.
    const liElement = document.createElement('li');
    liElement.classList.add('character');
    liElement.classList.add('jsCharacter');
    liElement.dataset.id = character.char_id; //Añado id del personaje en el atributo data-id
    
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src',character.img);
    imgElement.setAttribute('alt',character.name);
    imgElement.classList.add('character-img');
    liElement.appendChild(imgElement);
    
    const paragraph1Element = document.createElement('p');
    const paragraph1Name = document.createTextNode(character.name);
    paragraph1Element.appendChild(paragraph1Name);
    paragraph1Element.classList.add('character-paragraph');
    liElement.appendChild(paragraph1Element);
    
    const paragraph2Element = document.createElement('p');
    const paragraph2Name = document.createTextNode(character.status);
    paragraph2Element.appendChild(paragraph2Name)
    paragraph2Element.classList.add('character-paragraph');
    liElement.appendChild(paragraph2Element);

    if(isFavourite){
        liElement.classList.add('favourite');
        liElement.addEventListener('click', removeFromFavourite);
    } else {
        liElement.addEventListener('click', addToFavourite);
    }
    list.appendChild(liElement);// a la lista que yo le digo, pintame el li

//     charactersList.innerHTML += `<li class="list jsCharacter">
//     <img class="list-img" src="${character.img}" alt="Foto ${character.name}">
//     <p class="list-paragraph">${character.name}</p>
//     <p class="list-paragraph">${character.status}</p>
// </li>`  
};

//4-función filtrar
function filterCharacter (event){
    event.preventDefault();
    const nameSearch= input.value;
    charactersList.innerHTML = '';
    // const filteredCharacters = characters.filter((character) =>
    // character.name.toLowerCase().includes(nameSearch.toLowerCase()));
    // console.log(filterCharacter);
    // for(const character of filteredCharacters){
    //     drawCharacter(character);
    // }
    fetchFilteredCharacters(nameSearch);
}
//5-función filtrar por api
function fetchFilteredCharacters(name){
    fetch(`https://breakingbadapi.com/api/characters?name=${name}`)
    .then((response) => response.json())
    .then((filteredCharacters) => {
            for(const character of filteredCharacters){
                drawCharacter(character, charactersList,false);
            }
    }); 
}
//2- función petición al servidor
function fetchAllCharacters(){
    fetch('https://breakingbadapi.com/api/characters')
    .then((response) => response.json())
    .then((jsonData) => {
            characters = jsonData;
            for(const character of characters){
                drawCharacter(character, charactersList, false);
            }
    }); 
};

function drawFavouritesCharacters(){
    if(favouritesCharacters.length){
        for(const character of favouritesCharacters){
            drawCharacter(character, favouritesList, true);
        }
    }   
};

//Eventos
btn.addEventListener('click', filterCharacter);


//Ejecucciones: 
fetchAllCharacters(); //Pintamos todos los personajes
if(localStorage.getItem('favouritesCharacters')){ //Antes de pintar los favoritos compruebo que haya en el local storage
    favouritesCharacters = JSON.parse(localStorage.getItem('favouritesCharacters'));
}
drawFavouritesCharacters();











