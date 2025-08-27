from flask import Blueprint, request, jsonify
from .services import create_user, get_all_users, get_user_by_id, update_user, delete_user

users_bp = Blueprint("users", __name__)

@users_bp.route("/users", methods=["POST"])
def add_user():
    data = request.json
    if not data or "name" not in data or "email" not in data:
        return jsonify({"error": "Faltan datos"}), 400
    user_id = create_user(data)
    return jsonify({"message": "Usuario agregado", "id": user_id}), 201

@users_bp.route("/users", methods=["GET"])
def list_users():
    return jsonify(get_all_users())

@users_bp.route("/users/<id>", methods=["GET"])
def get_user(id):
    user = get_user_by_id(id)
    if user == "invalid":
        return jsonify({"error": "ID inválido"}), 400
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify(user)

@users_bp.route("/users/<id>", methods=["PUT"])
def edit_user(id):
    data = request.json
    if not data:
        return jsonify({"error": "Datos vacíos"}), 400
    result = update_user(id, data)
    if result == "invalid":
        return jsonify({"error": "ID inválido"}), 400
    if not result:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify({"message": "Usuario actualizado"})

@users_bp.route("/users/<id>", methods=["DELETE"])
def remove_user(id):
    result = delete_user(id)
    if result == "invalid":
        return jsonify({"error": "ID inválido"}), 400
    if not result:
        return jsonify({"error": "Usuario no encontrado"}), 404
    return jsonify({"message": "Usuario eliminado"})
