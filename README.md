Muchachos estube haciendo algo, poco y nada , ando con algunas cuestiones y no pude abordar bien lo de las "promesas\peticiones" ,
mejorar la API...me atrase pero llegue a mejorar el formulario de contacto para que se aloje en una tabla en la base de datos...
dejo el codigo para que modifiquen porque me genera error el commit auto en git ...

"html contacto modificado"
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Codo Shop</title>

    <link href="https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css">
    <link rel="shortcut icon" href="/assets/img/favicon-32x32.png" type="image/x-icon">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">

    <link rel="stylesheet" href="./assets/css/contacto.css">
    <script src="./assets/js/productos.js"></script>
</head>

<body>

    <form action="http://127.0.0.1:5000/contacto" method="POST">
        <div class="close-btn">&times;</div>
        <h1>CONTACTO</h1>
        <div class="input">
            <label for="name">Nombre</label>
            <input type="text" name="name" id="name" placeholder="Nombre" required>

            <label for="phone">Teléfono</label>
            <input type="tel" name="phone" id="phone" placeholder="Teléfono" required>

            <label for="email">Email</label>
            <input type="email" name="email" id="email" placeholder="Email" required>

            <label for="message">Mensaje</label>
            <textarea name="message" id="message" cols="30" rows="5" placeholder="Mensaje" required></textarea>

            <div class="form-txt">
                <a href="#">Política de privacidad</a>
                <a href="#">Términos y condiciones</a>
            </div> 

            <input class="btn" type="submit" value="Enviar">          
        </div>
    </form>
    
</body>
</html>

---------"css contacto modificado"-----------------------
body {
    font-family: Arial, Helvetica, sans-serif;
    min-height: 100vh;
    display: flex;
    align-items: center; /* Cambiado a center para centrar verticalmente */
    justify-content: center;
    padding: 40px 20px 20px 20px;
    background-color: #0D2B3D;
    margin: 0; /* Asegurarse de que no hay margen predeterminado */
}

form {
    margin-top: 40px;
    position: relative;
    padding: 30px 35px;
    background: linear-gradient(0deg, #0D2B3D, #0C0F44, #2F0C2C, #6F0B3B, #192265);
    box-shadow: 0 0 20px #630e6533;
    border-radius: 15px;
    text-align: center;
    width: 100%;
    max-width: 400px; /* Máximo ancho para pantallas grandes */
    box-sizing: border-box;
}

.close-btn {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 25px;
    color: #fdfffd;
    cursor: pointer;
}

.close-btn:hover {
    color: #5a158c;
}

.input {
    display: flex;
    flex-direction: column;
    text-align: left;
}

h1 {
    color: #fdfffd;
    font-size: 28px;
}

label {
    color: #fdfffd;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 10px;
}

input, textarea {
    padding: 10px 15px;
    border-radius: 15px;
    margin-bottom: 15px;
    background-color: #c6abe0;
    border: 1px solid #5a158c;
    color: #fdfffd;
    outline: none;
    font-size: 14px;
    box-sizing: border-box;
    width: 100%; /* Hacer que los inputs ocupen el 100% del ancho del contenedor */
}

input::placeholder, textarea::placeholder {
    color: #29159133;
}

textarea {
    resize: none;
}

.form-txt {
    margin-bottom: 20px;
    display: flex;
    justify-content: space-between;
    text-align: center;
}

.form-txt a {
    color: #ca8ed8;
    font-size: 12px;
    font-weight: 600;
    text-decoration: none;
}

.btn {
    font-size: 16px;
    color: #fdfffd;
    border: 0;
    border-radius: 15px;
    background-color: #5a158c;
    box-shadow: 0 0 10px rgb(30, 21, 44);
    cursor: pointer;
    padding: 10px 15px;
    width: 100%; /* Hacer que el botón ocupe el 100% del ancho del contenedor */
}

.btn:hover {
    background-color: rgb(30, 21, 44);
}

@media (max-width: 991px) {
    form {
        padding: 30px 20px;
        margin-top: 20px; /* Reducir el margen superior en pantallas pequeñas */
    }

    input, textarea {
        padding: 10px;
    }

    .btn {
        padding: 10px;
    }
}

---------------------- config.py ---------------------------------------------
class DevelopmentConfig():
    DEBUG = True
    MYSQL_HOST = '127.0.0.1'
    MYSQL_USER = 'root' #Nombre de usuario de la base de datos
    MYSQL_PASSWORD = '' #Contraseña del usuario de base de datos
    MYSQL_DB = 'cac_shop_db' #Nombre de la base de datos

config = {
    'development' : DevelopmentConfig
}

----------------------------- script para crear la tabla en Mariadb -----------------------
USE cac_shop_db;

CREATE TABLE contactos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100),
    telefono VARCHAR(15),
    email VARCHAR(100),
    mensaje TEXT,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);




-------------- API python "appContacto.py" ----------------------------------

from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from config import config

app = Flask(__name__)
app.config.from_object(config['development'])

conexion = MySQL(app)

@app.route('/contacto', methods=['POST'])
def recibir_contacto():
    try:
        nombre = request.form['name']
        telefono = request.form['phone']
        email = request.form['email']
        mensaje = request.form['message']
        
        cursor = conexion.connection.cursor()
        cursor.execute("INSERT INTO contactos (nombre, telefono, email, mensaje) VALUES (%s, %s, %s, %s)", 
                       (nombre, telefono, email, mensaje))
        conexion.connection.commit()
        
        return jsonify({"mensaje": "Contacto recibido"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run()

