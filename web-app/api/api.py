import os
import time
from flask import Flask, send_from_directory
from flask_cors import CORS
from get_data import get_data, get_random
import subprocess
import signal
import time

app = Flask(__name__)

CORS(app)

@app.route('/time')
def get_current_time():
    print("Got request")
    res = {'time': time.time()}
    print(res)
    return res

@app.route('/posts')
def get_posts():
    res = get_random(10)
    return res

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