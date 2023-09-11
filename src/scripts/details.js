// --> comienzo del script

import data from "./fetchData.js";

// Trabajamos con location.search
const params = new URLSearchParams(location.search);

// La siguiente función crea la tarjeta de detalles del evento en la página corrrespondiente.
(function createDetailsCard() {
  data.events.map(item => {
    item._id == params.get("id") &&
      document.getElementById("detailsContainer").insertAdjacentHTML(
        "afterbegin",
        `<div class="card">
          <div class="card-body container-fluid">
            <div class="row w-100 m-0 d-flex flex-column flex-wrap flex-sm-row">
              <figure class="col col-sm-12 col-md-6 col-lg-8 m-0">
                <img src="${item.image}" alt="${item.category}" class="card-img object-fit-cover h-100">
              </figure>
              <div class="col col-sm-12 col-md-6 col-lg-4">
                <h2 class="card-title fs-4 text-center mt-2 mt-sm-0">${item.name}</h2>
                <p class="card-text">Date: ${item.date}</p>
                <p class="card-text">Description: ${item.description}</p>
                <p class="card-text">Category: ${item.category}</p>
                <p class="card-text">Place: ${item.place}</p>
                <p class="card-text">Capacity: ${item.capacity}</p>
                <p class="card-text">Assistance or Estimate: ${item.assistance ? item.assistance : item.estimate}</p>
                <p class="card-text">Price: ${item.price}</p>
              </div>
            </div>
          </div>
        </div>`
      );
    }
  )
})();

// --> fin del script
