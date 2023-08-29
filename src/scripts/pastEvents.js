function createCardsAtPastEvents() {
  for (let event of data.events) {
    if (event.date < data.currentDate) {
      document.getElementById('pastEventsContainer').insertAdjacentHTML(
        'beforeend',
        `<div class="col-12 col-sm-6 col-md-4 col-lg-3 my-2">
          <div class="card" style="min-height: 25rem" id=${event._id}>
            <img src=${event.image} alt=${event.category} class="card-img-top object-fit-cover" style="height: 10rem;">
            <div class="card-body d-flex flex-column align-items-stretch justify-content-between">
              <h2 class="card-title fs-4 text-center">${event.name}</h2>
              <p class="card-text">${event.description}</p>
              <div class="d-flex flex-wrap align-items-center justify-content-between gap-2">
                <span class="card-text">Price: ${event.price}</span>
                <a href="../pages/details.html" class="btn btn-outline-danger px-4">Details</a>
              </div>
            </div>
          </div>
        </div>`
      );
    }
  }
}

createCardsAtPastEvents();