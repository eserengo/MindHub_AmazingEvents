// --> comienzo del script

import data from "./fetchData.js";

if (data.events) {

  // Esta función filtra los eventos de data y devuelve una nueva array con los eventos pasados solamente.
  function pastEventsArray() {
    return data.events.filter(item => item.date <= data.currentDate);
  }

  // Esta función filtra los eventos de data y devuelve una nueva array con los eventos por venir solamente.
  function upcomingEventsArray() {
    return data.events.filter(item => item.date > data.currentDate);
  }

  // Esta funcion devuelve un array de objetos que sirve como entrada para generar la segunda y la tercera tabla.
  function setTableInput(inputArray) {
    const outputArray = [];

    // Crea una nueva array con las categorias sin repetir.
    const categories = Array.from(new Set(inputArray.map(item => item.category)));

    // Bucle sobre las categorias.
    categories.map(item => {

      // Devuelve los eventos filtrados por categorias.
      const sortByCategory = inputArray.filter(event => event.category == item);

      // Reduce las ganancias por categoria de evento a un valor.
      const revenuesPerCategory = sortByCategory
        .reduce(
          (acc, event) => acc + event.price * (event.assistance ? event.assistance : event.estimate), 0
      );

      // Reduce el porcentaje de asistencia por categoria de evento a un valor.
      const percentageOfAssistance = (sortByCategory
        .reduce(
          (acc, event) => acc + ((event.assistance ? event.assistance : event.estimate) / event.capacity) * 100, 0
        ) / sortByCategory.length)
        .toFixed(2);
      
      // Popula la array de salida con objetos que contienen los datos correspondientes.
      outputArray.push({
        event: item,
        revenues: revenuesPerCategory,
        percentage: percentageOfAssistance,
      });
    })

    return outputArray;
  }

  // Esta funcion crea la primera tabla de forma dinamica.
  function createFirstTable() {

    // Esta funcion devuelve el nombre y el porcentaje de asistencia del evento con el mayor porcentaje de asistentes.
    const highestPercentageOfAssistance = () => {
      const percentage = (inputItem) => ((parseInt(inputItem.assistance) * 100) / parseInt(inputItem.capacity)).toFixed(2);
      let highestValue = 0;
      let highestName = "";

      pastEventsArray()
        .map(item => {
          if (percentage(item) > highestValue) {
            highestValue = percentage(item);
            highestName = item.name;
          }
        });

      return `${highestName}: ${highestValue}%`;
    }

    // Esta funcion devuelve el nombre y el porcentaje de asistencia del evento con el menor porcentaje de asistentes.
    const lowestPercentageOfAssistance = () => {
      const percentage = (inputItem) => ((parseInt(inputItem.assistance) * 100) / parseInt(inputItem.capacity)).toFixed(2);
      let lowestValue = 100;
      let lowestName = "";

      pastEventsArray()
        .map(item => {
          if (percentage(item) < lowestValue) {
            lowestValue = percentage(item);
            lowestName = item.name;
          }
        });

      return `${lowestName}: ${lowestValue}%`;
    }

    // Esta funcion devuelve el nombre y capacidad del evento con mayor capacidad.
    const eventWithLargestCapacity = () => {
      let largestValue = 0;
      let largestName = "";

      data.events
        .map(item => {
          if (item.capacity > largestValue) {
            largestValue = item.capacity;
            largestName = item.name;
          }
        });

      return `${largestName}: ${largestValue.toLocaleString()}`;
    }

    // Se crea la tabla
    document.getElementById("tablesContainer").insertAdjacentHTML(
      "beforeend",
      `<div class="row w-100">
        <div class="col table-responsive">
          <table class="table table-bordered shadow-sm">
            <thead>
              <tr class="table-secondary">
                <th colspan="3" scope="row">Event Statistics</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="col-4">Event with highest % of assistance</td>
                <td class="col-4">Event with lowest % of assistance</td>
                <td class="col-4">Event with largest capacity</td>
              </tr>
              <tr>
                <td class="text-secondary">${highestPercentageOfAssistance()}</td>
                <td class="text-secondary">${lowestPercentageOfAssistance()}</td>
                <td class="text-secondary">${eventWithLargestCapacity()}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`
    );
  }

  // Esta funcion crea la segunda tabla de forma dinamica.
  function createSecondTable() {
    document.getElementById("tablesContainer").insertAdjacentHTML(
      "beforeend",
      `<div class="row w-100">
        <div class="col table-responsive">
          <table class="table table-bordered shadow-sm">
            <thead>
              <tr class="table-secondary">
                <th colspan="3" scope="row">Past Events statistics by category</th>
              </tr>
            </thead>
            <tbody id="secondTableBody">
              <tr>
                <td class="col-4">Categories</td>
                <td class="col-4">Revenues</td>
                <td class="col-4">Percentage of assistance</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`
    );

    // Bucle que devuelve los datos de las categorias de los eventos pasados en forma de tabla.
    setTableInput(pastEventsArray())
      .map(object => {
        document.getElementById("secondTableBody").insertAdjacentHTML(
          "beforeend",
          `<tr>
            <td>${object.event}</td>
            <td>$ ${object.revenues.toLocaleString()}</td>
            <td>${object.percentage} %</td>
          </tr>`
        )
      });
  }

  // Esta funcion crea la tercera tabla de forma dinamica.
  function createThirdTable() {
    document.getElementById("tablesContainer").insertAdjacentHTML(
      "beforeend",
      `<div class="row w-100">
        <div class="col table-responsive">
          <table class="table table-bordered shadow-sm">
            <thead>
              <tr class="table-secondary">
                <th colspan="3" scope="row">Upcoming Events statistics by category</th>
              </tr>
            </thead>
            <tbody id="thirdTableBody">
              <tr>
                <td class="col-4">Categories</td>
                <td class="col-4">Revenues (estimated)</td>
                <td class="col-4">Percentage of assistance (estimated)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>`
    );

    // Bucle que devuelve los datos de las categorias de los eventos por venir en forma de tabla.
    setTableInput(upcomingEventsArray())
      .map(object => {
        document.getElementById("thirdTableBody").insertAdjacentHTML(
          "beforeend",
          `<tr>
            <td>${object.event}</td>
            <td>$ ${object.revenues.toLocaleString()}</td>
            <td>${object.percentage} %</td>
          </tr>`
        )
      });
  }

  // Se llaman las funciones que crean las tablas.
  createFirstTable();
  createSecondTable();
  createThirdTable();

// Si hay algun fallo en la peticion a la API, solo se imprime un mensaje.
} else {
  document.getElementById("tablesContainer").insertAdjacentHTML(
    "beforeend",
    `<h2 class="text-center">${Object.keys(data)}: ${Object.values(data)}</h2>`
  )
}

  // --> fin del script
