// Función para renderizar personajes
function renderCharacters(characters) {
  const container = document.getElementById("characters-container");
  container.innerHTML = "";

  characters.forEach(character => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-4";
    card.innerHTML = `
      <div class="card">
        <img src="${character.image}" class="card-img-top" alt="${character.name}">
        <div class="card-body">
          <h5 class="card-title">${character.name}</h5>
          <p class="card-text">Raza: ${character.race}</p>
          <p class="card-text">Género: ${character.gender}</p>
          <button class="btn btn-primary btn-ver-detalle" data-id="${character.id}">
            Ver detalles
          </button>
        </div>
      </div>
    `;
    container.appendChild(card);
  });

  // Agregar evento a los botones (no a toda la tarjeta)
  document.querySelectorAll(".btn-ver-detalle").forEach(button => {
    button.addEventListener("click", async (e) => {
      const characterId = e.target.getAttribute("data-id");
      const character = await fetchCharacterDetails(characterId);
      showCharacterModal(character);
    });
  });
}

// Función para obtener detalles del personaje
async function fetchCharacterDetails(id) {
  try {
    const response = await fetch(`https://dragonball-api.com/api/characters/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener detalles:", error);
    return null;
  }
}

// Función para mostrar el modal con los detalles
function showCharacterModal(character) {
  if (!character) return;

  const modal = document.getElementById("characterModal");
  const modalTitle = modal.querySelector(".modal-title");
  const modalBody = modal.querySelector(".modal-body");

  modalTitle.textContent = character.name;
  modalBody.innerHTML = `
    <img src="${character.image}" class="img-fluid mb-3">
    <p><strong>Raza:</strong> ${character.race}</p>
    <p><strong>Género:</strong> ${character.gender}</p>
    <p><strong>Ki:</strong> ${character.ki}</p>
    <!-- Agrega más detalles según la API -->
  `;

  // Mostrar el modal (usando Bootstrap)
  const bootstrapModal = new bootstrap.Modal(modal);
  bootstrapModal.show();
}