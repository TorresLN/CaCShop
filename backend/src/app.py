from flask import Flask
from flask_mysqldb import MySQL

from config import config

app = Flask(__name__)

conexion = MySQL(app)

@app.route('/productos')
def listar_productos():
    return 'hola mundo'


if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.run()