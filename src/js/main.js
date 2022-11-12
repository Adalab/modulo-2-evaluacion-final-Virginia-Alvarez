'use strict';
// Declaración de Variables
    //queryselector
const charactersList = document.querySelector('.jsCharactersList');
const character = document.querySelector('.jsCharacter');
const input = document.querySelector('.jsInput');
const btn = document.querySelector('.jsBtn');
    //Variables globales 
let characters = [];
let favouritesCharacters = [];

// Declaración de Funciones

    //función renderizar
function drawCharacter(character){
    //Aquí código para pintar
    charactersList.innerHTML += `<li class="list jsCharacter">
    <img class="list-img" src="${character.img}" alt="Foto ${character.name}">
    <p class="list-paragraph">${character.name}</p>
    <p class="list-paragraph">${character.status}</p>
</li>`  
};

    //función filtrar
function filterCharacter (event){
    event.preventDefault();
    const nameSearch= input.value;
    charactersList.innerHTML = '';
    const filteredCharacters = characters.filter((character) =>
    character.name.toLowerCase().includes(nameSearch.toLowerCase()));
    console.log(filterCharacter);
    for(const character of filteredCharacters){
        drawCharacter(character);
    }
}

//Eventos
btn.addEventListener('click', filterCharacter);
//Ejecucciones: codigo que se ejecuta al cargar la pagina

//servidor
fetch('https://breakingbadapi.com/api/characters')
  .then((response) => response.json())
  .then((jsonData) => {
        characters = jsonData;
        localStorage.setItem('characters', characters)
        for(const character of characters){
            drawCharacter(character);
        }
});











