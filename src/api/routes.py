"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from datetime import timedelta
from flask_jwt_extended import JWTManager, create_access_token,jwt_required,get_jwt_identity

api = Blueprint('api', __name__)
bcrypt=Bcrypt()
jwt=JWTManager

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/user', methods=['POST'])
def create_user():
   try:
        email=request.json.get('email')
        password=request.json.get('password')
        name=request.json.get('name')
        
        if not email or not password or not name: 
              return jsonify({'error':'Email , password y name son requeridos'}),400
        
        existing_user=User.query.filter_by(email=email).first()
        if existing_user:
              return jsonify ({'error':'El email ya existe'}),400
        
        password_hash=bcrypt.generate_password_hash(password).decode('utf-8')

        new_user=User(email=email,password=password_hash,name=name)

        db.session.add(new_user)
        db.session.commit()


        return jsonify(new_user.serialize()),201
   except Exception as e:
        return jsonify({'error': 'Error interno', 'details': str(e)}), 500



@api.route('/login', methods=['POST'])
def user_login():
  try:
       email=request.json.get('email')
       password=request.json.get('password')
       if not email or not password : 
              return jsonify({'error':'Email y password  son requeridos'}),400
       
       current_user=User.query.filter_by(email=email).first()
       if not current_user:
              return jsonify({'error':'No se encuentra registrado'}),404
       
       password_from_db=current_user.password
       true_false=bcrypt.check_password_hash(password_from_db,password)

       if true_false:
             expires=timedelta(days=1)
             user_id=current_user.id

             access_token=create_access_token(identity=user_id,expires_delta=expires)
             return jsonify({'acces token':access_token}),200
       else:
             return {'error':"contraseña incorrecta"},404
  except Exception as e:
        return jsonify({'error': 'Error interno', 'details': str(e)}), 500

