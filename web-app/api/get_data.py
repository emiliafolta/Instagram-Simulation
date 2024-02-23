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

def get_data():
    cursor.execute("SELECT * FROM posts")
    result = cursor.fetchall()
    return result









