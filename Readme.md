## Python Flask, React Hooks & MongoDB CRUD

[Tutorial](https://www.youtube.com/watch?v=D1W8H4Rkb9A)

## Python | Backend
### Instalación

Crear el entorno virtual

```
  python -m venv env
```

Activar el entorno virtual (Powershell)

```
  .\env\Scripts\Activate.ps1
```

Instalar Flask, Driver de Conexión de Mongo, Cors.

```
  pip install flask flask-PyMongo flask-cors
  pip install fastapi uvicorn python-jose passlib[bcrypt] python-dotenv
  pip install PyJWT flask-bcrypt
```

## React | Frontend
### Librerías
```
npm i react-router-dom axios @tanstack/react-query
```

---

# 🔑 1. Métodos comunes de autenticación en APIs

1. **API Key**

   * Se manda como header o parámetro.
   * Ejemplo en `requests`:

   ```python
   import requests

   url = "https://api.ejemplo.com/data"
   headers = {"Authorization": "Bearer TU_API_KEY"}

   response = requests.get(url, headers=headers)
   print(response.json())
   ```

---

2. **Basic Auth** (usuario + contraseña en base64)

   * Menos usado en nuevas APIs (porque es inseguro si no usas HTTPS).

   ```python
   from requests.auth import HTTPBasicAuth

   response = requests.get("https://api.ejemplo.com/login",
                           auth=HTTPBasicAuth("usuario", "contraseña"))
   print(response.json())
   ```

---

3. **OAuth 2.0** (Google, Facebook, GitHub, etc.)

   * Es el estándar más usado.
   * Flujo típico:

     1. El usuario se loguea con Google/Facebook.
     2. La API te da un **access token**.
     3. Usas ese token para acceder a recursos.
   * Los tokens **expiran**, por lo que a veces necesitas un **refresh token**.
   * Ejemplo con `requests-oauthlib`:

   ```python
   from requests_oauthlib import OAuth2Session

   client_id = "tu_client_id"
   client_secret = "tu_client_secret"
   token_url = "https://provider.com/oauth/token"

   oauth = OAuth2Session(client_id)
   token = oauth.fetch_token(token_url=token_url,
                             client_secret=client_secret,
                             username="usuario",
                             password="contraseña")

   print(token)  # {'access_token': '...', 'refresh_token': '...', 'expires_in': 3600}
   ```

---

4. **JWT (JSON Web Token)**

   * Muy usado en APIs modernas (FastAPI, Django, Node, etc.).
   * El servidor genera un **token firmado** que contiene info del usuario.
   * El cliente lo manda en cada petición (`Authorization: Bearer ...`).
   * Ventaja: el servidor no guarda estado (stateless).
   * Ejemplo de uso en cliente Python:

   ```python
   import requests

   login_url = "https://api.ejemplo.com/login"
   data = {"username": "jimmy", "password": "1234"}

   # obtener token
   resp = requests.post(login_url, json=data)
   token = resp.json()["access_token"]

   # usar token en otra petición
   headers = {"Authorization": f"Bearer {token}"}
   resp = requests.get("https://api.ejemplo.com/protegido", headers=headers)
   print(resp.json())
   ```

---

# 🔐 2. Manejo seguro de tokens

* **Nunca hardcodees claves** en tu código → usa `.env` y `python-dotenv`.
* **Encripta o guarda tokens en un lugar seguro** si necesitas persistencia.
* **Renueva tokens automáticamente** (si expiran).
* **Maneja errores de expiración** (`401 Unauthorized` → pedir refresh token).

Ejemplo con `.env`:

```bash
API_KEY=123abc456
```

```python
from dotenv import load_dotenv
import os

load_dotenv()
api_key = os.getenv("API_KEY")
```

---

# 🧩 3. Manejo de sesiones en Python

En lugar de crear una conexión nueva con cada `requests.get()`, puedes usar una **sesión persistente**:

```python
import requests

session = requests.Session()
session.headers.update({"Authorization": "Bearer TU_TOKEN"})

# Reutiliza la misma sesión para múltiples requests
resp1 = session.get("https://api.ejemplo.com/user")
resp2 = session.get("https://api.ejemplo.com/orders")
```

✅ Esto es más rápido y te permite manejar **cookies**, **auth persistente** y **tokens** en un solo lugar.

---

# ⚡ 4. Mejores prácticas de seguridad

* 🔒 Usa siempre **HTTPS** (nunca expongas tokens en HTTP plano).
* 🔑 Guarda credenciales en `.env`, **nunca en GitHub**.
* ♻️ Maneja la expiración de tokens con **refresh tokens**.
* 🛡️ Limita permisos de tus claves (ejemplo: API keys con solo "read").
* 📜 Loguea accesos, pero **sin registrar el token completo**.

---

¡Excelente! 🔥 separar responsabilidades es clave para que tu API sea **mantenible y escalable**.
Te propongo una estructura de carpetas estilo **Flask modular** con **Blueprints** y helpers separados.

---

## 📂 Estructura recomendada

```
project/
│── app.py                # Punto de entrada
│── config.py             # Configuración (Mongo, JWT, etc.)
│── extensions.py         # Inicialización de librerías (Mongo, CORS, etc.)
│
├── auth/
│   ├── __init__.py
│   ├── routes.py         # Rutas de login/register
│   └── utils.py          # Funciones JWT y decorators
│
├── users/
│   ├── __init__.py
│   └── routes.py         # Ejemplo de rutas de usuarios protegidas
│
└── .env
```

---

## 📌 `config.py`

```python
import os
from dotenv import load_dotenv
from datetime import timedelta

load_dotenv()

class Config:
    MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017/miapp")
    SECRET_KEY = os.getenv("SECRET_KEY", "clave_super_secreta")
    ALGORITHM = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES = 30
    JWT_EXPIRATION_DELTA = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
```

---

## 📌 `extensions.py`

```python
from flask_pymongo import PyMongo
from flask_cors import CORS

mongo = PyMongo()
cors = CORS()
```

---

## 📌 `auth/utils.py`

```python
from flask import request, jsonify
import jwt
from functools import wraps
from datetime import datetime
from config import Config

def create_access_token(identity):
    expire = datetime.utcnow() + Config.JWT_EXPIRATION_DELTA
    payload = {"sub": identity, "exp": expire}
    token = jwt.encode(payload, Config.SECRET_KEY, algorithm=Config.ALGORITHM)
    return token

def token_required(f):
    @wraps(f)
    def wrapper(*args, **kwargs):
        token = None
        if "Authorization" in request.headers:
            auth_header = request.headers["Authorization"]
            if auth_header.startswith("Bearer "):
                token = auth_header.split(" ")[1]

        if not token:
            return jsonify({"error": "Token faltante"}), 401

        try:
            payload = jwt.decode(token, Config.SECRET_KEY, algorithms=[Config.ALGORITHM])
            user = payload["sub"]
        except jwt.ExpiredSignatureError:
            return jsonify({"error": "Token expirado"}), 401
        except jwt.InvalidTokenError:
            return jsonify({"error": "Token inválido"}), 401

        return f(user, *args, **kwargs)
    return wrapper
```

---

## 📌 `auth/routes.py`

```python
from flask import Blueprint, request, jsonify
from extensions import mongo
from passlib.hash import bcrypt
from .utils import create_access_token

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.json
    username, password = data.get("username"), data.get("password")

    if mongo.db.usuarios.find_one({"username": username}):
        return jsonify({"error": "Usuario ya existe"}), 400

    hashed_password = bcrypt.hash(password)
    mongo.db.usuarios.insert_one({"username": username, "password": hashed_password})

    return jsonify({"msg": "Usuario registrado correctamente"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    username, password = data.get("username"), data.get("password")

    user = mongo.db.usuarios.find_one({"username": username})
    if not user or not bcrypt.verify(password, user["password"]):
        return jsonify({"error": "Usuario o contraseña incorrectos"}), 401

    token = create_access_token(username)
    return jsonify({"access_token": token, "token_type": "bearer"})
```

---

## 📌 `users/routes.py`

```python
from flask import Blueprint, jsonify
from auth.utils import token_required

users_bp = Blueprint("users", __name__)

@users_bp.route("/protected", methods=["GET"])
@token_required
def protected_route(current_user):
    return jsonify({"msg": f"Hola {current_user}, accediste a un endpoint protegido!"})
```

---

## 📌 `app.py`

```python
from flask import Flask
from config import Config
from extensions import mongo, cors
from auth.routes import auth_bp
from users.routes import users_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    # Inicializar extensiones
    mongo.init_app(app)
    cors.init_app(app)

    # Registrar blueprints
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(users_bp, url_prefix="/users")

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(debug=True)
```

---

## 📌 Ahora las rutas quedan así:

* `POST /auth/register` → registrar usuario.
* `POST /auth/login` → login y obtener token.
* `GET /users/protected` → ruta protegida con JWT.

---

👉 Con esta separación:

* `config.py` → configuración de la app.
* `extensions.py` → inicialización de extensiones (Mongo, CORS).
* `auth/` → login, registro y JWT.
* `users/` → endpoints protegidos (puedes crear más módulos igual).
* `app.py` → solo arranca la aplicación.

---

¿Quieres que te prepare también un **middleware global de manejo de errores (ej: 404, 500, JWT inválido)** para que no tengas que repetir lógica en cada ruta?
