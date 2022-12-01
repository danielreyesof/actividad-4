(() => {
  'use strict';

  const getInfo = async (path) => {
    let characters = [];

    let url = 'https://rickandmortyapi.com/api/character';

    if (path != undefined) {
      url = `https://rickandmortyapi.com/api/character/?name=${path}`;
    }

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        characters.push(...data.results);
      });

    return characters;
  };

  let app = document.getElementById('root');

  app.innerHTML = `
      <div class="box-shadow-card landing">
          <div class="box-content">
              <img class="image-landing" src="./assets/Rick-and-Morty.png"/>
              <h1>Bienvenido a la API de Rick and Morty</h1>
              <button type="button" id="next" class="btn btn-success next-button">Continuar</button>
          </div>
      </div>
  `;

  const btnNext = document.getElementById('next');

  btnNext.addEventListener('click', () => {
    app.innerHTML = `
          <section>
            <div class="container-fluid">
              <div class="row" style="margin-top: 3rem;">
                <div class="col-12 search-line">
                <img class="image-landing" src="./assets/Rick-and-Morty.png"/>
             
                </div>
                <div class="col-12 search-line">
                  <input type="text" id="input-search" class="form-control" placeholder="Buscar personaje..." style="width: 70%;">
                  <button type="button" id="button-search" class="btn btn-primary search-button">Buscar</button>
                </div>
              </div>
              <div id="characters" class="row m-5"></div>
            </div>
          </section>
          
          <div id="molde" class="d-none">
            <div class="col-12 col-md-6 col-lg-4 character-card">
              <div class="card">
                <img src="" class="img-fluid imagen-personaje">
                <h3 class="nombre-personaje"></h3>
                <span class="especie"></span>
                <span class="ubicacion"></span>
              </div>
            </div>
          </div>
      `;

    getInfo().then((res) => {
      letCharacters(res);
    });

    const searchButton = document.getElementById('button-search');

    searchButton.addEventListener('click', () => {
      const inputValue = document.getElementById('input-search').value;

      getInfo(inputValue).then((res) => {
        document.getElementById('characters').innerHTML = '';
        letCharacters(res);
      });
    });
  });

  const letCharacters = (array) => {
    const container = document.querySelector('#characters');
    const molde = document.querySelector('.character-card');

    array.forEach((r) => {
      let copia = molde.cloneNode(true);
      copia.querySelector('.nombre-personaje').innerText = r.name;
      copia.querySelector('.imagen-personaje').src = r.image;
      copia.querySelector('.especie').innerText = `Especie: ${r.species}`;
      copia.querySelector('.ubicacion').innerText = `Origen: ${r.origin.name}`;

      container.appendChild(copia);
    });
  };
})();
