import mysql.connector
import json
from rclone_python import rclone
import urllib.request
import os

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="password",
    database="instagram"
)

cursor = db.cursor()

# Specify the file with data to store
json_filename = 'data.json'

categories = ["mental health and lifestyle", 
              "beauty and skincare",
              "fitness and nutrition",
              "food and cooking",
              "sports",
              "movies and TV shows",
              "arts and music",
              "fashion",
              "educational facts and news",
              "business and career",
              "books",
              "games",
              "photography",
              "technology and programming"]

# gender 0 is male and 1 is female
categories_gender = {
    "mental health and lifestyle": None,
    "beauty and skincare": 1,
    "fitness and nutrition": 0,
    "food and cooking": 1,
    "sports": None,
    "movies and TV shows": None,
    "arts and music": None,
    "fashion": 1,
    "educational facts and news": None,
    "business and career": None,
    "books": None,
    "games": 0,
    "photography": None,
    "technology and programming": 0,
}

categories_age = {
    "mental health and lifestyle": None,
    "beauty and skincare": None,
    "fitness and nutrition": "12-27",
    "food and cooking": None,
    "sports": "28-200",
    "movies and TV shows": None,
    "arts and music": None,
    "fashion": None,
    "educational facts and news": None,
    "business and career": None,
    "books": "28-200",
    "games": "12-27",
    "photography": None,
    "technology and programming": "12-27",
}

current_category_index = 0
current_category_name = categories[current_category_index]
file_counter = 0
location = 'Oxford'
add_location = False

# SQL tables columns to insert
categories_keys = ["id", "name", "profile_picture_url", "gender", "age_group"]
post_keys = ["id", "caption", "like_count", "media_type", "media_name", "category_id", "location"]



# Helper function to insert into given sql table
def insertIntoTable(table_name, column_names, values):
    # print(table_name, column_names, values)
    columns = ','.join(column_names)
    temp_values = ', '.join(['%s' for _ in column_names])
    query = f'INSERT INTO {table_name} ({columns}) VALUES ({temp_values})'
    cursor.execute(query, tuple(values))

# Insert the current category into categories table
categories_values = [current_category_index, current_category_name, None, categories_gender[current_category_name], categories_age[current_category_name]]
insertIntoTable("categories", categories_keys, categories_values)

# Open the data file with explicit encoding (utf-8) and load the JSON data
with open(json_filename, 'r', encoding='utf-8') as file:
    json_data = json.load(file)
    business_discovery = json_data["business_discovery"]
    
    # get the post data
    posts = business_discovery["media"]["data"]
    # iterate over each post from the account
    for post in posts:
        # initialise the values array
        post_values = []
        # get the value for each key in the right order
        for key in post_keys:
            if key in post.keys():
                # special case for media
                if key=='media_name':
                    # get media properties
                    media_url = post["media_url"]
                    media_type = post["media_type"]
                    file_name = f"image_{file_counter}.jpg" if (media_type=="IMAGE" or media_type=="CAROUSEL_ALBUM") else f"video_{file_counter}.mp4"
                    file_counter += 1
                    # download post media
                    urllib.request.urlretrieve(media_url, f"media/{file_name}")
                    # save post media to onedrive
                    rclone.copy(f"media/{file_name}", 'onedrive:Instagram media', ignore_existing=True, args=['--create-empty-src-dirs'])
                    # clean up local memory - delete the downloaded file
                    os.remove(f"media/{file_name}")
                    # add the name of the media to the posts table
                    # the file can be downloaded from onedrive:Instagram media/<file_name>
                    post_values.append(file_name)
                else:
                    # if not media simply add to sql
                    post_values.append(post[key])
            else:
                post_values.append(None)
        # add the fixed fields (category_id and location optionally)
        post_values[-2] = current_category_index
        if add_location:
            post_values[-1] = location
        insertIntoTable("post", post_keys, post_values)

db.commit()







