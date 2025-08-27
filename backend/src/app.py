from flask import Flask
from config import Config
from extensions import mongo, cors
from users.routes import users_bp

# Inicializar Flask
app = Flask(__name__)
app.config["MONGO_URI"] = Config.MONGO_URI

# Inicializar extensiones
mongo.init_app(app)
cors.init_app(app, resources={r"/*": {"origins": "*"}})

# Registrar blueprints
app.register_blueprint(users_bp)

@app.route('/')
def index():
  return '<h1>Hello</h1>'

if __name__ == "__main__":
    app.run(port=Config.PORT, debug=Config.DEBUG)