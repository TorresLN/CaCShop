/* Obtencion del parametro de URL */
let producto = null;
const url =  new URL(window.location);
const parametro = new URLSearchParams(url.search);
let id = parametro.get('id');

const productoIMG = document.getElementById('img-producto');
const productoTitulo = document.getElementById('producto-titulo');
const productoPrecio = document.getElementById('producto-precio');
const btnAgregar = document.getElementById('btn-agregar');
const productoDescripcion = document.getElementById('producto-descripcion');

const inicarProducto = (id) => {
    // Cargamos los productos de nuestra "Base" 
    getProductosAll()
        .then(data => {
            let productosAll =  [...data];
            let producto = getProductoById(id, productosAll);
            /* Colocamos la imagen */
            productoIMG.setAttribute('src', producto.img);
            /* Colocamos el titulo */
            productoTitulo.textContent = producto.titulo;
            /* Colocamos el precio */
            productoPrecio.textContent = `$${producto.precio}`;
            /* Cargamos los colores disponibles */
            cargarSelects('color', producto.colores);
            /* Cargamos los talles disponibles */
            cargarSelects('talle', producto.talles);
            /* Colocamos la descripcion */
            productoDescripcion.textContent = producto.descripcion;
        })
        .catch(error => {
            console.error('Ocurrió un error al obtener los datos:', error);
        });
        
        // Iniciamos el carrito con los datos del LocalStorage
    inicarCarrito();
}

const cargarSelects = (id, opciones) => {
    const select = document.getElementById(id);
    const fragment = document.createDocumentFragment();
    opciones.forEach(opcion => {
        const op = document.createElement('option');
        op.value = opcion;
        op.textContent = opcion;
        fragment.append(op);
    });
    select.append(fragment);
}

btnAgregar.addEventListener('click', (e) => {
    e.preventDefault();
    agregarAlCarrito(parseInt(id));
})

inicarProducto(id);