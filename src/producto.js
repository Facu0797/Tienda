const producto = document.querySelector("#producto");
const productoImagen =  producto.querySelector(".producto__imagen");
const thumbs = producto.querySelector(".producto__thumbs")
const thumbsImg = producto.querySelectorAll('.producto__thumb-img');

// Color
const propiedadColor = producto.querySelector("#propiedad-color");

// botones de catidad
const btnIncrementarCantidad = producto.querySelector("#incrementar-cantidad");
const btnDisminuirCantidad = producto.querySelector("#disminuir-cantidad");
const cantidad = producto.querySelector("#cantidad");

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
    })
})


propiedadColor.addEventListener("click", (e) => {
    if (e.target.tagName === "INPUT") {

        productoImagen.src = `
            ./img/tennis/${e.target.value}.jpg       
        `;
    };
} )


btnIncrementarCantidad.addEventListener("click", () => {
    cantidad.value = parseInt(cantidad.value) + 1
})


btnDisminuirCantidad.addEventListener("click", () => {
    if (cantidad.value >= 2){
        cantidad.value = parseInt(cantidad.value) - 1
    }
    
})