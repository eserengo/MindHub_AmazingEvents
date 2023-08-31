function createDetailsCard() {
  for (let event of data.events) {
    if (event._id == sessionStorage.getItem("details")) {
      document.getElementById("detailsContainer").insertAdjacentHTML(
        "afterbegin",
        `<div class="card">
          <div class="card-body container-fluid">
            <div class="row w-100 m-0 d-flex flex-column flex-wrap flex-sm-row">
              <figure class="col col-sm-12 col-md-6 col-lg-8 m-0">
                <img src="${event.image}" alt="${event.category}" class="card-img object-fit-cover h-100">
              </figure>
              <div class="col col-sm-12 col-md-6 col-lg-4">
                <h2 class="card-title fs-4 text-center mt-2 mt-sm-0">${event.name}</h2>
                <p class="card-text">Date: ${event.date}</p>
                <p class="card-text">Description: ${event.description}</p>
                <p class="card-text">Category: ${event.category}</p>
                <p class="card-text">Place: ${event.place}</p>
                <p class="card-text">Capacity: ${event.capacity}</p>
                <p class="card-text">Assistance or Estimate: ${event.assistance ? event.assistance : event.estimate}</p>
                <p class="card-text">Price: ${event.price}</p>
              </div>
            </div>
          </div>
        </div>`
      );
    }
  }
}

createDetailsCard();