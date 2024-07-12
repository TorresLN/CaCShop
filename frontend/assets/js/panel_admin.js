const main = document.getElementById('main');

const inicarPanel = () => {
    // Cargamos los productos de nuestra "Base" 
    getProductosDestacados()
        .then(data => {
            let productosTodos =  [...data.productos];
            agregarProductos(productosTodos);
        })
        .catch(error => {
            console.error('Ocurrió un error al obtener los datos:', error);
        });
}

const agregarProductos = (data) => {
    const fragment = document.createDocumentFragment();

    for (const producto of data) {
        if(producto.destacado){
            const item = document.createElement('DIV');
            item.innerHTML = `
                <div class="bg-light border rounded" style="max-height: 200px; max-width: 700px; margin: 1rem auto;" id="contenedor">
                    <div class="row p-2">
                        <div class="col col-sm-4 text-center">
                            <img src="https://fchavez03.pythonanywhere.com/static/img/${producto.img}" alt="IMG-Producto-${producto.id}" height="120px">
                        </div>
                        <div class="col col-sm-8">
                            <div class="row">
                                <h1 class="titulo-producto">${producto.titulo}</h1>
                                <p class="multiline-ellipsis">${producto.descripcion}</p>
                                <p class="mb-1"><small>$${producto.precio}</small></p>
                                <div style="text-align: right; padding-right: 100px;">
                                    <a href="editar_producto.html?id=${producto.id}" class="btn btn-outline-primary">Editar</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            fragment.append(item);
        }
    }
    main.append(fragment);
}

inicarPanel()

const url =  new URL(window.location);
const parametro = new URLSearchParams(url.search);
let error = parametro.get('error');

const mensajeExito = document.getElementById('mensaje-exito');
const mensajeError = document.getElementById('mensaje-error');

if(error == 'true'){
    mensajeError.classList.add('show');
}else if(error == 'false'){
    mensajeExito.classList.add('show');
}