import data from "../src/data/productos";
const btnAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
const btnCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const ventanaCarrito = document.querySelector("#carrito");
const btnAgregarAlCarrito = document.querySelector("#agregar-al-carrito");
const producto = document.querySelector("#producto");
let carrito = [];
const formatearMoneda = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"})

const renderCarrito = () => {
    ventanaCarrito.classList.add("carrito--active");

    // Eliminamos todos los productos anteriores para construir el carrito desde cero
    const productosAnteriores = ventanaCarrito.querySelectorAll(".carrito__producto");
    productosAnteriores.forEach(producto => producto.remove());

    let total = 0;

    // Comprobamos si hay productos
    if (carrito.length < 1) {
        // Ponemos la clase de carrito vacio
        ventanaCarrito.classList.add("carrito--vacio");

    } else {
        ventanaCarrito.classList.remove("carrito--vacio");

        // iteramos sobre cada producto del carrito y lo mostramos 
        carrito.forEach((productoCarrito) => {

            //Obtenemos el precio de productos.js
            data.productos.forEach((productoBaseDatos) => {
                if (productoBaseDatos.id === productoCarrito.id) {
                    productoCarrito.precio = productoBaseDatos.precio

                    total += productoBaseDatos.precio * productoCarrito.cantidad;
                }
            })

            // Establecemos la ruta de la imagen que vamos a querer mostrar
            let thumbRuta = producto.querySelectorAll(".producto__thumb-img")[0].src;
            if(productoCarrito.color === "rojo"){
                thumbRuta = "./img/tennis/rojo.jpg";
            } else if (productoCarrito.color === "amarillo"){
                thumbRuta = "./img/tennis/amarillo.jpg";
            }

            // Creamos un div
            const itemCarrito = document.createElement("div");

            // Le agregamos la clase de carrito__producto
            itemCarrito.classList.add("carrito__producto");

            // Creamos la plantilla del producto
            itemCarrito.innerHTML = `
            <img src="${thumbRuta}" alt="" class="carrito__thumb" />
            <div>
                <p class="carrito__producto-nombre">
                    <span class="carrito__producto-cantidad"> ${productoCarrito.cantidad} x </span>${productoCarrito.nombre}
                </p>
                <p class="carrito__producto-propiedades">
                    Tamaño:<span>${productoCarrito.tamaño}</span> Color:<span>${productoCarrito.color}</span>
                </p>
            </div>
            <div class="carrito__producto-contenedor-precio">
                <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                    >
                        <path
                            d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                        />
                    </svg>
                </button>
                <p class="carrito__producto-precio">${
                    formatearMoneda.format(productoCarrito.precio * productoCarrito.cantidad)
                }</p>
            </div>
            `;

            ventanaCarrito.querySelector(".carrito__body").append(itemCarrito);
            
        })
    }

    ventanaCarrito.querySelector(".carrito__total").innerText = formatearMoneda.format(total);

}

    // abrir carrito
btnAbrirCarrito.forEach((boton) => {
    boton.addEventListener("click", () => {

        renderCarrito()
    })
})

    // Cerrar Carrito
btnCerrarCarrito.forEach((boton) => {
    boton.addEventListener("click", () => {
        ventanaCarrito.classList.remove("carrito--active");
    })
})

btnAgregarAlCarrito.addEventListener("click", (e) => {

    const id = producto.dataset.productoId
    const nombre = producto.querySelector(".producto__nombre").innerText;
    const cantidad = parseInt(producto.querySelector("#cantidad").value);
    const color = producto.querySelector("#propiedad-color input:checked").value;
    const tamaño = producto.querySelector("#propiedad-tamaño input:checked").value;

    // Si hay un producto o mas en el carrito
    if (carrito.length >= 1) {
        let productoEnCarrito = false;
        
        // Iteramos por cada item del carrito y preguntamos si tiene el mismo id, nombre, color y tamaño
        carrito.forEach((item) => {

            if (item.id === id && item.nombre === nombre && item.color === color && item.tamaño === tamaño) {
                // Se le aumenta la cantidad del carrito por la nueva cantidad
                item.cantidad += cantidad;
                productoEnCarrito = true;
            }
        })

        // Si el producto no se encuentra en el carrito entonces lo empujamos directamente
        if (! productoEnCarrito) {

            carrito.push({
                id: id,
                nombre: nombre,
                cantidad: cantidad,
                color: color,
                tamaño: tamaño,
                })
        }

    } else {

        // Igual aqui, se empuja porque no habia ningun item en el carrito
        carrito.push({
        id: id,
        nombre: nombre,
        cantidad: cantidad,
        color: color,
        tamaño: tamaño,
        })

    }
    
})

// Botones ELIMINAR DEL CARRITO 

ventanaCarrito.addEventListener("click", (e) => {
    if (e.target.closest("button")?.dataset.accion === "eliminar-item-carrito") {

        const producto = e.target.closest(".carrito__producto");
        const indexProducto = [...ventanaCarrito.querySelectorAll(".carrito__producto")].indexOf(producto);
        
        carrito = carrito.filter((index, item) => {
            if (index !== indexProducto) {
                return item;
            }
        })

        renderCarrito()
    }
})
