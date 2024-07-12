URL_BACKEND_STATIC = 'https://fchavez03.pythonanywhere.com/static/img/';

const novedades = document.getElementById('grid-novedades');

const inicarNovedades = () => {
    // Cargamos los productos de nuestra "Base" 
    getProductosDestacados()
        .then(data => {
            let productosTodos =  [...data.productos];
            const fragment = document.createDocumentFragment();
            productosTodos.forEach( p => {
                let producto = crearProductoGrid(p);
                fragment.append(producto);
            });
            novedades.append(fragment);
        })
        .catch(error => {
            console.error('Ocurrió un error al obtener los datos:', error);
        });
}


const crearProductoGrid = (producto) => {
    /*  Creamos el elemento Producto que se va a mostrar en el grid.
        El resultado es el siguiente:
        <div class="producto shadow rounded">
            <a href="producto?id=#">
                <img src="imagen.jpg" alt="...">
            </a>
            <p>Fjallraven - Foldsack No. 1</p>
            <samll>$109.95</samll>
        </div>
    */
    const div = document.createElement('DIV');
    const img = document.createElement('IMG');
    const p = document.createElement('P');
    const small = document.createElement('SMALL');
    const enlace = document.createElement('A');

    img.setAttribute('src', `${URL_BACKEND_STATIC}${producto.img}`);
    img.setAttribute('alt', `img-${producto.titulo}`);
    enlace.setAttribute('href', `producto.html?id=${producto.id}`);
    enlace.append(img);
    
    p.textContent = producto.titulo;
    small.textContent = `$${producto.precio}`;

    div.classList = 'producto shadow rounded';
    div.append(enlace);
    div.append(p);
    div.append(small);
    
    return div;
}


inicarNovedades();