import mysql.connector
import json

db = mysql.connector.connect(
    host="localhost",
    user="root",
    passwd="password",
    database="instagram"
)

cursor = db.cursor()

# Specify the file with data to store
json_filename = 'data.json'

user_keys = ["id", "username", "name", "biography", "profile_picture_url", "followers_count", "follows_count", "media_count"]
post_keys = ["id", "caption", "like_count", "comments_count", "media_product_type", "media_type", "media_url", "timestamp", "userID"]

def insertIntoTable(table_name, column_names, values):
    # print(table_name, column_names, values)
    columns = ','.join(column_names)
    temp_values = ', '.join(['%s' for _ in column_names])
    query = f'INSERT INTO {table_name} ({columns}) VALUES ({temp_values})'
    cursor.execute(query, tuple(values))
    


# Open the file with explicit encoding (utf-8) and load the JSON data
with open(json_filename, 'r', encoding='utf-8') as file:
    json_data = json.load(file)
    business_discovery = json_data["business_discovery"]

    user_values = []
    for key in user_keys:
        if key in business_discovery.keys():
            user_values.append(business_discovery[key])
        else:
            user_values.append(None)
    insertIntoTable("user", user_keys, user_values)
    
    posts = business_discovery["media"]["data"]
    userID = business_discovery["id"]
    for post in posts:
        post_values = []
        for key in post_keys:
            if key in post.keys():
                post_values.append(post[key])
            else:
                post_values.append(None)
        post_values[-1] = userID
        insertIntoTable("post", post_keys, post_values)

db.commit()







