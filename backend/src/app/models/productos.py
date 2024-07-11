import os, time
from werkzeug.utils import secure_filename
from config import config

config = config['development']
os.makedirs(config.static_folder, exist_ok=True)
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'webp', 'image/webp'}

def get_productos(conexion, destacados):
    cursor = conexion.connection.cursor()
    sql = 'SELECT * from productos'
    if destacados:
        sql += f' WhERE destacado = {True}'
    cursor.execute(sql)
    return cursor.fetchall()

def get_producto(conexion, id):
    cursor = conexion.connection.cursor()
    sql = f'SELECT * from productos WHERE id = {id}'
    cursor.execute(sql)
    return cursor.fetchone()


def create_producto(conexion, request):
    titulo = request.form.get('titulo')
    precio = request.form.get('precio')
    descripcion = request.form.get('descripcion')
    talles = request.form.get('talles')
    colores = request.form.get('colores')
    destacado = False#request.form.get('destacado')

    img = request.files['imagen']
    nombre_imagen = guardar_imagen(img)
    if not nombre_imagen:
        raise Exception("Error al guardar la imagen")
    
    cursor = conexion.connection.cursor()
    sql = f'''INSERT INTO productos 
                  (titulo, img, precio, descripcion, talles, colores, destacado) 
              VALUES 
                  ("{titulo}", "{nombre_imagen}",{precio}, "{descripcion}","{talles}","{colores}",{int(destacado)})
            '''
    cursor.execute(sql)
    conexion.connection.commit()
     
def delete_producto(conexion, id):
    cursor = conexion.connection.cursor()
    sql = f'DELETE FROM productos WHERE id = {id}'
    cursor.execute(sql)
    conexion.connection.commit()

def update_producto(conexion, request, id):
    titulo = request.form.get('titulo')
    precio = request.form.get('precio')
    descripcion = request.form.get('descripcion')
    talles = request.form.get('talles')
    colores = request.form.get('colores')
    destacado = False#request.form.get('destacado')

    img_sentence = ''
    img = request.files['imagen']
    if img:
        nombre_imagen = guardar_imagen(img)
        img_sentence = f'img = "{nombre_imagen}",'
        if not nombre_imagen:
            raise Exception("Error al guardar la imagen")
    
    cursor = conexion.connection.cursor()
    sql = f'''UPDATE productos SET
                titulo = "{titulo}", {img_sentence}
                precio = {precio}, descripcion = "{descripcion}",
                talles = "{talles}", colores = "{colores}",
                destacado = {destacado} 
            WHERE id = {id}
            '''
    cursor.execute(sql)
    conexion.connection.commit()

def destacar_producto(conexion, request, id):
    destacado  = request.get_json().get('destacado')
    print(f'Request {destacado}')
    cursor = conexion.connection.cursor()
    sql = f'''UPDATE productos SET
                destacado = {destacado} 
            WHERE id = {id}
            '''
    print(f'SQL: {sql}')
    cursor.execute(sql)
    conexion.connection.commit()
# Funciones de ayuda
def guardar_imagen(imagen):
    # Genero el nombre de la imagen
    nombre_imagen = secure_filename(imagen.filename)
    nombre_base, extension = os.path.splitext(nombre_imagen)
    nombre_imagen = f"{nombre_base}_{int(time.time())}{extension}"

    try:
        if extencion_soportada(imagen.filename):
            print('Extensión soportada')
            # Definir la ruta del directorio donde se guardarán las imágenes
            upload_folder = os.path.join(os.getcwd(), 'static/imagenes')
            if not os.path.exists(upload_folder):
                os.makedirs(upload_folder)
                
            # Guardar la imagen
            imagen.save(os.path.join(upload_folder, nombre_imagen))
            return nombre_imagen
        else:
            return None
    except Exception as e:
        print(f'Error guardando la imagen: {e}')
        return None
    

def extencion_soportada(filename):
    if not filename:
        return False
    extencion = filename.rsplit('.', 1)[1].lower()
    return '.' in filename and extencion in ALLOWED_EXTENSIONS
