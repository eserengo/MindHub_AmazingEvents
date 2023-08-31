function handleDetailsClick(evt) {
  return sessionStorage.setItem("details", evt.target.dataset.details)
}

function createCategoriesCheckboxes() {
  const categories = new Set(data.events.map(item => item.category));

  for (let category of categories) {
    document.getElementById("pastEventsCategoriesContainer").insertAdjacentHTML(
      "beforeend",
      `<div class="form-check form-check-inline">
        <input type="checkbox" class="form-check-input" id="${category}" value="${category}" role="button">
        <label for="${category}" class="form-check-label">${category}</label>
      </div>`
    );
  }

  document.querySelectorAll(".form-check-input").forEach(item => {
    item.addEventListener("change", (evt) => console.log(evt.target.value));
  })
}

function createEventsCards() {
  let eventsListed = 0;

  for (let event of data.events) {
    if (event.date < data.currentDate) {
      eventsListed++;
      document.getElementById("pastEventsCardsContainer").insertAdjacentHTML(
        "beforeend",
        `<div class="col-12 col-sm-6 col-md-4 col-lg-3 my-2">
          <div class="card" style="min-height: 25rem" id="${event._id}">
            <figure class="m-0">
              <img src="${event.image}" alt="${event.category}" class="card-img-top object-fit-cover" style="height: 10rem;">
            </figure>
            <div class="card-body d-flex flex-column align-items-stretch justify-content-between">
              <h2 class="card-title fs-4 text-center">${event.name}</h2>
              <p class="card-text">${event.description}</p>
              <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
                <span class="card-text">Price: ${event.price}</span>
                <a href="../pages/details.html" class="details-link btn btn-outline-danger px-4" data-details="${event._id}">
                  Details
                </a>
              </div>
            </div>
          </div>
        </div>`
      );
    }
  }
  document.querySelectorAll(".details-link").forEach(item => {
    item.addEventListener("click", (evt) => handleDetailsClick(evt));
  })

  document.querySelector("main").insertAdjacentHTML(
    "beforeend",
    `<p class="m-0 p-2">Total events listed: ${eventsListed}</p>`
  );
}

createCategoriesCheckboxes();
createEventsCards();
