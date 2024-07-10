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