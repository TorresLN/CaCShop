from flask import Flask
from flask_mysqldb import MySQL
from flask_cors import CORS
from config import config

mysql = MySQL()

def create_app():
    app = Flask(__name__, static_folder='static', static_url_path='/static')
    app.config.from_object(config['development'])
    app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

    mysql.init_app(app)

    from routes.productos import productos_bp, pagina_no_encontrada
    from routes.contacto import contacto_bp
    app.register_blueprint(productos_bp)
    app.register_blueprint(contacto_bp)
    app.register_error_handler(404, pagina_no_encontrada)
    
    CORS(app)
    return app
