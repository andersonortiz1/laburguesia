
// guarda un valor en CARRITO_KEY
const CARRITO_KEY = "carrito";



// define la función formatoPrecioCarrito
function formatoPrecioCarrito(valor) {
  // devuelve el resultado
  return "$" + valor.toFixed(2);
}



// define la función obtenerCarrito
function obtenerCarrito() {
  try {
    // lee dato del navegador
    return JSON.parse(localStorage.getItem(CARRITO_KEY)) || [];
  } catch (e) {
    // devuelve el resultado
    return [];
  }
}

// define la función guardarCarrito
function guardarCarrito(carrito) {
  // guarda dato en el navegador
  localStorage.setItem(CARRITO_KEY, JSON.stringify(carrito));
  actualizarContadorCarrito();
}


// define la función actualizarContadorCarrito
function actualizarContadorCarrito() {
  // guarda un valor en carrito
  const carrito = obtenerCarrito();
  const totalItems = carrito.reduce((suma, item) => suma + item.cantidad, 0);
  document.querySelectorAll("#contadorCarrito").forEach((badge) => {
    // cambia el texto mostrado
    badge.textContent = totalItems;
    badge.style.display = totalItems > 0 ? "flex" : "none";
  });
} 



// define la función extraerPersonalizacion
function extraerPersonalizacion(boton) {
  // guarda un valor en resultado
  const resultado = { quitados: [], agregados: [] };
  if (!boton) return resultado;

  // guarda un valor en seccionProducto
  const seccionProducto = boton.closest(".producto");
  if (!seccionProducto) return resultado;

  // guarda un valor en ingredientes
  const ingredientes = seccionProducto.querySelector(".ingredientes");
  if (!ingredientes) return resultado;

  ingredientes
    .querySelectorAll(".columna:not(.agregar) input[type='checkbox']:checked")
    .forEach((input) => {
      // guarda un valor en label
      const label = input.closest("label");
      if (label) resultado.quitados.push(label.textContent.trim());
    });

  ingredientes
    .querySelectorAll(".columna.agregar input[type='checkbox']:checked")
    .forEach((input) => {
      const label = input.closest("label");
      if (!label) return;
      const span = label.querySelector("span");
      const precioExtra = span
        ? parseFloat(span.textContent.replace(/[^0-9.]/g, "")) || 0
        : 0;
      const nombreExtra = label.textContent
        .replace(span ? span.textContent : "", "")
        .trim();
      resultado.agregados.push({ nombre: nombreExtra, precio: precioExtra });
    });

  // devuelve el resultado
  return resultado;
}


// define la función mismaPersonalizacion
function mismaPersonalizacion(item, nueva) {
  // guarda un valor en q1
  const q1 = [...(item.quitados || [])].sort().join(",");
  const q2 = [...nueva.quitados].sort().join(",");
  const a1 = (item.agregados || []).map((a) => a.nombre).sort().join(",");
  const a2 = nueva.agregados.map((a) => a.nombre).sort().join(",");
  return q1 === q2 && a1 === a2;
}

// define la función agregarAlCarrito
function agregarAlCarrito(idProducto, boton) {

  // revisa una condición
  if (typeof estaAutenticado === "function" && !estaAutenticado()) {
    pedirInicioSesion();
    return;
  }

  // guarda un valor en producto
  const producto = PRODUCTOS.find((p) => p.id === idProducto);
  if (!producto) return;

  const { quitados, agregados } = extraerPersonalizacion(boton);
  const extraPorUnidad = agregados.reduce((suma, a) => suma + a.precio, 0);
  const precioUnitario = producto.precio + extraPorUnidad;

  const carrito = obtenerCarrito();
  const existente = carrito.find(
    (item) =>
      item.id === idProducto && mismaPersonalizacion(item, { quitados, agregados })
  );

  // revisa una condición
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: precioUnitario,
      imagen: producto.imagen,
      cantidad: 1,
      quitados,
      agregados,
    });
  }

  guardarCarrito(carrito);
  renderCarritoPagina();


  // revisa una condición
  if (boton) {
    // guarda un valor en textoOriginal
    const textoOriginal = boton.textContent;
    boton.textContent = "Agregado ✓";
    boton.disabled = true;
    setTimeout(() => {
      // cambia el texto mostrado
      boton.textContent = textoOriginal;
      boton.disabled = false;
    }, 900);
  }
}



// define la función cambiarCantidad
function cambiarCantidad(index, delta) {
  const carrito = obtenerCarrito();
  if (!carrito[index]) return;

  carrito[index].cantidad += delta;
  const carritoFinal = carrito.filter((i) => i.cantidad > 0);

  guardarCarrito(carritoFinal);
  renderCarritoPagina();
}

// define la función eliminarDelCarrito
function eliminarDelCarrito(index) {
  const carrito = obtenerCarrito();
  carrito.splice(index, 1);
  guardarCarrito(carrito);
  renderCarritoPagina();
}

// define la función vaciarCarrito
function vaciarCarrito() {
  guardarCarrito([]);
  renderCarritoPagina();
}

// define la función calcularTotal
function calcularTotal(carrito) {
  // devuelve el resultado
  return carrito.reduce((suma, item) => suma + item.precio * item.cantidad, 0);
}



// define la función renderCarritoPagina
function renderCarritoPagina() {
  // guarda un valor en contenedor
  const contenedor = document.getElementById("listaCarrito");
  const totalEl = document.getElementById("totalCarrito");
  if (!contenedor) return;

  const carrito = obtenerCarrito();

  // revisa una condición
  if (carrito.length === 0) {
    // cambia el contenido html
    contenedor.innerHTML = `<div class="carrito-vacio">Tu carrito está vacío.</div>`;
  } else {
    // cambia el contenido html
    contenedor.innerHTML = carrito
      .map((item, index) => {
        // guarda un valor en notaQuitados
        const notaQuitados =
          item.quitados && item.quitados.length
            ? `<p class="item-nota item-nota-quitar">Sin: ${item.quitados.join(", ")}</p>`
            : "";

        // guarda un valor en notaAgregados
        const notaAgregados =
          item.agregados && item.agregados.length
            ? `<p class="item-nota item-nota-agregar">Extra: ${item.agregados
                .map((a) => `${a.nombre} (+${formatoPrecioCarrito(a.precio)})`)
                .join(", ")}</p>`
            : "";

        // devuelve el resultado
        return `
      <div class="item-carrito">
        <img src="${item.imagen}" alt="${item.nombre}">
        <div class="item-info">
          <p class="item-nombre">${item.nombre}</p>
          <p class="item-precio">${formatoPrecioCarrito(item.precio)}</p>
          ${notaQuitados}
          ${notaAgregados}
          <div class="item-cantidad">
            <button type="button" onclick="cambiarCantidad(${index}, -1)">-</button>
            <span>${item.cantidad}</span>
            <button type="button" onclick="cambiarCantidad(${index}, 1)">+</button>
          </div>
        </div>
        <button type="button" class="item-eliminar" onclick="eliminarDelCarrito(${index})">✕</button>
      </div>
    `;
      })
      .join("");
  }

  // revisa una condición
  if (totalEl) totalEl.textContent = formatoPrecioCarrito(calcularTotal(carrito));
}


// define la función irAPagar
function irAPagar() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) return; 
  window.location.href = "Pago.html";
}

// define la función finalizarCompra
function finalizarCompra() {
  const carrito = obtenerCarrito();
  if (carrito.length === 0) return; 

  mostrarMensajeExito();
  vaciarCarrito();
}

// define la función mostrarMensajeExito
function mostrarMensajeExito() {
  // Evita duplicados si se hace doble click
  if (document.querySelector(".overlay-exito")) return;

  // guarda un valor en overlay
  const overlay = document.createElement("div");
  overlay.className = "overlay-exito";
  overlay.innerHTML = `
    <div class="modal-exito">
      <div class="icono-exito">✓</div>
      <h3>¡Compra realizada con éxito!</h3>
      <p>Gracias por tu pedido.</p>
      <button type="button" class="btn-cerrar-exito">Aceptar</button>
    </div>
  `;
  document.body.appendChild(overlay);

  // guarda un valor en cerrar
  const cerrar = () => overlay.remove();
  overlay.querySelector(".btn-cerrar-exito").addEventListener("click", cerrar);
  overlay.addEventListener("click", (e) => {
    // revisa una condición
    if (e.target === overlay) cerrar();
  });
}



// se ejecuta al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  actualizarContadorCarrito();
  renderCarritoPagina();

  // guarda un valor en botonPagar
  const botonPagar = document.getElementById("btnPagarCarrito");
  if (botonPagar) {
    // escucha el evento click
    botonPagar.addEventListener("click", irAPagar);
  }
});
