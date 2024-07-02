const PRODUCTOS_API_URL = "./assets/js/api.json";

const getProductosAll = async () =>{
    return fetch(PRODUCTOS_API_URL) 
    .then(response => {
        if(response.ok){
            return response.json();
        }else {
            Promise.reject(response);
        }
    })
    .catch((error)=>{
        console.error('Error al cargar los datos:', error)
    })
};



/* Consultas  */
const getProductoById = (id, productos) => {
    return productos.filter(producto => producto.id == id)[0];
}

const getProductosNovedades = (productos) => {
    return productos.filter(producto => producto.destacado);
}