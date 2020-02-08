from flask import Flask
from geocoding import get_lat_long
app = Flask(__name__)


@app.route('/')
def hello():
    return "Hello World!"

@app.route('/find')
def find():
    return get_lat_long("SW7")

if __name__ == '__main__':
    app.run()