'use strict';
// DECLARACIÓN DE VARIABLES
//queryselector
    
const charactersList = document.querySelector('.jsCharactersList');
const character = document.querySelector('.jsCharacter');
const input = document.querySelector('.jsInput');
const btn = document.querySelector('.jsBtn');
const favouritesList= document.querySelector('.jsFavouritesList');

//Variables globales 
let characters = [];
let favouritesCharacters = [];

// DECLARACIÓN DE FUNCIONES

//función renderizar
function drawCharacter(character){
    //Aquí código para pintar
    const liElement = document.createElement('li');
    liElement.classList.add('list');
    liElement.classList.add('jsCharacter');
    
    const imgElement = document.createElement('img');
    imgElement.setAttribute('src',character.img);
    imgElement.setAttribute('alt',character.name);
    imgElement.classList.add('list-img');
    liElement.appendChild(imgElement);
    
    const paragraph1Element = document.createElement('p');
    const paragraph1Name = document.createTextNode(character.name);
    paragraph1Element.appendChild(paragraph1Name);
    paragraph1Element.classList.add('list-paragraph');
    liElement.appendChild(paragraph1Element);
    
    const paragraph2Element = document.createElement('p');
    const paragraph2Name = document.createTextNode(character.status);
    paragraph2Element.appendChild(paragraph2Name)
    paragraph2Element.classList.add('list-paragraph');
    liElement.appendChild(paragraph2Element);

    // liElement.addEventListener('click', addToFavourite)

    charactersList.appendChild(liElement);




//     charactersList.innerHTML += `<li class="list jsCharacter">
//     <img class="list-img" src="${character.img}" alt="Foto ${character.name}">
//     <p class="list-paragraph">${character.name}</p>
//     <p class="list-paragraph">${character.status}</p>
// </li>`  
};

//función filtrar
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
//función filtrar por api
function fetchFilteredCharacters(name){
    fetch(`https://breakingbadapi.com/api/characters?name=${name}`)
    .then((response) => response.json())
    .then((filteredCharacters) => {
            for(const character of filteredCharacters){
                drawCharacter(character);
            }
    }); 
}
// función petición al servidor
function fetchAllCharacters(){
    fetch('https://breakingbadapi.com/api/characters')
    .then((response) => response.json())
    .then((jsonData) => {
            characters = jsonData;
            localStorage.setItem('characters', characters)
            for(const character of characters){
                drawCharacter(character);
            }
    }); 
}

//Eventos
btn.addEventListener('click', filterCharacter);


//Ejecucciones: 
fetchAllCharacters();











