URL_BACKEND_STATIC = 'http://127.0.0.1:5000/static/img/';
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
    getProductoById(id)
        .then(data => {
            let producto = [data.producto][0];

            /* Colocamos la imagen */
            productoIMG.setAttribute('src', `${URL_BACKEND_STATIC}${producto.img}`);
            /* Colocamos el titulo */
            productoTitulo.textContent = producto.titulo;
            /* Colocamos el precio */
            productoPrecio.textContent = `$${producto.precio}`;
            /* Cargamos los colores disponibles */
            let colores = producto.colores.split(',');
            cargarSelects('color', colores);
            /* Cargamos los talles disponibles */
            let talles = producto.talles.split(',');
            cargarSelects('talle', talles);
            /* Colocamos la descripcion */
            productoDescripcion.textContent = producto.descripcion;
        })
        .catch(error => {
            console.error('Ocurrió un error al obtener los datos:', error);
        });
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