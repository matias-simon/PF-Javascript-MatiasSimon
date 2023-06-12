// obtengo el espacio para mostrar mis cards gtr y bajo
const gtr = document.getElementById("gtr-cards");
const bajo = document.getElementById("bajo-cards");

// aca se van a almacenar mis productos comprados
let compra = [];

// accedo al area donde se van a mostrar los productos comprados
const carrito = document.getElementById("carrito");
// Espacio a mostrar el costo total
const valorTotal = document.getElementById("carritoTotal");

const cant = document.getElementById("cant");

const crearInstrumentos = (array) => {
  for (const Producto of array) {
    if (Producto.tipo == "guitarra") {
      let contenedor = document.createElement("div");
      contenedor.className = "col";
      contenedor.innerHTML = `
            <div class="card card-guitarra mb-4 ">
            <img class=" card-img-top gtr-img"src="${Producto.img}" alt="..."/>
            <div class="card-body">
              <h5 class="card-title">${Producto.marca} ${Producto.modelo}</h5>
              <h6 class="card-title">$${Producto.precio}</h6>
              <p class="card-text">${Producto.descripcion}</p>
              <button id="botonAgregar${Producto.id}"type="button" class="btn btn-dark">Agregar al Carrito</button>
            </div>
      </div>`;
      gtr.appendChild(contenedor);
    } else {
      let contenedor = document.createElement("div");
      contenedor.className = "col";
      contenedor.innerHTML = `<div class="card card-bajo mb-4 ">
            <img class=" card-img-top bajo-img"src="${Producto.img}" alt="..."/>
            <div class="card-body">
              <h5 class="card-title">${Producto.marca} ${Producto.modelo}</h5>
              <h6 class="card-title">$${Producto.precio}</h6>
              <p class="card-text">${Producto.descripcion}</p>
              <button id="botonAgregar${Producto.id}"type="button" class="btn btn-outline-light">Agregar al Carrito</button>
            </div>
      </div>`;

      bajo.appendChild(contenedor);
    }
    let botonAgregar = document.getElementById(`botonAgregar${Producto.id}`);
    botonAgregar.addEventListener("click", () => {
      agregarCarrito(Producto.id);
    });
  }
};
crearInstrumentos(instrumentos);

const agregarCarrito = (id, showToast = true) => {
  let agregar = compra.find((item) => item.id == id);

  if (agregar) {
    agregar.cantidad++;
    document.getElementById(
      `cantidad${agregar.id}`
    ).innerHTML = `<p id=cantidad${agregar.id}> Cantidad : ${agregar.cantidad}</p>`;
    actualizarCarrito();
  } else {
    let productoAgregar = instrumentos.find((elemento) => elemento.id == id);
    compra.push(productoAgregar);
    actualizarCarrito();

    let div = document.createElement("div");
    div.className = "producto";

    div.innerHTML = `
        <div class="card-carrito card container-carrito p-3 m-3">
          <h5>${productoAgregar.marca} ${productoAgregar.modelo}</h5>
          <img class="img-carrito" src="${productoAgregar.img}" alt="">
          <div>
            <span id=cantidad${productoAgregar.id}>Cantidad: ${productoAgregar.cantidad}</span>
          </div>
          <p>Precio: $ ${productoAgregar.precio}</p>
          <button id="eliminar${productoAgregar.id}" class="btn-carrito btn btn-dark">Eliminar</button>
        </div>`;

    carrito.appendChild(div);

    let eliminar = document.getElementById(`eliminar${productoAgregar.id}`);
    eliminar.addEventListener("click", () => {
      eliminar.parentElement.remove();
      compra = compra.filter((elemento) => elemento.id != productoAgregar.id);
      actualizarCarrito();
      localStorage.setItem("compraProducto", JSON.stringify(compra));
      Toastify({
        text: `Producto eliminado: ${productoAgregar.marca} ${productoAgregar.modelo}`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #cf1717, #3c3c3c)",
        },
        onClick: function () {},
      }).showToast();
    });

    if (showToast) {
      Toastify({
        text: `Producto agregado: ${productoAgregar.marca} ${productoAgregar.modelo}`,
        duration: 3000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: true,
        gravity: "top",
        position: "center",
        stopOnFocus: true,
        style: {
          background: "linear-gradient(to right, #44a842, #3c3c3c)",
        },
        onClick: function () {},
      }).showToast();
    }
  }

  localStorage.setItem("compraProducto", JSON.stringify(compra));
};

const actualizarCarrito = () => {
  valorTotal.innerText =
    "$" + compra.reduce((acc, el) => acc + el.precio * el.cantidad, 0);
  cant.innerHTML = compra.reduce((acc, el) => acc + el.cantidad, 0);
};

const salvar = () => {
  let salvarStorage = JSON.parse(localStorage.getItem("compraProducto"));

  if (salvarStorage) {
    salvarStorage.forEach((element) => {
      agregarCarrito(element.id, false);
    });
  }
};

const pagar = document.getElementById("btn-pagar");
pagar.addEventListener("click", () => {
  if (compra.length === 0) {
    Toastify({
      text: "No hay nada en el carrito!",
      duration: 3000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "center", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #121212, #3c3c3c)",
      },
      onClick: function () {},
    }).showToast();
  } else {
    const billingModal = new bootstrap.Modal(
      document.getElementById("billingModal")
    );

    const sendButton = document.getElementById("saveBillingDetails");
    sendButton.addEventListener("click", () => {
      const nameInput = document.getElementById("name");
      const addressInput = document.getElementById("address");

      if (nameInput.value.trim() === "" || addressInput.value.trim() === "") {
        Toastify({
          text: "Por favor, completa todos los campos.",
          duration: 3000,
          destination: "https://github.com/apvarun/toastify-js",
          newWindow: true,
          close: true,
          gravity: "top", // `top` or `bottom`
          position: "center", // `left`, `center` or `right`
          stopOnFocus: true, // Prevents dismissing of toast on hover
          style: {
            background: "linear-gradient(to right, #121212, #3c3c3c)",
          },
          onClick: function () {},
        }).showToast();
        return;
      }else{
      carrito.innerHTML = "";
      compra = [];
      actualizarCarrito();
      localStorage.removeItem("compraProducto");
      
      billingModal.hide();
      
  }});
    billingModal.show();
  }
  
});

salvar();


// APIs

const api = document.querySelector("#api")

const getCharacters = async () => {
  const response = await axios("https://rickandmortyapi.com/api/character");
  const characters = response.data.results;

  characters.forEach((character) => {
    const div = document.createElement("div");
    div.innerHTML = `
    <div class="card mb-4">
    <img class= "card-img-top" src="${character.image}" />
    <div class="card-body">
    <h5 class="card-title">${character.name}</h5>
      <h6 class="card title">${character.gender}</h6>
      <p class="card-text">${character.status}</p>
      <hr />
    </div>
    </div>
    `;

    api.append(div);
  });
};

getCharacters();
