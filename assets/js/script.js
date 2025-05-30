document.addEventListener('DOMContentLoaded', () => {
  const input = document.getElementById('searchInput');
  const button = document.getElementById('searchButton');
  const container = document.getElementById('characterContainer');

  function limpiarResultados() {
    container.innerHTML = '';
  }

  function mostrarError(mensaje) {
    limpiarResultados();
    const div = document.createElement('div');
    div.id = 'errorMessage';
    div.textContent = mensaje;
    container.appendChild(div);
  }

  function renderizarPersonaje(personaje) {
    const col = document.createElement('div');
    col.className = 'col-md-4';

    const card = document.createElement('div');
    card.className = 'card';

    const imagen = document.createElement('img');
    imagen.src = personaje.image;
    imagen.className = 'card-img-top';

    const body = document.createElement('div');
    body.className = 'card-body';

    const nombre = document.createElement('h5');
    nombre.className = 'card-title';
    nombre.textContent = personaje.name;

    const raza = document.createElement('p');
    raza.className = 'card-text';
    raza.textContent = `Raza: ${personaje.race}`;

    const genero = document.createElement('p');
    genero.className = 'card-text';
    genero.textContent = `Género: ${personaje.gender}`;

    body.appendChild(nombre);
    body.appendChild(raza);
    body.appendChild(genero);
    card.appendChild(imagen);
    card.appendChild(body);
    col.appendChild(card);
    container.appendChild(col);
  }
async function obtenerPersonajesIniciales() {
  limpiarResultados();

  try {
    const respuesta = await fetch('https://dragonball-api.com/api/characters?limit=100'); // Podés cambiar el número
    const data = await respuesta.json();

    if (data && data.items && data.items.length > 0) {
      data.items.forEach(personaje => {
        renderizarPersonaje(personaje);
      });
    } else {
      mostrarError('No se encontraron personajes.');
    }
  } catch (error) {
    mostrarError('Ocurrió un error al consultar la API.');
    console.error(error);
  }
}

obtenerPersonajesIniciales();
  async function buscarPersonaje(nombre) {
    limpiarResultados();

    try {
      const respuesta = await fetch(`https://dragonball-api.com/api/characters?name=${nombre}`);
      const data = await respuesta.json();

      if (data && data.length > 0) {
        data.forEach(personaje => {
          renderizarPersonaje(personaje);
        });
      } else {
        mostrarError('No se encontraron personajes con ese nombre.');
      }
    } catch (error) {
      mostrarError('Ocurrió un error al consultar la API.');
      console.error(error);
    }
  }

  button.addEventListener('click', () => {
    const nombre = input.value.trim();

    if (nombre === '') {
      mostrarError('Por favor escribí un nombre para buscar.');
    } else {
      buscarPersonaje(nombre);
    }
  });
});