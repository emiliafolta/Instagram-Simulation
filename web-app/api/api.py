import os
import time
from flask import Flask, send_from_directory, request, jsonify
from flask_cors import CORS
from get_data import get_categories_from_db, get_posts_from_categories, get_random_posts_from_db, get_posts_from_db
import subprocess
import time
from algo import add_category_scores, add_age_scores, add_gender_scores, calculate_categories_proportions
from config import post_count

app = Flask(__name__)
# CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

CORS(app)

@app.route('/time')
def get_current_time():
    print("Got request")
    res = {'time': time.time()}
    print(res)
    return res

@app.route('/posts')
def get_posts():
    res = get_random_posts_from_db(10)
    return res

@app.route('/categories')
def get_categories():
    res = get_categories_from_db()
    return res

# Endpoint to get posts from categories based on the user interaction
# Json we expect to be sent (each field is optional)
# { 
#     categories: [[category_name, overall_likes, likes_in_last_scroll], ['fashion', 3, 2], ['sports', 4, 0]],
#     gender: 0,
#     age: 30,
#     location: 'Oxford',
#     exclude: [13456234, 82354236, 439857948]
# }
@app.route('/posts_from_categories', methods=['POST'])
def get_posts_from_categories():
    data = request.json  # This should contain the json of the shape as above

    # dictionary that we will evaluate category scores in
    category_scores = {}
    if 'categories' in data:
        add_category_scores(data['categories'], category_scores)

    if 'gender' in data:
        add_gender_scores(data['gender'], category_scores)
    
    if 'age' in data:
        add_age_scores(data['age'], category_scores)

    location = None
    if 'location' in data:
        location = data['location']
    
    exclude = []
    if 'exclude' in data:
        exclude = data['exclude']

    # category_proportions: {'category': number_of_posts, 'fashion': 3, 'sports': 4, ...}
    category_proportions = calculate_categories_proportions(category_scores)
    print(category_proportions)

    res = get_posts_from_db(category_proportions, exclude, location)
    return res

@app.route('/send-data', methods=['POST'])
def receive_data():
    received_data = request.json  # This should contain your array of tuples

    # Assuming data is in the format {'data': [['string1', 123], ['string2', 456]]}
    # received_data = data['data']
    print(received_data)

    # Process received_data as needed
    for item in received_data:
        string_value = item[0]
        number_value = item[1]
        # Do something with string_value and number_value
        
    # Optionally, you can send a response back to the frontend
    return jsonify({'message': 'Data received successfully'})

# Endpoint to serve images
@app.route('/images/<path:filename>')
def serve_image(filename):
    return send_from_directory('Instagram media', filename)

# ***************** Mount the onedrive ********************
def mount_remote(remote_name, mount_point):
    # Check if mount point exists, remove it if it does (otherwise rclone gets angry)
    if os.path.exists(mount_point):
        os.removedirs(mount_point)

    # Construct the rclone mount command
    rclone_cmd = [
        "rclone",
        "mount",
        remote_name,
        mount_point,
        "--vfs-cache-mode", "full",  # Adjust cache mode as needed
        "--vfs-cache-max-age", "20s", # Adjust cache eviction time
    ]

    # Start the rclone mount subprocess
    try:
        process = subprocess.Popen(rclone_cmd)
        print("Remote mounted successfully!")
        return process  # Return the process object
    except subprocess.CalledProcessError as e:
        print("Error mounting remote:", e)

def unmount_remote(process):
    # Terminate the rclone mount subprocess
    try:
        process.terminate()  # Send termination signal to the process
        print("Unmounting remote...")
        time.sleep(2)  # Wait for the process to terminate
    except Exception as e:
        print("Error unmounting remote:", e)


remote_name = "onedrive:Instagram media"  # Replace with your remote name
mount_point = "Instagram media"  # Replace with your desired mount point

# Mount the remote
mount_process = mount_remote(remote_name, mount_point)

# # Unmount the remote (example)
# input("Press Enter to unmount the remote...")
# unmount_remote(mount_process)

# app.run() 
if __name__=='__main__':
    app.run(port = 5000, debug = True)