const URL_PATH = "https://fchavez03.pythonanywhere.com/"

let formulario = null;

const main = document.getElementById('main');
const url =  new URL(window.location);
const parametro = new URLSearchParams(url.search);
let id = parametro.get('id');

/* Codigo para el Drag and Drop */
const preventDefaults = event => {
    event.preventDefault();
    event.stopPropagation();
  };
  
  const highlight = event => event.target.classList.add('highlight');
  const unhighlight = event => event.target.classList.remove('highlight');
  
  const getInputAndGalleryRefs = element => {
    const zone = element.closest('.upload_dropZone') || false;
    const gallery = zone.querySelector('.upload_gallery') || false;
    const input = zone.querySelector('input[type="file"]') || false;
    return {input: input, gallery: gallery};
  }
  
  const handleDrop = event => {
    const dataRefs = getInputAndGalleryRefs(event.target);
    if (dataRefs.input) {
      const dt = new DataTransfer();
      for (let i = 0; i < event.dataTransfer.files.length; i++) {
        dt.items.add(event.dataTransfer.files[i]);
      }
      dataRefs.input.files = dt.files;
      previewFiles(dataRefs);
    }
  }
  
  const eventHandlers = zone => {
    const dataRefs = getInputAndGalleryRefs(zone);
  
    if (!dataRefs.input) return;
  
    // Prevent default drag behaviors
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
      zone.addEventListener(event, preventDefaults, false);
      document.body.addEventListener(event, preventDefaults, false);
    });
  
    // Highlighting drop area when item is dragged over it
    ['dragenter', 'dragover'].forEach(event => {
      zone.addEventListener(event, highlight, false);
    });
    ['dragleave', 'drop'].forEach(event => {
      zone.addEventListener(event, unhighlight, false);
    });
  
    // Handle dropped files
    zone.addEventListener('drop', handleDrop, false);
  
    // Handle browse selected files
    dataRefs.input.addEventListener('change', event => {
      dataRefs.files = event.target.files;
      previewFiles(dataRefs);
    }, false);
  }
  
  // Initialise ALL dropzones
  const dropZones = document.querySelectorAll('.upload_dropZone');
  for (const zone of dropZones) {
    eventHandlers(zone);
  }
  
  function previewFiles(dataRefs) {
    if (!dataRefs.gallery) return;
    for (const file of dataRefs.input.files) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onloadend = function() {
        let text = document.createElement('P');
        text.textContent = file.name
        dataRefs.gallery.innerHTML = '';
        dataRefs.gallery.appendChild(text);
      }
    }
  }
/* Fin de Drag and Drop */  

/* Renderizado de la vista */
const inicarVista = () => {
    // Cargamos los productos de nuestra "Base" 
    getProductoById(id)
        .then(data => {
            let producto = [data.producto][0];
            cargarProductos(producto);
        })
        .catch(error => {
            console.error('Ocurrió un error al obtener los datos:', error);
        });
}

const cargarProductos = (producto) => {
    document.getElementById('id_titulo').value = producto.titulo;
    document.getElementById('id_precio').value = producto.precio;
    document.getElementById('id_talles').value = producto.talles;
    document.getElementById('id_colores').value = producto.colores;
    document.getElementById('id_descripcion').textContent = producto.descripcion;
}

formulario = document.getElementById('formulario');
formulario.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitamos que se envie el form 

  var formData = new FormData(formulario);

  fetch(
    `${URL_PATH}productos/${id}`,
    {
      method: 'PUT',
      body: formData
    }
  )
  .then((response) => {
      if (response.ok) {
        window.location.replace('intranet/admin.html?error=false');
      } else {
        window.location.replace('intranet/admin.html?error=true');
        throw new Error('Error al agregar el producto.');
      }
  })
  .catch(function (error) {
      console.error('Error al agregar el producto.' + error);
  })
})

inicarVista();
