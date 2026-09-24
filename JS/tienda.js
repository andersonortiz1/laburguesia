
// inicia lista de datos
const PRODUCTOS = [
  { id: "postre-1", nombre: "Arroz con leche",                 precio: 2.50, imagen: "../IMG/Png/postre 1.png",  link: "Postre 1.html" },
  { id: "postre-2", nombre: "Cupcake de Frutos Rojos",          precio: 2.75, imagen: "../IMG/Png/postre 2.png",  link: "Postre 2.html" },
  { id: "postre-3", nombre: "Waffle",                           precio: 4.50, imagen: "../IMG/Png/Postre 3.png",  link: "Postre 3.html" },
  { id: "postre-4", nombre: "Brownie Especial",                 precio: 4.00, imagen: "../IMG/Png/Postre 4.png",  link: "Postre 4.html" },
  { id: "postre-5", nombre: "Cheesecake de Frutos Rojos",       precio: 4.25, imagen: "../IMG/Png/Postre 5.png",  link: "Postre 5.html" },
  { id: "postre-6", nombre: "Pastel Cremoso de Chocolate",      precio: 4.00, imagen: "../IMG/Png/Postre 6.png",  link: "Postre 6.html" },
  { id: "postre-7", nombre: "Tiramisú de Chocolate",            precio: 4.25, imagen: "../IMG/Png/Postre 7.png",  link: "Postre 7.html" },
  { id: "postre-8", nombre: "Panna Cotta de Fresa",             precio: 3.50, imagen: "../IMG/Png/Postre 8.png",  link: "Postre 8.html" },

  // ---- Hamburguesas de res ----
  { id: "elbufon",     nombre: "El Bufón",           precio: 8.99, imagen: "../IMG/Png/Res 1.png", link: "elbufon.html" },
  { id: "duquesa",     nombre: "Duquesa",             precio: 9.99, imagen: "../IMG/Png/Res 2.png", link: "duquesa.html" },
  { id: "emperatriz",  nombre: "Emperatriz",          precio: 7.88, imagen: "../IMG/Png/Res 3.png", link: "emperatriz.html" },
  { id: "lacaprichosa",nombre: "La Caprichosa",       precio: 6.99, imagen: "../IMG/Png/Res 4.png", link: "lacaprichosa.html" },

  // ---- Hamburguesas de pollo ----
  { id: "pollo1", nombre: "La Marquesa",              precio: 9.89, imagen: "../IMG/Png/pollo1.png", link: "pollo1.html" },
  { id: "pollo2", nombre: "El Ilustrado Smoky",       precio: 7.75, imagen: "../IMG/Png/pollo3.png", link: "pollo2.html" },
  { id: "pollo3", nombre: "El Conde",                 precio: 8.77, imagen: "../IMG/Png/pollo2.png", link: "pollo3.html" },
  { id: "pollo4", nombre: "La Nueva Duquesa",         precio: 7.88, imagen: "../IMG/Png/pollo4.png", link: "pollo4.html" },

  // ---- Hamburguesas de pescado ----
  { id: "pez1", nombre: "Big Ben",                    precio: 8.99, imagen: "../IMG/Png/pez1.png", link: "pez1.html" },
  { id: "pez2", nombre: "El Vizconde",                precio: 6.50, imagen: "../IMG/Png/pez2.png", link: "pez2.html" },
  { id: "pez3", nombre: "Lord Kensington",            precio: 8.77, imagen: "../IMG/Png/pez3.png", link: "pez3.html" },
  { id: "pez4", nombre: "El Virrey",                  precio: 8.99, imagen: "../IMG/Png/pez4.png", link: "pez4.html" },

  // ---- Combos ----
  { id: "combo-1", nombre: "Combo Clásico",           precio: 7.99,  imagen: "../IMG/Jpg/Combo 1.png", link: "Combo 1.html" },
  { id: "combo-2", nombre: "Combo Triple",            precio: 19.99, imagen: "../IMG/Png/Combo 2.png", link: "Combo 2.html" },
  { id: "combo-3", nombre: "Combo Triple",            precio: 17.99, imagen: "../IMG/Png/Combo 3.png", link: "Combo 3.html" },
  { id: "combo-4", nombre: "Combo Supremo",           precio: 24.99, imagen: "../IMG/Png/Combo 4.png", link: "Combo 4.html" },
  { id: "combo-5", nombre: "La Clásica Crunch",       precio: 9.99,  imagen: "../IMG/Png/Combo 5.png", link: "Combo 5.html" },
  { id: "combo-6", nombre: "Dueto Crispy Chicken",    precio: 7.75,  imagen: "../IMG/Png/Combo 6.png", link: "Combo 6.html" },
  { id: "combo-7", nombre: "Cone Street",             precio: 21.90, imagen: "../IMG/Png/Combo 7.png", link: "Combo 7.html" },
  { id: "combo-8", nombre: "Double Crunch",           precio: 22.00, imagen: "../IMG/Png/Combo 8.png", link: "Combo 8.html" },

  // ---- Banquetes ----
  { id: "banquete-1", nombre: "Gran Gala",             precio: 18.50, imagen: "../IMG/Png/Banquete 1.png", link: "Banquete 1.html" },
  { id: "banquete-2", nombre: "Banquete Imperial",     precio: 15.50, imagen: "../IMG/Png/Banquete 2.png", link: "Banquete 2.html" },
  { id: "banquete-3", nombre: "El Polka",              precio: 19.99, imagen: "../IMG/Png/Banquete 3.png", link: "Banquete 3.html" },
  { id: "banquete-4", nombre: "Combo Supremo (Banquete)", precio: 20.99, imagen: "../IMG/Png/Banquete 4.png", link: "Banquete 4.html" },
];



// define la función quitarAcentos
function quitarAcentos(texto) {
  // devuelve el resultado
  return texto.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

// define la función formatoPrecio
function formatoPrecio(valor) {
  // devuelve el resultado
  return "$" + valor.toFixed(2);
}



// define la función inicializarBuscador
function inicializarBuscador() {
  // guarda un valor en input
  const input = document.getElementById("inputBuscador");
  const lista = document.getElementById("sugerencias");
  const btnBuscar = document.querySelector(".btn-buscar");

  // revisa una condición
  if (!input || !lista) return;

  // define la función buscarCoincidencias
  function buscarCoincidencias(texto) {
    // guarda un valor en consulta
    const consulta = quitarAcentos(texto.trim().toLowerCase());
    if (!consulta) return [];
    return PRODUCTOS.filter((p) =>
      quitarAcentos(p.nombre.toLowerCase()).includes(consulta)
    ).slice(0, 8);
  }

  // define la función resaltar
  function resaltar(nombre, consulta) {
    // guarda un valor en nombreSinAcento
    const nombreSinAcento = quitarAcentos(nombre.toLowerCase());
    const consultaSinAcento = quitarAcentos(consulta.toLowerCase());
    const inicio = nombreSinAcento.indexOf(consultaSinAcento);
    if (inicio === -1) return nombre;
    const fin = inicio + consulta.length;
    return (
      nombre.slice(0, inicio) +
      "<strong>" + nombre.slice(inicio, fin) + "</strong>" +
      nombre.slice(fin)
    );
  }

  // define la función pintarLista
  function pintarLista(resultados, texto) {
    // cambia el contenido html
    lista.innerHTML = "";

    // revisa una condición
    if (resultados.length === 0) {
      // guarda un valor en li
      const li = document.createElement("li");
      li.className = "sugerencia-vacia";
      li.textContent = texto
        ? "Sin resultados para \"" + texto + "\""
        : "No hay productos disponibles";
      lista.appendChild(li);
      return;
    }

    // recorre cada elemento
    resultados.forEach((producto) => {
      const li = document.createElement("li");
      li.className = "sugerencia";
      li.innerHTML = `
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="sugerencia-texto">
          <span>${texto ? resaltar(producto.nombre, texto) : producto.nombre}</span>
          <small>${formatoPrecio(producto.precio)}</small>
        </div>
      `;
      li.addEventListener("click", () => {
        // cambia de página
        window.location.href = producto.link;
      });
      lista.appendChild(li);
    });
  }


  // define la función mostrarSugerencias
  function mostrarSugerencias(texto) {
    // revisa una condición
    if (!texto.trim()) {
      cerrarSugerencias();
      return;
    }
    pintarLista(buscarCoincidencias(texto), texto);
    abrirSugerencias();
  }


  // define la función mostrarTodos
  function mostrarTodos() {
    pintarLista(PRODUCTOS, "");
    abrirSugerencias();
  }

  // define la función abrirSugerencias
  function abrirSugerencias() {
    // agrega una clase
    lista.classList.add("activa");
  }

  // define la función cerrarSugerencias
  function cerrarSugerencias() {
    // quita una clase
    lista.classList.remove("activa");
    lista.innerHTML = "";
  }

  // define la función estaAbierta
  function estaAbierta() {
    // devuelve el resultado
    return lista.classList.contains("activa");
  }

  // escucha el evento input
  input.addEventListener("input", (e) => mostrarSugerencias(e.target.value));

  // escucha el evento focus
  input.addEventListener("focus", (e) => {
    // revisa una condición
    if (e.target.value.trim()) {
      mostrarSugerencias(e.target.value);
    } else {
      mostrarTodos();
    }
  });

  // escucha el evento keydown
  input.addEventListener("keydown", (e) => {
    // revisa una condición
    if (e.key === "Escape") cerrarSugerencias();
    if (e.key === "Enter") {
      // guarda un valor en resultados
      const resultados = buscarCoincidencias(input.value);
      if (resultados.length > 0) window.location.href = resultados[0].link;
    }
  });


  // revisa una condición
  if (btnBuscar) {
    // escucha el evento click
    btnBuscar.addEventListener("click", (e) => {
      // evita la acción por defecto
      e.preventDefault();
      e.stopPropagation();

      // revisa una condición
      if (estaAbierta()) {
        cerrarSugerencias();
        return;
      }

      // revisa una condición
      if (input.value.trim()) {
        mostrarSugerencias(input.value);
      } else {
        mostrarTodos();
      }
      input.focus();
    });
  }


  // escucha el evento click
  document.addEventListener("click", (e) => {
    // guarda un valor en buscador
    const buscador = document.getElementById("buscador");
    if (buscador && !buscador.contains(e.target)) cerrarSugerencias();
  });
}



// se ejecuta al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  inicializarBuscador();
});
