(() => {
  'use strict';

  let characters = [];

  fetch('https://rickandmortyapi.com/api/character')
    .then((response) => response.json())
    .then((data) => characters.push(data.results));


    console.log(characters);
})();
