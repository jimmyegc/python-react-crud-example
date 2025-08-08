from flask import Flask, request, jsonify 
from flask_pymongo import PyMongo 
from bson import ObjectId
from flask_cors import CORS 
from dotenv import load_dotenv
import os 

# Cargar variables desde el archivo .env
load_dotenv()

# Acceder a las variables
MONGO_URI = os.getenv("MONGO_URI")
PORT = int(os.getenv("PORT", 5000))  # valor por defecto si no está definido
DEBUG = os.getenv("DEBUG", "False").lower() == "true"

# Inicializar Flask
app = Flask(__name__)

# Habilitar CORS para todas las rutas y métodos
CORS(app, resources={r"/*": {"origins": "*"}})

# Configuración de MongoDB
app.config["MONGO_URI"] = MONGO_URI
mongo = PyMongo(app)

# Colección de usuarios
users_collection = mongo.db.users

@app.route('/')
def index():
  return '<h1>Hello</h1>'

# Crear usuario
@app.route("/users", methods=["POST"])
def add_user():
    data = request.json
    if not data or "name" not in data or "email" not in data:
        return jsonify({"error": "Faltan datos"}), 400

    new_user = {
        "name": data["name"],
        "email": data["email"]
    }
    result = users_collection.insert_one(new_user)
    return jsonify({"msg": "Usuario agregado", "id": str(result.inserted_id)}), 201

# Obtener todos los usuarios
@app.route("/users", methods=["GET"])
def get_users():
    users = []
    for user in users_collection.find():
        users.append({
            "_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        })
    return jsonify(users)

# Obtener un usuario por ID
@app.route("/users/<id>", methods=["GET"])
def get_one_user(id):
    try:
        user = users_collection.find_one({"_id": ObjectId(id)})
        if not user:
            return jsonify({"error": "Usuario no encontrado"}), 404

        return jsonify({
            "_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"]
        })
    except:
        return jsonify({"error": "ID inválido"}), 400

# Actualizar usuario por ID
@app.route("/users/<id>", methods=["PUT"])
def update_user(id):
    try:
        data = request.json
        if not data:
            return jsonify({"error": "Datos vacíos"}), 400

        result = users_collection.update_one(
            {"_id": ObjectId(id)},
            {"$set": data}
        )
        if result.matched_count == 0:
            return jsonify({"error": "Usuario no encontrado"}), 404

        return jsonify({"msg": "Usuario actualizado"})
    except:
        return jsonify({"error": "ID inválido"}), 400

# Eliminar usuario por ID
@app.route("/users/<id>", methods=["DELETE"])
def delete_user(id):
    try:
        result = users_collection.delete_one({"_id": ObjectId(id)})
        if result.deleted_count == 0:
            return jsonify({"error": "Usuario no encontrado"}), 404
        return jsonify({"msg": "Usuario eliminado"})
    except:
        return jsonify({"error": "ID inválido"}), 400

if __name__ == "__main__":
  app.run(port=PORT, debug=DEBUG)