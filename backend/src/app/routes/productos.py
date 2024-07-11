import os
from flask import Blueprint, jsonify, request, send_from_directory
from create_app import mysql
from models.productos import get_producto, get_productos, create_producto, delete_producto, update_producto, destacar_producto
from config import config

config = config['development']
productos_bp = Blueprint('productos', __name__)

# Página de error
def pagina_no_encontrada(error):
    return "<h1>La página que intentas buscar no existe...</h1>", 404

@productos_bp.route('/productos', methods=['GET'])
def listar_productos():
    try:
        destacados = request.args.get('destacados', default='False').lower() == 'true'
        productos = get_productos(mysql, destacados)
        return jsonify({'productos': productos, 'mensaje': 'ok'})
    except Exception as e:
        print(f'error {e}')
        return jsonify({'mensaje': 'Error'})

@productos_bp.route('/productos', methods=['POST'])
def alta_producto():
    try:
        create_producto(mysql, request)
        return jsonify({'mensaje': 'ok'})
    except Exception as e:
        print(f'error {e}')
        return jsonify({'mensaje': 'Error'})

@productos_bp.route('/productos/<id>', methods=['PUT'])
def editar_producto(id):
    try:
        update_producto(mysql, request, id)
        return jsonify({'mensaje': 'ok'})
    except Exception as e:
        print(f'error {e}')
        return jsonify({'mensaje': 'Error'})
    

@productos_bp.route('/productos/<id>', methods=['GET'])
def listar_producto(id):
    try:
        producto = get_producto(mysql, id)
        if producto:
            return jsonify({'producto': producto, 'mensaje': 'ok'})
        else:
            return jsonify({'mensaje': 'El producto buscado no existe'}), 404
    except Exception as e:
        print(f'error: {e}')
        return jsonify({'mensaje': 'Error'})
    
@productos_bp.route('/productos/<id>', methods=['PATCH'])
def producto_destacado(id):
    try:
        destacar_producto(mysql, request, id)
        return jsonify({'mensaje': 'ok'})
    except Exception as e:
        print(f'error {e}')
        return jsonify({'mensaje': 'Error'})
    
@productos_bp.route('/productos/eliminar/<id>', methods=['DELETE'])
def eliminar_producto(id):
    try:
        delete_producto(mysql, id)
        return jsonify({'mensaje': 'El producto eliminado no existe'})
    except Exception as e:
        print(f'error: {e}')
        return jsonify({'mensaje': 'Error'}), 404

@productos_bp.route('/static/img/<img>')
def get_imagen(img):
    static_folder = os.path.join(os.getcwd(), 'static/imagenes')
    try:
        return send_from_directory(static_folder, img)
    except FileNotFoundError:
        return "<h1>La imagen no existe...</h1>", 404