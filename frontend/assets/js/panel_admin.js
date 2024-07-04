const main = document.getElementById('main');
const productosFav = [
    {
        "id" : 1,
        "titulo" : "Remera 1",
        "img" : "../assets/img/productos/remera_1.webp",
        "precio" : 100,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M", "L"],
        "colores" : ["Negro", "Blanco", "Gris"],
        "destacado" : true
    },
    {
        "id" : 2,
        "titulo" : "Remera 2",
        "img" : "../assets/img/productos/remera_2.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M", "L"],
        "colores" : ["Negro", "Blanco", "Gris"],
        "destacado" : false
    },
    {
        "id" : 3,
        "titulo" : "Remera 3",
        "img" : "../assets/img/productos/remera_3.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M", "L"],
        "colores" : ["Negro", "Blanco", "Gris"],
        "destacado" : true
    },
    {
        "id" : 4,
        "titulo" : "Remera 4",
        "img" : "../assets/img/productos/remera_4.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M", "L"],
        "colores" : ["Negro", "Blanco", "Gris"],
        "destacado" : false
    },
    {
        "id" : 5,
        "titulo" : "Remera 5",
        "img" : "../assets/img/productos/remera_5.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M", "L"],
        "colores" : ["Negro", "Blanco", "Gris"],
        "destacado" : false
    },
    {
        "id" : 6,
        "titulo" : "Remera 6",
        "img" : "../assets/img/productos/remera_6.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M"],
        "colores" : ["Negro", "Blanco", "Gris"],
        "destacado" : true
    },
    {
        "id" : 7,
        "titulo" : "Remera 7",
        "img" : "../assets/img/productos/remera_7.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M", "L"],
        "colores" : ["Negro"],
        "destacado" : false
    },
    {
        "id" : 8,
        "titulo" : "Remera 8",
        "img" : "../assets/img/productos/remera_8.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M"],
        "colores" : ["Negro", "Rojo"],
        "destacado" : true
    },
    {
        "id" : 9,
        "titulo" : "Remera 9",
        "img" : "../assets/img/productos/remera_9.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M", "L", "XL"],
        "colores" : ["Negro", "Blanco", "Gris"],
        "destacado" : false
    },
    {
        "id" : 10,
        "titulo" : "Remera 10",
        "img" : "../assets/img/productos/remera_10.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam a",
        "talles" : ["S", "M", "L"],
        "colores" : ["Blanco", "Gris"],
        "destacado" : false
    },
    {
        "id" : 11,
        "titulo" : "Remera 11",
        "img" : "../assets/img/productos/remera_1.webp",
        "precio" : 100,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M", "L"],
        "colores" : ["Negro", "Blanco", "Gris"],
        "destacado" : true
    },
    {
        "id" : 12,
        "titulo" : "Remera 12",
        "img" : "../assets/img/productos/remera_2.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M", "L"],
        "colores" : ["Negro", "Blanco", "Gris"],
        "destacado" : false
    },
    {
        "id" : 13,
        "titulo" : "Remera 13",
        "img" : "../assets/img/productos/remera_3.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M", "L"],
        "colores" : ["Negro", "Blanco", "Gris"],
        "destacado" : true
    },
    {
        "id" : 14,
        "titulo" : "Remera 14",
        "img" : "../assets/img/productos/remera_4.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M", "L"],
        "colores" : ["Negro", "Blanco", "Gris"],
        "destacado" : false
    },
    {
        "id" : 15,
        "titulo" : "Remera 15",
        "img" : "../assets/img/carrusel/carrusel_1.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M", "L"],
        "colores" : ["Negro", "Blanco", "Gris"],
        "destacado" : false
    },
    {
        "id" : 16,
        "titulo" : "Remera 16",
        "img" : "../assets/img/carrusel/carrusel_2.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M"],
        "colores" : ["Negro", "Blanco", "Gris"],
        "destacado" : true
    },
    {
        "id" : 17,
        "titulo" : "Remera 17",
        "img" : "../assets/img/carrusel/carrusel_3.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M", "L"],
        "colores" : ["Negro"],
        "destacado" : false
    },
    {
        "id" : 18,
        "titulo" : "Remera 18",
        "img" : "../assets/img/carrusel/carrusel_4.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M"],
        "colores" : ["Negro", "Rojo"],
        "destacado" : true
    },
    {
        "id" : 19,
        "titulo" : "Remera 19",
        "img" : "../assets/img/carrusel/carrusel_5.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam ab!",
        "talles" : ["S", "M", "L", "XL"],
        "colores" : ["Negro", "Blanco", "Gris"],
        "destacado" : false
    },
    {
        "id" : 20,
        "titulo" : "Remera 20",
        "img" : "../assets/img/carrusel/carrusel_6.webp",
        "precio" : 200,
        "descripcion" : "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut est tempore corrupti nam totam esse officia. Itaque, quibusdam omnis maxime obcaecati consequatur molestiae consequuntur placeat, praesentium delectus eligendi magnam a",
        "talles" : ["S", "M", "L"],
        "colores" : ["Blanco", "Gris"],
        "destacado" : false
    }
]

const agregarProductos = (data) => {
    const fragment = document.createDocumentFragment();

    for (const producto of data) {
        if(producto.destacado){

            const item = document.createElement('DIV');
            item.innerHTML = `
                <div class="bg-light border rounded" style="max-height: 200px; max-width: 700px; margin: 1rem auto;">
                    <div class="row p-2">
                        <div class="col col-sm-4 text-center">
                            <img src="${producto.img}" alt="IMG-Producto-${producto.id}" height="120px">
                        </div>
                        <div class="col col-sm-8">
                            <div class="row">
                                <h1 class="titulo-producto">${producto.titulo}</h1>
                                <p class="multiline-ellipsis">${producto.descripcion}</p>
                                <p class="mb-1"><small>$${producto.precio}</small></p>
                                <div style="text-align: right; padding-right: 100px;">
                                    <button class="btn btn-outline-primary">Editar</button>
                                    <button class="btn btn-outline-secondary">
                                        <i class="bi bi-star" style="color: #ffc107; font-size: 14px;"></i>
                                        Destacado
                                    </button>
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

agregarProductos(productosFav);