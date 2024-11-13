const API_BASE_URL = 'https://japceibal.github.io/japflix_api/movies-data.json';
const inputBuscar = document.getElementById("inputBuscar");
const btnBuscar = document.getElementById("btnBuscar");
const lista = document.getElementById("lista");

// Cargar los datos de la API
let moviesData = [];

fetch(API_BASE_URL)
    .then(response => response.json())
    .then(data => {
        moviesData = data;
        console.log("Datos cargados:", moviesData);
    })
    .catch(error => console.error("Error al cargar los datos:", error));

// Función para crear las estrellas
function createStars(vote) {
    const stars = Math.round(vote / 2);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}

// Función para mostrar los datos
function showData(dataArray) {
    lista.innerHTML = ''; // Limpiar lista antes de agregar nuevos elementos
    dataArray.forEach(movie => {
        const listMovie = document.createElement('li');
        listMovie.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
        
        listMovie.innerHTML = `
            <div class="ms-2 me-auto">
                <div class="fw-bold">${movie.title}</div>
                ${movie.tagline ? movie.tagline : ""}
            </div>
            <span class="badge bg-primary rounded-pill">${createStars(movie.vote_average)}</span>
        `;
        
        lista.appendChild(listMovie);
    });
}

// Función de búsqueda activada por el botón
btnBuscar.addEventListener("click", () => {
    const query = inputBuscar.value.trim().toLowerCase();

    if (!query) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No has escrito nada en la búsqueda!",
        });
        return;
    }

    // Filtrar películas que coincidan con el texto ingresado
    const filteredMovies = moviesData.filter(movie => 
        movie.title.toLowerCase().includes(query) ||
        movie.genres.some(genre => genre.name.toLowerCase().includes(query)) ||
        (movie.tagline && movie.tagline.toLowerCase().includes(query)) ||
        (movie.overview && movie.overview.toLowerCase().includes(query))
      );
      

    // Mostrar los resultados de la búsqueda
    if (filteredMovies.length > 0) {
        showData(filteredMovies);
    } else {
        lista.innerHTML = "<p>No se encontraron coincidencias.</p>";
    }
});


// Elementos de referencia
const offcanvasTitle = document.getElementById("offcanvasTopLabel");
const overview = document.getElementById("overview");
const genres = document.getElementById("genres");
const year = document.getElementById("year");
const runtime = document.getElementById("runtime");
const budget = document.getElementById("budget");
const revenue = document.getElementById("revenue");

function showMovieDetails(movie) {
    offcanvasTitle.textContent = movie.title;
    overview.textContent = movie.overview || "Sin descripción disponible.";
    
    genres.innerHTML = movie.genres.map(genre => `<li>${genre.name}</li>`).join("");
    
    // Rellenar los detalles adicionales en el dropdown
    year.textContent = new Date(movie.release_date).getFullYear() || "N/A";
    runtime.textContent = movie.runtime || "N/A";
    budget.textContent = movie.budget ? movie.budget.toLocaleString() : "N/A";
    revenue.textContent = movie.revenue ? movie.revenue.toLocaleString() : "N/A";
    
    const offcanvas = new bootstrap.Offcanvas(document.getElementById('offcanvasTop'));
    offcanvas.show();
}


function showData(dataArray) {
    lista.innerHTML = ''; // Limpiar lista antes de agregar nuevos elementos
    dataArray.forEach(movie => {
        const listMovie = document.createElement('li');
        listMovie.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start');
        
        listMovie.innerHTML = `
            <div class="ms-2 me-auto">
                <div class="fw-bold">${movie.title}</div>
                ${movie.tagline ? movie.tagline : ""}
            </div>
            <span class="badge bg-primary rounded-pill">${createStars(movie.vote_average)}</span>
        `;

        // Evento de clic para mostrar los detalles de la película
        listMovie.addEventListener("click", () => showMovieDetails(movie));

        lista.appendChild(listMovie);
    });
}

/*
// Función para mostrar el offcanvas con los detalles de la película
function showMovieInfo(movie) {
  // Configurar el contenido del Offcanvas
  offcanvasTitle.innerHTML = movie.title;
  
  // Descripción y géneros de la película
  offcanvasBody.innerHTML = `
    <p><strong>Overview:</strong> ${movie.overview}</p>
    <ul><strong>Genres:</strong>
      ${movie.genres.map(genre => `<li>${genre.name}</li>`).join("")}
    </ul>
  `;

  // Detalles adicionales en el dropdown
  dropdownMenu.innerHTML = `
    <li><strong>Año:</strong> ${new Date(movie.release_date).getFullYear()}</li>
    <li><strong>Duración:</strong> ${movie.runtime} minutos</li>
    <li><strong>Presupuesto:</strong> $${movie.budget.toLocaleString()}</li>
    <li><strong>Ganancias:</strong> $${movie.revenue.toLocaleString()}</li>
  `;

  // Mostrar el offcanvas
  const offcanvas = new bootstrap.Offcanvas(offcanvasElement);
  offcanvas.show();
}

// Añadir el evento de clic en cada elemento de película
function addMovieClickEvents() {
  const movieItems = document.querySelectorAll(".list-group-item");
  movieItems.forEach((item, index) => {
    item.addEventListener("click", () => {
      const movie = moviesData[index]; // Asegúrate de que moviesData esté disponible aquí
      showMovieInfo(movie);
    });
  });
}

// Llamar a addMovieClickEvents después de que se carguen las películas
btnBuscar.addEventListener("click", () => {
  // Código de búsqueda aquí (ya implementado)
  
  // Llamar a addMovieClickEvents después de mostrar la lista de películas
  addMovieClickEvents();
});
*/


/*
function buscarPeliculas() {
    const query = inputBuscar.value.trim().toLowerCase();

    if (!query) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No has escrito nada en la búsqueda!",
        });
        return;
    }

    // Filtrar películas según el criterio de búsqueda
    const filteredMovies = moviesData.filter(movie => {
        return movie.title.toLowerCase().includes(query) ||
            movie.genres.some(genre => genre.toLowerCase().includes(query)) ||
            (movie.tagline && movie.tagline.toLowerCase().includes(query)) ||
            (movie.overview && movie.overview.toLowerCase().includes(query));
    });

    // Limpiar el contenido previo del listado
    lista.innerHTML = "";

    // Mostrar resultados o mensaje de "sin coincidencias"
    if (filteredMovies.length > 0) {
        filteredMovies.forEach(movie => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start");

            listItem.innerHTML = `
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${movie.title}</div>
                    ${movie.tagline ? movie.tagline : ""}
                </div>
                <span class="badge bg-primary rounded-pill">${createStars(movie.vote_average)}</span>
            `;

            lista.appendChild(listItem);
        });
    } else {
        lista.innerHTML = "<p>No se encontraron coincidencias.</p>";
    }
}

// Registrar el evento de clic en el botón de búsqueda
btnBuscar.addEventListener("click", buscarPeliculas);
*/


/*
// Cargar los datos de la API
fetch(API_BASE_URL)
    .then(response => response.json())
    .then(data => {
        moviesData = data;
        console.log("Datos cargados:", moviesData);
    })
    .catch(error => console.error("Error al cargar los datos:", error));

// Función para crear las estrellas
function createStars(vote) {
    const stars = Math.round(vote / 2);
    return '★'.repeat(stars) + '☆'.repeat(5 - stars);
}


function showData(dataArray){
lista.innerHTML = ' ';
dataArray.forEach(movie => {
    const listMovie = document.createElement('li');
    listMovie.textContent = '${movie.title}';
    listMovie.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-start')
    lista.appendChild(listMovie);
});
}

btnBuscar.addEventListener("click", showData);*/

/*
// Función para buscar y mostrar resultados
function buscarPeliculas() {
    const query = inputBuscar.value.trim().toLowerCase();

    if (!query) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No has escrito nada en la búsqueda!",
        });
        return;
    }

    // Filtrar películas según el criterio de búsqueda
    const filteredMovies = moviesData.filter(movie => {
        return movie.title.toLowerCase().includes(query) ||
            movie.genres.some(genre => genre.toLowerCase().includes(query)) ||
            (movie.tagline && movie.tagline.toLowerCase().includes(query)) ||
            (movie.overview && movie.overview.toLowerCase().includes(query));
    });

    // Limpiar el contenido previo del listado
    lista.innerHTML = "";

    // Mostrar resultados o mensaje de "sin coincidencias"
    if (filteredMovies.length > 0) {
        filteredMovies.forEach(movie => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-group-item", "d-flex", "justify-content-between", "align-items-start");

            listItem.innerHTML = `
                <div class="ms-2 me-auto">
                    <div class="fw-bold">${movie.title}</div>
                    ${movie.tagline ? movie.tagline : ""}
                </div>
                <span class="badge bg-primary rounded-pill">${createStars(movie.vote_average)}</span>
            `;

            lista.appendChild(listItem);
        });
    } else {
        lista.innerHTML = "<p>No se encontraron coincidencias.</p>";
    }
}

// Registrar el evento de clic en el botón de búsqueda
btnBuscar.addEventListener("click", buscarPeliculas);
*/


/*
<ol class="list-group list-group-numbered">
  <li class="list-group-item d-flex justify-content-between align-items-start">
    <div class="ms-2 me-auto">
      <div class="fw-bold">${movie.title}</div>
      ${movie.tagline}
    </div>
    <span class="badge bg-primary rounded-pill">createStars(vote)</span>
  </li>
</ol>

<button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">Toggle top offcanvas</button>

<div class="offcanvas offcanvas-top" tabindex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
  <div class="offcanvas-header">
    <h5 id="offcanvasTopLabel">${movie.title}</h5>
    <p><strong>Overview:</strong> ${movie.overview}</p>
    <ul><strong>Genres:</strong>
      ${movie.genres.map(genre => `<li>${genre.name}</li>`).join("")}
    </ul>
    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div class="offcanvas-body">
    ...
  </div>
  <div class="dropdown mt-3">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown">
        Dropdown button
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
      <li><strong>Año:</strong> ${new Date(movie.release_date).getFullYear()}</li>
    <li><strong>Duración:</strong> ${movie.runtime} minutos</li>
    <li><strong>Presupuesto:</strong> $${movie.budget.toLocaleString()}</li>
    <li><strong>Ganancias:</strong> $${movie.revenue.toLocaleString()}</li>
      </ul>
    </div>
</div>
*/
