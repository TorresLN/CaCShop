const carritoBtn = document.getElementById('carritoBtn');
const carritoBtnCerrar = document.getElementById('carritoBtnCerrar');
const carritoBackground = document.getElementsByClassName('modal-carrito-background')[0];
const carritoBody = document.getElementsByClassName('modal-carrito-body')[0];
const carritoContenido = document.getElementById('carrito-main');
const carritoVacio = document.getElementById('carrito-vacio');
const carritoTotal = document.getElementById('carrito-total');

let productos = [];
let productosDelCarrito = [];
let carritoIniciado = false;
const inicar = () => {
    // Cargamos los productos de nuestra "Base" 
    getProductosAll()
        .then(data => {
            productos =  [...data];
        })
        .catch(error => {
            console.error('Ocurrió un error al obtener los datos:', error);
        });

    // Iniciamos el carrito con los datos del LocalStorage
    if (!carritoIniciado){
        inicarCarrito();
        carritoIniciado = true;
    }
}


const inicarCarrito = () => {
    // Busco los datos del localStorage
    if(localStorage.getItem('carrito')){
        let total = 0;
        // Renderizo cada uno de los productos
        const carrito = JSON.parse(localStorage.getItem('carrito'));
        carrito.forEach(prod => {
            total +=prod.precio * prod.cantidad;
            renderizarCarrito(prod, false, false, total);
        });
    }
}

carritoBtn.addEventListener('click', (e) => {
    abrirCerrarModal(e.target);
})

carritoBtnCerrar.addEventListener('click', (e) => {
    abrirCerrarModal(e.target);
})

carritoBackground.addEventListener('click', (e) => {
    abrirCerrarModal(e.target);
})

const abrirCerrarModal = (target) =>{
    if(target === carritoBackground || target === carritoBtnCerrar){
        carritoBody.classList.remove('modal-mostrar');
        carritoBackground.classList.remove('modal-mostrar');
    } else {
        carritoBody.classList.add('modal-mostrar');
        carritoBackground.classList.add('modal-mostrar');
    }
}

const agregarAlCarrito = (id) => {

    // Obtengo el producto de la "Base de Datos"
    let producto = getProductoById(id, productos);
    let productoExiste = false;
    // Obtengo el carrito del LocalStorage o un arreglo vacio
    let productosDelCarrito = localStorage.getItem('carrito') ? JSON.parse(localStorage.getItem('carrito')) : [];
    // Busco el producto en el carrito
    let prod = productosDelCarrito.find(p => p.id === id);
    // Se actualiza el producto si existiera o se guarda el nuevo producto
    if (prod){
        productoExiste = true;
        prod.cantidad ++;
        producto = prod;
    }else{
        producto['cantidad'] = 1;
        productosDelCarrito.push(producto);
    }
    // Busco el valor total del carrito
    let total = localStorage.getItem('carrito-total') ? JSON.parse(localStorage.getItem('carrito-total')) : 0;
    total += producto.precio;
    // Guardo el producto en el localstoraje
    localStorage.setItem('carrito',JSON.stringify(productosDelCarrito));
    localStorage.setItem('carrito-total',total);
    // Renderizo el carrito en la pagina
    renderizarCarrito(producto, productoExiste, false, total);
}

const quitarDelCarrito = (id, eliminar) => {
    let borrar = false;
    // Obtengo el carrito del LocalStorage
    let productosDelCarrito = JSON.parse(localStorage.getItem('carrito'));
    // Busco el producto en el carrito
    let producto = productosDelCarrito.find(p => p.id === id);
    // Guarado la cantiad anterior para borrar en caso de eliminarlo
    let cantiadAnterior = producto.cantidad;
    // Si hay que eliminarlo, seteamos la cantidad en 0 para que sea borrado
    producto.cantidad = eliminar ? 0 : producto.cantidad -1;
    // Se actualiza el producto, y si la cantidad es 0 se saca del listado
    if (producto.cantidad === 0){
        let indice = productosDelCarrito.indexOf(producto);
        productosDelCarrito.splice(indice, 1);
        borrar = true;
    }
    // Busco el valor total del carrito
    let total = localStorage.getItem('carrito-total') ? JSON.parse(localStorage.getItem('carrito-total')) : 0;
    total -= eliminar ? producto.precio * cantiadAnterior : producto.precio;
    // Guardo el listado en el localstoraje
    localStorage.setItem('carrito',JSON.stringify(productosDelCarrito));
    localStorage.setItem('carrito-total',total);
    // Renderizo el carrito en la pagina
    renderizarCarrito(producto, true, borrar, total);
}


const renderizarCarrito = (producto, existe, borrar, total) =>{
    // Actualizamos el precio del total del carrito
    if(total){
        carritoTotal.textContent = `$${total.toLocaleString('es-AR')}`;
        // Quitamos el texto por defecto cuando no hay productos
        document.getElementsByClassName('carrito-total')[0].style.display = 'block';
        carritoVacio.style.display = 'none';
    }else {
        carritoTotal.textContent = '';
        // Mostramos el texto por defecto cuando no hay productos
        carritoVacio.style.display = 'inline';
        document.getElementsByClassName('carrito-total')[0].style.display = 'none';
    }
    // Validamos si hay que borrar el producto de la vista
    if(borrar){
        const productoBorrado = document.getElementById(`carrito-${producto.id}-id`);
        carritoContenido.removeChild(productoBorrado);
        return;
    }
    if(existe){
        // Aumentamos la cantidad de un producto existente
        const cantidadProducuto = document.getElementById(`carrito-${producto.id}-cantidad`);
        cantidadProducuto.textContent = producto.cantidad;
    } else {
        // Creamos un nuevo producto y lo agregamos a la vista
        const nuevoProducto = crearProducto(producto);
        carritoContenido.insertBefore(nuevoProducto, carritoContenido.firstChild);
    }
}

carritoContenido.addEventListener('click', (e) =>{
    let target = e.target;
    /* Evento de Sumar y disminuir cantidad o eliminar del carrito*/
    if(target.dataset.id){
        if(target.textContent === '+'){
            agregarAlCarrito(parseInt(target.dataset.id));
        }else if(target.textContent === '-'){
            quitarDelCarrito(parseInt(target.dataset.id), eliminar = false);
        }else{
            quitarDelCarrito(parseInt(target.dataset.id), eliminar = true);
        }
    }
})

const crearProducto = (producto) => {
    /* Crea un elemento Carrito con los sigueintes componentes:
        <div class="producto-carrito">
            <img src="assets/img/remera_1.webp" alt="img">
            <div class="descripcion-carrito">
                <p>Nombre del producto</p>
                <p>Precio</p>
            </div>
            <div class="carrito-opciones">
                <i class="fa-solid fa-trash" title="QUitar producto"></i>
                <div class="contador-carrito">
                    <span class="contador">-</span><span>1</span><span class="contador">+</span>
                </div>
            </div>
        </div> 
    */
    const productoCarrito = document.createElement('DIV');
    const imgCarrito = document.createElement('IMG');
    const descripcionCarrito = document.createElement('DIV');
    const nombreProducto = document.createElement('P');
    const precioProducto = document.createElement('P');
    const opcionesCarrito = document.createElement('DIV');
    const borrarProducto = document.createElement('I');
    const contadorProducto = document.createElement('DIV');
    const contadorMasProducto = document.createElement('SPAN');
    const contadorMenosProducto = document.createElement('SPAN');
    const cantidadProducto = document.createElement('SPAN');
    
    productoCarrito.className = 'producto-carrito';
    productoCarrito.id = `carrito-${producto.id}-id`;
    imgCarrito.setAttribute('src', producto.img);
    imgCarrito.setAttribute('alt', `Imagen- ${producto.titulo}`);
    descripcionCarrito.className = 'descripcion-carrito';
    nombreProducto.textContent = producto.titulo;
    precioProducto.textContent = `$${producto.precio.toLocaleString('es-AR')}`;
    opcionesCarrito.className = 'carrito-opciones';
    borrarProducto.className = 'bi bi-trash';
    borrarProducto.setAttribute('title', 'Quitar producto');
    borrarProducto.setAttribute('data-id',producto.id);
    contadorProducto.className = 'contador-carrito';
    contadorMasProducto.textContent = '+';
    contadorMasProducto.setAttribute('data-id',producto.id);
    contadorMasProducto.className = 'contador';
    contadorMenosProducto.textContent = '-';
    contadorMenosProducto.setAttribute('data-id',producto.id);
    contadorMenosProducto.className = 'contador';
    cantidadProducto.textContent = producto.cantidad;
    cantidadProducto.id = `carrito-${producto.id}-cantidad`;

    contadorProducto.append(contadorMenosProducto, cantidadProducto, contadorMasProducto);
    opcionesCarrito.append(borrarProducto, contadorProducto);
    descripcionCarrito.append(nombreProducto, precioProducto);
    productoCarrito.append(imgCarrito, descripcionCarrito, opcionesCarrito);
    return productoCarrito;
}

inicar();