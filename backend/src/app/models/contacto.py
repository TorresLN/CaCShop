
def recibir_contacto(conexion, request):
    nombre = request.form['name']
    telefono = request.form['phone']
    email = request.form['email']
    mensaje = request.form['message']
    
    cursor = conexion.connection.cursor()
    cursor.execute("INSERT INTO contactos (nombre, telefono, email, mensaje) VALUES (%s, %s, %s, %s)", 
                    (nombre, telefono, email, mensaje))
    conexion.connection.commit()

def buscar_comentarios(conexion):
    cursor = conexion.connection.cursor()
    sql = 'SELECT * from contactos'
    cursor.execute(sql)
    return cursor.fetchall()