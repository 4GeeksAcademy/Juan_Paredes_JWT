from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Boolean

db = SQLAlchemy()

class User(db.Model):
    id = Column(Integer, primary_key=True)
    name = Column(String(120), nullable=False)
    email = Column(String(120), unique=True, nullable=False)
    password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
        }
