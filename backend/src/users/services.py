from extensions import mongo
from bson import ObjectId
from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

def create_user(data):
    hashed_pw = bcrypt.generate_password_hash(data["password"]).decode("utf-8")
    new_user = {"name": data["name"], "email": data["email"], "password": hashed_pw, }
    result = mongo.db.users.insert_one(new_user)    
    return str(result.inserted_id)

def get_all_users():
    users = []
    for user in mongo.db.users.find():
        users.append({
            "_id": str(user["_id"]),
            "name": user["name"],
            "email": user["email"],
            "password": user["password"]
        })
    return users

def get_user_by_id(user_id):
    try:
        user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            return None
        return {"_id": str(user["_id"]), "name": user["name"], "email": user["email"], "password": user["password"]}
    except:
        return "invalid"

def update_user(user_id, data):
    try:
        result = mongo.db.users.update_one({"_id": ObjectId(user_id)}, {"$set": data})
        if result.matched_count == 0:
            return None
        return True
    except:
        return "invalid"

def delete_user(user_id):
    try:
        result = mongo.db.users.delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count == 0:
            return None
        return True
    except:
        return "invalid"
