import os
from flask import Blueprint, jsonify, request
from create_app import mysql
from models.contacto import recibir_contacto, buscar_comentarios
from config import config

config = config['development']
contacto_bp = Blueprint('contacto', __name__)

@contacto_bp.route('/contacto', methods=['GET'])
def listar_comentarios():
    try:
        comentarios = buscar_comentarios(mysql)
        return jsonify({'comentarios': comentarios, 'mensaje': 'ok'})
    except Exception as e:
        print(f'error {e}')
        return jsonify({'mensaje': 'Error'})

@contacto_bp.route('/contacto', methods=['POST'])
def guardar_contacto():
    try:
        recibir_contacto(mysql, request)        
        return jsonify({"mensaje": "Contacto recibido"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    