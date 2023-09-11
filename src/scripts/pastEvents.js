// --> comienzo del script

import data from "./fetchData.js";

if (data.events) {

  // Variables para manejar los inputs de filtrado, búsqueda y cantidad de tarjetas de eventos creadas.
  let filterInput = [];
  let searchInput = [];
  let eventsListed = 0;

  // Esta función establece los search params de la URL dependiendo del tipo de acción que se ingrese. Se aplica tanto al
  // filtrado por categorías como a la búsqueda por nombre.
  function setURLSearchParams(key, value, action) {
    const url = new URL(window.location.href);
  
    if (action == "delete") {
      const entries = url.searchParams.getAll(key).filter(item => item !== value);
      url.searchParams.delete(key);
      entries.map(item => url.searchParams.append(key, item));
    } else if (action == "set") {
      url.searchParams.delete(key);
      !value || url.searchParams.set(key, value);
    } else {
      url.searchParams.append(key, value);
    }

    return window.history.pushState({ path: url.href }, "", url.href);
  }

  // Esta función filtra los eventos de data y devuelve una nueva array con los eventos pasados solamente.
  function pastEventsArray() {
    return data.events.filter(item => item.date <= data.currentDate);
  }

  // Esta función devuelve un array que utiliza como entrada la función de crear tajetas. El array esta compuesto por los
  // eventos pasados que están presentes en el array de filtrado.
  function filteredData(inputArray) {
    return inputArray.filter(item => filterInput.find(subitem => subitem == item.category) !== undefined);
  };

  // Esta función también devuelve un array que utiliza como entrada la función de crear tajetas, se le especifica un parámetro
  // de entrada que es una array, la cual filtra y normaliza los datos según lo requerido.
  function searchedData(inputArray) {
    return inputArray.filter(item => {
      if (item.name.toLowerCase().includes(searchInput[0].toLowerCase())) return item;
    });
  }

  // Esta función crea de forma dinámica los checkboxes para filtrar por categoría.
  function createCategoriesCheckboxes() {
    const categories = Array.from(new Set(pastEventsArray().map(item => item.category)));

    return categories.map(item => {
      document.getElementById("pastEventsCategoriesContainer").insertAdjacentHTML(
        "beforeend",
        `<div class="form-check form-check-inline">
          <input type="checkbox" class="form-check-input" id="${item}" name="categories" value="${item}" role="button">
          <label for="${item}" class="form-check-label">${item}</label>
        </div>`
      );
    })
  }

  // Esta función crea de forma dinámica las tarjetas de eventos, recibe como argumento un array, o retorna un mensaje amigable 
  // al usuario cuando no hay nada que coincida con la búsqueda que realizó según lo requerido.
  function createEventsCards(inputArray) {
    if (!inputArray.length) {
      document.querySelector(".msg") && document.querySelector(".msg").remove();
      document.getElementById("pastEventsCardsContainer").insertAdjacentHTML(
        "beforeend",
        `<h2 class="msg text-secondary text-center">Sorry, no events were found.</h2>`
      );
    } else {
      document.querySelector(".msg") && document.querySelector(".msg").remove();
      inputArray.map(item => {
        eventsListed++;
        document.getElementById("pastEventsCardsContainer").insertAdjacentHTML(
          "beforeend",
          `<div class="card-wrapper col-12 col-sm-6 col-md-4 col-lg-3 my-2">
          <div class="card" style="min-height: 25rem">
            <figure class="m-0">
              <img src="${item.image}" alt="${item.category}" class="card-img-top object-fit-cover" style="height: 10rem;">
            </figure>
            <div class="card-body d-flex flex-column align-items-stretch justify-content-between">
              <h2 class="card-title fs-4 text-center">${item.name}</h2>
              <p class="card-text">${item.description}</p>
              <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
                <span class="card-text">Price: ${item.price}</span>
                <a href="../pages/details.html?id=${item._id}" class="btn btn-outline-danger px-4" data-details="${item._id}">
                  Details
                </a>
              </div>
            </div>
          </div>
        </div>`
        );
      })
    }
  }

  // Esta función es la encargada de llamar a la función de creación de tarjetas dependiendo de la interacción del usuario:
  // si se activa el filtro por categoría, la búsqueda por nombre, ambos o incluso ninguno, es el tipo de array que 
  // envía como parámetro. También imprime la cantidad de eventos listados.
  function updateCards() {
    eventsListed = 0;
    document.querySelector(".card-wrapper") && document.querySelectorAll(".card-wrapper").forEach(item => item.remove());
    document.querySelector(".events-listed") && document.querySelector(".events-listed").remove();

    if (filterInput.length && !searchInput.length) {
      createEventsCards(filteredData(pastEventsArray()));
    } else if (!filterInput.length && searchInput.length) {
      createEventsCards(searchedData(pastEventsArray()));
    } else if (filterInput.length && searchInput.length) {
      createEventsCards(searchedData(filteredData(pastEventsArray())));
    } else {
      createEventsCards(pastEventsArray());
    }

    document.querySelector("main").insertAdjacentHTML(
      "beforeend",
      `<p class="events-listed m-0 p-2">Total events listed: ${eventsListed}</p>`
    );
  }

  // cuando el script se carga se llaman estas dos funciones.
  createCategoriesCheckboxes();
  updateCards();

  // Evento para el botón de búsqueda, envía el valor ingresado al array respectiva, inserta los search params y
  // llama a la función para actualizar las tarjetas.
  document.getElementById("submit-input").addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      searchInput = [];
      searchInput.push(document.getElementById("search-input").value);
      setURLSearchParams("search", document.getElementById("search-input").value, "set");
      updateCards();
    }
  )

  // Evento para borrar el input en la barra de búsqueda y datos asociados.
  document.getElementById("clear-btn").addEventListener(
    "click",
    () => {
      document.getElementById("search-input").value = "";
      searchInput = [];
      setURLSearchParams("search", null, "set");
      updateCards();
    }
  )

  // Evento para los checkboxes, envía los valores al array correspondiente, define los search params y actualiza las tarjetas.
  document.querySelector(".form-check-input") &&
    document.querySelectorAll(".form-check-input").forEach(item => {
      item.addEventListener("change", (event) => {
        filterInput.includes(event.target.value)
          ? (filterInput = filterInput.filter(subitem => subitem != event.target.value),
            setURLSearchParams("filter", event.target.value, "delete"))
          : (filterInput = [...filterInput, event.target.value],
            setURLSearchParams("filter", event.target.value, "append"));
        updateCards();
      });
    })
  
  document.getElementById("pastEventsNavBar").classList.remove("d-none");
  
// Si hay algun fallo en la peticion a la API, solo se imprime un mensaje.
} else {
  document.getElementById("pastEventsCardsContainer").insertAdjacentHTML(
    "beforeend",
    `<h2 class="text-center">${Object.keys(data)}: ${Object.values(data)}</h2>`
  )
}

  // --> fin del script
