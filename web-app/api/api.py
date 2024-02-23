import time
from flask import Flask
from flask_cors import CORS
from get_data import get_data

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
    res = get_data()
    return res

# app.run() 

if __name__=='__main__':
    app.run(port = 5000, debug = True)