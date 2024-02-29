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

class Category(NamedTuple):
    id: int
    name: str
    profile_picture_url: str
    gender: int
    age_group: str


db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="password",
    database="instagram"
)

cursor = db.cursor()

# get posts from the db (all available)
def get_data_from_db():
    query = "SELECT p.id, c.name, p.caption, p.like_count, p.media_type, p.media_name, p.location  FROM posts p, categories c WHERE p.category_id = c.id"
    cursor.execute(query)
    db_result = cursor.fetchall()
    result = [ Post(*tuple) for tuple in db_result ]
    return result

# get categories from the db
def get_categories_from_db():
    query = "SELECT c.name FROM categories c"
    cursor.execute(query)
    result = cursor.fetchall()
    return result

# get random n posts from the posts table
def get_random_posts_from_db(count: int):
    query = f"SELECT p.id, c.name, p.caption, p.like_count, p.media_type, p.media_name, p.location  FROM posts p, categories c WHERE p.category_id = c.id ORDER BY RAND() LIMIT {count}"
    cursor.execute(query)
    db_result = cursor.fetchall()
    result = [ Post(*tuple) for tuple in db_result ]
    return result

# get posts from the db (all available)
def get_posts_from_categories(category: str, count: int):
    # TODO: add input sanitisation
    query = f"SELECT p.id, c.name, p.caption, p.like_count, p.media_type, p.media_name, p.location  FROM posts p, categories c WHERE p.category_id = c.id AND c.name = {category} LIMIT {count}"
    cursor.execute(query)
    db_result = cursor.fetchall()
    result = [ Post(*tuple) for tuple in db_result ]
    return result











