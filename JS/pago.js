

// define la función renderResumenPago
function renderResumenPago() {
  // guarda un valor en contenedorForm
  const contenedorForm = document.getElementById("formPago");
  const contenedorVacio = document.getElementById("pagoVacio");
  const resumenItems = document.getElementById("resumenItems");
  const resumenTotal = document.getElementById("resumenTotal");

  // revisa una condición
  if (!contenedorForm) return; 

  // guarda un valor en carrito
  const carrito = obtenerCarrito();

  // revisa una condición
  if (carrito.length === 0) {
    // muestra u oculta el elemento
    contenedorForm.style.display = "none";
    if (contenedorVacio) contenedorVacio.style.display = "block";
    return;
  }

  // revisa una condición
  if (contenedorVacio) contenedorVacio.style.display = "none";
  contenedorForm.style.display = "";

  // cambia el contenido html
  resumenItems.innerHTML = carrito
    .map(
      (item) => `
      <div class="pago-resumen-linea">
        <span class="nombre">${item.cantidad} × ${item.nombre}</span>
        <span>${formatoPrecioCarrito(item.precio * item.cantidad)}</span>
      </div>
    `
    )
    .join("");

  // cambia el texto mostrado
  resumenTotal.textContent = formatoPrecioCarrito(calcularTotal(carrito));
}



// define la función validarFormularioPago
function validarFormularioPago(datos) {
  // revisa una condición
  if (!datos.nombreEnvio) {
    // devuelve el resultado
    return "Ingresa tu nombre completo.";
  }

  // revisa una condición
  if (!datos.direccionEnvio) {
    // devuelve el resultado
    return "Ingresa tu dirección.";
  }

  // revisa una condición
  if (!datos.telefonoEnvio) {
    // devuelve el resultado
    return "Ingresa un número de teléfono.";
  }

  // revisa una condición
  if (!datos.numeroDocumento || datos.numeroDocumento.trim().length < 4) {
    // devuelve el resultado
    return "Ingresa un número de documento de identidad válido.";
  }

  // devuelve el resultado
  return null; 
}



// define la función inicializarFormularioPago
function inicializarFormularioPago() {
  // guarda un valor en formulario
  const formulario = document.getElementById("formPago");
  if (!formulario) return;

  // guarda un valor en errorEl
  const errorEl = document.getElementById("errorPago");

  // escucha el evento submit
  formulario.addEventListener("submit", (e) => {
    // evita la acción por defecto
    e.preventDefault();


    // inicia objeto de datos
    const datos = {
      nombreEnvio: document.getElementById("nombreEnvio").value.trim(),
      direccionEnvio: document.getElementById("direccionEnvio").value.trim(),
      telefonoEnvio: document.getElementById("telefonoEnvio").value.trim(),
      numeroDocumento: document.getElementById("numeroDocumento").value.trim(),
    };

    // guarda un valor en error
    const error = validarFormularioPago(datos);

    // revisa una condición
    if (error) {
      // revisa una condición
      if (errorEl) {
        // cambia el texto mostrado
        errorEl.textContent = error;
        errorEl.style.display = "block";
      }
      return;
    }

    // revisa una condición
    if (errorEl) errorEl.style.display = "none";


    finalizarCompra();
    renderResumenPago();


    // guarda un valor en botonAceptar
    const botonAceptar = document.querySelector(".btn-cerrar-exito");
    if (botonAceptar) {
      // escucha el evento click
      botonAceptar.addEventListener("click", () => {
        // cambia de página
        window.location.href = "../index.html";
      });
    }


    formulario.reset();
  });
}



// se ejecuta al cargar la página
document.addEventListener("DOMContentLoaded", () => {
  renderResumenPago();
  inicializarFormularioPago();
});
