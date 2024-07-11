const PRODUCTOS_API_URL = "http://127.0.0.1:5000/productos";

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

const getProductosDestacados = async () =>{
    return fetch(`${PRODUCTOS_API_URL}?destacados=${true}`) 
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


const getProductoById = (id) => {
    return fetch(`${PRODUCTOS_API_URL}/${id}`) 
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
}
