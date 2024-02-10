'use strict';

const producto$1 = document.querySelector("#producto");
const productoImagen =  producto$1.querySelector(".producto__imagen");
producto$1.querySelector(".producto__thumbs");
const thumbsImg = producto$1.querySelectorAll('.producto__thumb-img');

// Color
const propiedadColor = producto$1.querySelector("#propiedad-color");

// botones de catidad
const btnIncrementarCantidad = producto$1.querySelector("#incrementar-cantidad");
const btnDisminuirCantidad = producto$1.querySelector("#disminuir-cantidad");
const cantidad = producto$1.querySelector("#cantidad");

thumbsImg.forEach((imagen) => {
    imagen.addEventListener("click", (e) => {
        // Obtenemos la ruta de la imagen pequeña en una cadena de texto
        const rutaImagen = e.target.src;

        //Obtenemos la posicion del ultimo /
        const lastIndex = rutaImagen.lastIndexOf("/");

        // Cortamos la cadena de teto para obtener la ultima parte 
        const nombreImagen = rutaImagen.substring(lastIndex + 1);

        // Cambiamos la ruta de la imagen del producto dinamicamente
        productoImagen.src = `
            ./img/tennis/${nombreImagen}
        `;
    });
});


propiedadColor.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT") {

        productoImagen.src = `
            ./img/tennis/${e.target.value}.jpg       
        `;
    }} );


btnIncrementarCantidad.addEventListener("click", () => {
    cantidad.value = parseInt(cantidad.value) + 1;
});


btnDisminuirCantidad.addEventListener("click", () => {
    if (cantidad.value >= 2){
        cantidad.value = parseInt(cantidad.value) - 1;
    }
    
});

var data = {
    productos: [
        {
            id: "1",
            nombre: "Tennis Converse Standar",
            descripcion: "Lorem ipsum dolor sit amen",
            precio: "500",
            colores: ["negro", "rojo", "amarillo"],
            tamaños: ["37", "38", "39", "40", "41", "42", "43", "44"],
        },
        {
            id: "2",
            nombre: "Tennis Converse 2000",
            descripcion: "Lorem ipsum dolor sit amen",
            precio: "450",
            colores: ["negro", "rojo", "amarillo"],
            tamaños: ["37", "38", "39", "40", "41", "42", "43", "44"],
        },
    ]
};

const btnAbrirCarrito = document.querySelectorAll('[data-accion="abrir-carrito"]');
const btnCerrarCarrito = document.querySelectorAll('[data-accion="cerrar-carrito"]');
const ventanaCarrito = document.querySelector("#carrito");
const btnAgregarAlCarrito = document.querySelector("#agregar-al-carrito");
const producto = document.querySelector("#producto");
let carrito = [];
const formatearMoneda = new Intl.NumberFormat("fr-FR", {style: "currency", currency: "EUR"});

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
                    productoCarrito.precio = productoBaseDatos.precio;

                    total += productoBaseDatos.precio * productoCarrito.cantidad;
                }
            });

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
            
        });
    }

    ventanaCarrito.querySelector(".carrito__total").innerText = formatearMoneda.format(total);

};

    // abrir carrito
btnAbrirCarrito.forEach((boton) => {
    boton.addEventListener("click", () => {

        renderCarrito();
    });
});

    // Cerrar Carrito
btnCerrarCarrito.forEach((boton) => {
    boton.addEventListener("click", () => {
        ventanaCarrito.classList.remove("carrito--active");
    });
});

btnAgregarAlCarrito.addEventListener("click", (e) => {

    const id = producto.dataset.productoId;
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
        });

        // Si el producto no se encuentra en el carrito entonces lo empujamos directamente
        if (! productoEnCarrito) {

            carrito.push({
                id: id,
                nombre: nombre,
                cantidad: cantidad,
                color: color,
                tamaño: tamaño,
                });
        }

    } else {

        // Igual aqui, se empuja porque no habia ningun item en el carrito
        carrito.push({
        id: id,
        nombre: nombre,
        cantidad: cantidad,
        color: color,
        tamaño: tamaño,
        });

    }
    
});

// Botones ELIMINAR DEL CARRITO 

ventanaCarrito.addEventListener("click", (e) => {
    if (e.target.closest("button")?.dataset.accion === "eliminar-item-carrito") {

        const producto = e.target.closest(".carrito__producto");
        const indexProducto = [...ventanaCarrito.querySelectorAll(".carrito__producto")].indexOf(producto);
        
        carrito = carrito.filter((index, item) => {
            if (index !== indexProducto) {
                return item;
            }
        });

        renderCarrito();
    }
});

class Tabs {
	constructor(idElemento) {
		this.tabs = document.getElementById(idElemento);
		this.nav = this.tabs.querySelector('.tabs');

		this.nav.addEventListener('click', (e) => {
			e.preventDefault();

			// Comprobamos que el elemento que clickeamos tenga la clase de tabs__link.
			if ([...e.target.classList].includes('tabs__button')) {
				// Obtenemos la tab que queremos mostrar.
				const tab = e.target.dataset.tab;

				// Quitamos la clase active de alguna otras tabs que la tengan.
				if (this.tabs.querySelector('.tab--active')) {
					this.tabs.querySelector('.tab--active').classList.remove('tab--active');
				}

				// Quitamos la clase active del boton.
				if (this.tabs.querySelector('.tabs__button--active')) {
					this.tabs.querySelector('.tabs__button--active').classList.remove('tabs__button--active');
				}

				// Agregamos la clase active al tab.
				this.tabs.querySelector(`#${tab}`).classList.add('tab--active');

				// Agregamos la clase active al boton.
				e.target.classList.add('tabs__button--active');
			}
		});
	}
}

new Tabs("mas-informacion");
