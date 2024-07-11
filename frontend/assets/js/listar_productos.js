const main = document.getElementById('main');

const inicarPanel = () => {
    // Cargamos los productos de nuestra "Base" 
    getProductosAll()
        .then(data => {
            let productosTodos =  [...data.productos];
            agregarProductos(productosTodos)
        })
        .catch(error => {
            console.error('Ocurrió un error al obtener los datos:', error);
        });
}

const agregarProductos = (data) => {
    const fragment = document.createDocumentFragment();

    for (const producto of data) {
        const item = document.createElement('DIV');
        let colorDestacado = producto.destacado ? '#ffc107' : 'grey';
        item.innerHTML = `
            <div class="bg-light border rounded" style="max-height: 200px; max-width: 700px; margin: 1rem auto;">
                <div class="row p-2">
                    <div class="col col-sm-4 text-center">
                        <img src="http://127.0.0.1:5000/static/img/${producto.img}" alt="IMG-Producto-${producto.id}" height="120px">
                    </div>
                    <div class="col col-sm-8">
                        <div class="row">
                            <h1 class="titulo-producto">${producto.titulo}</h1>
                            <p class="multiline-ellipsis">${producto.descripcion}</p>
                            <p class="mb-1"><small>$${producto.precio}</small></p>
                            <div style="text-align: right; padding-right: 100px;">
                                <a href="editar_producto.html?id=${producto.id}" class="btn btn-outline-primary">Editar</a>
                                <button class="btn btn-outline-secondary" data-destacar="prod-${producto.id}" data-destacado="${producto.destacado}">
                                    <i class="bi bi-star" style="color: ${colorDestacado}; font-size: 14px;"></i>
                                    Destacado
                                </button>
                                <button class="btn btn-outline-danger" data-eliminar="prod-${producto.id}">Borrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        fragment.append(item);
    }
    main.append(fragment);
}


inicarPanel()

main.addEventListener('click', (e) => {
    if(e.target.dataset.eliminar){
        let id = e.target.dataset.eliminar;
        id = id.split('-')[1];
        eliminarProducto(id);
    }else if (e.target.dataset.destacar){
        let id = e.target.dataset.destacar;
        id = id.split('-')[1];
        let destacado = e.target.dataset.destacado;
        productoDestacado(id, e.target, parseInt(destacado));
    }
})

const productoDestacado = (id, button, destacado) => {
    console.log('destacado', destacado)
    fetch(`${PRODUCTOS_API_URL}/${id}`,{
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ destacado: !destacado })
    })
    .then(response => {
        console.log(response)
        if(response.ok){
            color = !destacado ? '#ffc107' : 'grey';
            button.firstElementChild.style.color = color;
            button.dataset.destacado = destacado ? '0' : '1';
        }else {
            Promise.reject(response);
        }
    })
    .catch((error)=>{
        console.error('Error al cargar los datos:', error)
    })
}

const eliminarProducto = (id) => {
    fetch(`${PRODUCTOS_API_URL}/eliminar/${id}`,{
        method: 'DELETE',
    })
    .then(response => {
        if(response.ok){
            window.location.reload();
        }else {
            Promise.reject(response);
        }
    })
    .catch((error)=>{
        console.error('Error al cargar los datos:', error)
    })
}