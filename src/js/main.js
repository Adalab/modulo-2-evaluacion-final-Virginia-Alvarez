'use strict'
// 1-DECLARACIÓN DE VARIABLES
//queryselector
const charactersList = document.querySelector('.jsCharactersList');
const character = document.querySelector('.jsCharacter');
const input = document.querySelector('.jsInput');
const btn = document.querySelector('.jsBtn');
const favouritesList= document.querySelector('.jsFavouritesList');
const trash = document.querySelector('.jsTrash');

const titleCharacters= document.querySelector('.jsTitleCharacters');
const titleFavourites= document.querySelector('.jsTitleFav');
const articleCharacters= document.querySelector('.jsArticleCharacters');
const articleFavourites= document.querySelector('.jsArticleFavourites');

//Variables globales 

let characters = [];             
let favouritesCharacters = [];

// DECLARACIÓN DE FUNCIONES

//funciónes fav

function addToFavourite(event){
    event.preventDefault();
    const id = parseInt(event.currentTarget.dataset.id);
    const selectedCharacter = characters.find((character) => character.char_id === id);
    if(!favouritesCharacters.find((character) => character.char_id === id)){ //Para evitar que se me añada varias veces el mismo favorito
        favouritesCharacters.push(selectedCharacter);
        localStorage.setItem('favouritesCharacters', JSON.stringify(favouritesCharacters));
        drawFavouritesCharacters();
    } 
}

function removeFromFavourite(event){
    event.preventDefault();
    const id = parseInt(event.currentTarget.dataset.id);
    favouritesCharacters = favouritesCharacters.filter((character) => character.char_id !== id);
    localStorage.setItem('favouritesCharacters', JSON.stringify(favouritesCharacters));
    drawFavouritesCharacters();
}
//bonus: borrar todos los favoritos 

function favToTrash(event){
    event.preventDefault();
    favouritesCharacters= [];
    localStorage.removeItem('favouritesCharacters')
    drawFavouritesCharacters();
}

//3-función pintar un personaje
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
    paragraph2Element.appendChild(paragraph2Name);
    paragraph2Element.classList.add('character-paragraph');
    liElement.appendChild(paragraph2Element);

    if(isFavourite){  
        liElement.classList.add('favourite');
        liElement.addEventListener('click', removeFromFavourite);
    } else {
        liElement.addEventListener('click', addToFavourite);
    }
    list.appendChild(liElement);// a la lista que yo le digo, pintame el li
}

//4-función filtrar por búsqueda
function filterCharacter (event){
    event.preventDefault();
    const nameSearch= input.value;
    charactersList.innerHTML = '';
    fetchFilteredCharacters(nameSearch);
}

//5-Petición filtrados
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
}
//5-funcion pintar fav
function drawFavouritesCharacters(){
    favouritesList.innerHTML = '';
    if(favouritesCharacters.length){
        titleCharacters.classList.remove('titles-characters-full-screen');
        titleCharacters.classList.add('titles-characters');
        titleFavourites.classList.remove('hidden');
        articleCharacters.classList.remove('section-list-characters-full-screen');
        articleCharacters.classList.add('section-list-characters');
        articleFavourites.classList.remove('hidden');
        for(const character of favouritesCharacters){
            drawCharacter(character, favouritesList, true);
        }
    } else {
        titleCharacters.classList.add('titles-characters-full-screen');
        titleCharacters.classList.remove('titles-characters');
        titleFavourites.classList.add('hidden');
        articleCharacters.classList.add('section-list-characters-full-screen');
        articleCharacters.classList.remove('section-list-characters');
        articleFavourites.classList.add('hidden');
    }
}

//Eventos
btn.addEventListener('click', filterCharacter);
trash.addEventListener('click',favToTrash);


//Ejecucciones: 

fetchAllCharacters(); //Pintamos todos los personajes
if(localStorage.getItem('favouritesCharacters')){ //Antes de pintar los favoritos compruebo que haya en el local storage
    favouritesCharacters = JSON.parse(localStorage.getItem('favouritesCharacters'));
}
drawFavouritesCharacters();











