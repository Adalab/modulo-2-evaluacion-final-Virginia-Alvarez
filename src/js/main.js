'use strict';
// Declaración de Variables
//queryselector
const charactersList = document.querySelector('.jsCharactersList');
const character = document.querySelector('.jsCharacter');
//Variables globales 
let characters; // = a lo que recuperes del fetch

// Declración de Funciones

//función renderizar
function drawCharacter(character){
    //Aquí código para pintar
    charactersList.innerHTML += `<li class="list jsCharacter">
    <img class="list-img" src="${character.img}" alt="Foto ${character.name}">
    <p class="list-paragraph">${character.name}</p>
    <p class="list-paragraph">${character.status}</p>
</li>`
};

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











