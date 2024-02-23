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

# Helper function to insert into given sql table
def insertIntoTable(table_name, column_names, values):
    # print(table_name, column_names, values)
    columns = ','.join(column_names)
    temp_values = ', '.join(['%s' for _ in column_names])
    query = f'INSERT INTO {table_name} ({columns}) VALUES ({temp_values})'
    cursor.execute(query, tuple(values))

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

# change category index to upload the category
current_category_index = 0
current_category_name = categories[current_category_index]

# Insert the current category into categories table
category_to_insert = {
    "id": current_category_index,
    "name": current_category_name,
    "profile_picture_url": None,
    "gender": categories_gender[current_category_name],
    "age_group": categories_age[current_category_name],
}

insertIntoTable("categories", category_to_insert.keys(), category_to_insert.values())

# keys of the post from data
# note (we will save "media_name" not "media_url" in the table)
post_keys = ["id", "caption", "like_count", "media_type", "media_url", "category_id", "location"]
# change these settings for each account
post_location = None
# file counter to save each post media in a separate file
file_counter = 0

# Open the data file with explicit encoding (utf-8) and load the JSON data
with open(json_filename, 'r', encoding='utf-8') as file:
    json_data = json.load(file)
    business_discovery = json_data["business_discovery"]
    
    # get the post data
    posts = business_discovery["media"]["data"]
    # iterate over each post from the account
    for post in posts:
        # create a dictionary to store post attributes and their values
        post_dict = {}
        # iterate over possible post attributes and save them to the dict if exist in data
        for key in post_keys:
            if key in post.keys():
                # special case for storing media
                if key=='media_url':
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
                    post_dict["media_name"] = file_name
                else:
                    post_dict[key] = post[key]
            else:
                post_dict[key] = None
        # add the fixed fields (category_id and post location)
        post_dict["category_id"] = current_category_index
        post_dict["location"] = post_location
        insertIntoTable("posts", post_dict.keys(), post_dict.values())

db.commit()







