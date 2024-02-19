from rclone_python import rclone
import urllib.request
import os

# rclone.copy('notes.txt', 'onedrive:test', ignore_existing=True, args=['--create-empty-src-dirs'])

# urllib.request.urlretrieve("https://scontent-man2-1.cdninstagram.com/o1/v/t16/f1/m82/864DF3C248F0C80135858965B8E34D90_video_dashinit.mp4?efg=eyJ2ZW5jb2RlX3RhZyI6InZ0c192b2RfdXJsZ2VuLmNsaXBzLnVua25vd24tQzMuNzIwLmRhc2hfYmFzZWxpbmVfMV92MSJ9&_nc_ht=scontent-man2-1.cdninstagram.com&_nc_cat=105&vs=625148966407353_2300293474&_nc_vs=HBksFQIYT2lnX3hwdl9yZWVsc19wZXJtYW5lbnRfcHJvZC84NjRERjNDMjQ4RjBDODAxMzU4NTg5NjVCOEUzNEQ5MF92aWRlb19kYXNoaW5pdC5tcDQVAALIAQAVAhg6cGFzc3Rocm91Z2hfZXZlcnN0b3JlL0dNbEdkUmt0RlF4VlE0UUNBQzhqbXRaeVdSd0picV9FQUFBRhUCAsgBACgAGAAbAYgHdXNlX29pbAExFQAAJuD%2By%2B%2B8u%2F4%2FFQIoAkMzLBdASXYEGJN0vBgSZGFzaF9iYXNlbGluZV8xX3YxEQB1AAA%3D&ccb=9-4&oh=00_AfA9eMQ_y6FNTy7UJ_yUOWzTUCdSlH9p5249HPmOwaEzxA&oe=65C9921C&_nc_sid=1d576d&_nc_rid=19f25d2dbc", "images/test_vid.mp4")

# os.remove(f"media/test.jpg")

# rclone.copy('web-app/images/jk-placeholder-image-300x203.jpg', 'onedrive:Instagram media', ignore_existing=True, args=['--create-empty-src-dirs'])
# media_onedrive_url = rclone.link(f"onedrive:Instagram media/jk-placeholder-image-300x203.jpg")

import subprocess
import signal
import time

def mount_remote(remote_name, mount_point):
    # Check if mount point exists, create it if not
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

# Unmount the remote (example)
input("Press Enter to unmount the remote...")
unmount_remote(mount_process)