from flask import Flask, request 
from flask_pymongo import PyMongo 
from flask_cors import CORS 
#from dotenv import load_dotenv
#import os 

#load__dotenv()

app = Flask(__name__)
#CORS(app)

#MONGO_URI = os.getenv("MONGO_URI")
app.config['MONGO_URI'] = 'mongodb+srv://jimmyegc:4jMnuDVFS6mnuruX@api-db.vrhia.mongodb.net/crud_db?retryWrites=true&w=majority' #MONGO_URI
mongo = PyMongo(app)
db = mongo.db

@app.route('/')
def index():
  return '<h1>Hello</h1>'

@app.route('/users', methods=['POST'])
def createUser():
  users_collection = db.users
  result = users_collection.insert_one({
    'name': request.json['name'],
    'email': request.json['email'],
    'password': request.json['password']
  })
  inserted_id = str(result.inserted_id)
  print(inserted_id)
  return {'id': inserted_id}, 201

@app.route('/users', methods=['GET'])
def getUsers():
  return 'ok'

@app.route('/users/<id>', methods=['GET'])
def getUser():
  return 'ok'

@app.route('/users/<id>', methods=['DELETE'])
def deleteUser():
  return 'ok'  

@app.route('/users/<id>', methods=['PUT'])
def updateUser():
  return 'ok'  

if __name__ == "__main__":
  app.run(debug=True)