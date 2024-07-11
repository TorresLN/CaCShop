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

const URL = "http://127.0.0.1:5000/"

const formulario = document.getElementById('formulario');

formulario.addEventListener('submit', function (event) {
  event.preventDefault(); // Evitamos que se envie el form 

  var formData = new FormData(formulario);

  fetch(
    `${URL}productos`,
    {
      method: formulario.method,
      body: formData
    }
  )
  .then((response) => {
      if (response.ok) {
        window.location.replace('/frontend/intranet/admin.html?error=false');
      } else {
        window.location.replace('/frontend/intranet/admin.html?error=true');
        throw new Error('Error al agregar el producto.');
      }
  })
  .catch(function (error) {
      console.error('Error al agregar el producto.' + error);
  })
})
