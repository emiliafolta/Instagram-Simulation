import mysql.connector
import json
from rclone_python import rclone
import urllib.request
import os
from typing import Dict, NamedTuple
from config import location_count

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

def get_posts_from_db(category_proportions, exclude, location=None, location_count=location_count):
    location_posts = []
    # evaluate the exclusion condition based on the passed exclude
    def exclude_string(exclude):
        if len(exclude)>0:
            return f"AND p.id NOT IN ({','.join(str(id) for id in exclude)})"
        else:
            return ""

    # special case - location is passed so we start by getting the location posts
    if location:
        location_query = f"SELECT p.id, c.name, p.caption, p.like_count, p.media_type, p.media_name, p.location \
            FROM posts p, categories c \
            WHERE p.category_id = c.id AND p.location = '{location}'\
            {exclude_string(exclude)}\
            ORDER BY RAND() \
            LIMIT {location_count}"
        cursor.execute(location_query)
        location_posts = location_posts + cursor.fetchall()
        # we also need to add the post ids of location posts to exclude list so that we don't duplicate them when selecting category posts
        location_ids = [post[0] for post in location_posts]
        exclude = exclude + location_ids

    category_names = [k for k in category_proportions.keys()]
    num_of_categories = len(category_names)
    if num_of_categories > 0:
        # create a big query to send to the db
        big_query = "SELECT * FROM ("
        # select posts for each category
        for i in range(num_of_categories):
            category_name = category_names[i]
            category_query = f"(SELECT p.id, c.name, p.caption, p.like_count, p.media_type, p.media_name, p.location \
                            FROM posts p, categories c \
                            WHERE p.category_id = c.id AND c.name = '{category_name}' \
                            {exclude_string(exclude)}\
                            ORDER BY RAND() \
                            LIMIT {category_proportions[category_name]})"
            if i>0:
                big_query = big_query + "UNION"
            big_query = big_query + category_query
        big_query = big_query + ") AS t"
        # execute the big query which will return all posts from the listed categories 
        cursor.execute(big_query)
        db_result = cursor.fetchall()
        # combine the categories and location posts
    else:
        db_result = []
    res = db_result + location_posts
    print(len(res))
    return res
    

get_posts_from_db({'fashion':4, 'sports':3, 'books':12}, [], location="Oxford", location_count=10)











