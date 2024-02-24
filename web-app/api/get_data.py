import mysql.connector
import json
from rclone_python import rclone
import urllib.request
import os
from typing import Dict, NamedTuple

class Post(NamedTuple):
    id: int
    category_name: str
    caption: str
    like_count: int
    media_type: str
    media_name: str
    location: str 
    
    def to_dict(self) -> Dict[str, any]:
        return {
            'id': self.id,
            'category_name': self.category_name,
            'caption': self.caption,
            'like_count': self.like_count,
            'media_type': self.media_type,
            'media_name': self.media_name,
            'location': self.location
        }

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="password",
    database="instagram"
)

cursor = db.cursor()

def get_data():
    query = "SELECT p.id, c.name, p.caption, p.like_count, p.media_type, p.media_name, p.location  FROM posts p, categories c WHERE p.category_id = c.id"
    cursor.execute(query)
    db_result = cursor.fetchall()
    result = [ Post(*tuple) for tuple in db_result ]
    print(result)
    return result

# get random n posts from the posts table
def get_random(n: int):
    query = f"SELECT p.id, c.name, p.caption, p.like_count, p.media_type, p.media_name, p.location  FROM posts p, categories c WHERE p.category_id = c.id ORDER BY RAND() LIMIT {n}"
    cursor.execute(query)
    db_result = cursor.fetchall()
    result = [ Post(*tuple) for tuple in db_result ]
    print(result)
    return result











