import requests

def get_lat_long(address):
    URL = "https://maps.googleapis.com/maps/api/geocode/json"
    KEY = "AIzaSyBUajMUOmaG_OFJFtVI-Fb2rtTQkeWzbUg"
    params = {'address': address, "key": KEY}

    r = requests.get(url=URL, params=params)

    data = r.json()
    print(data)
    return str(data['results'][0]['geometry']['location']['lat']) + ", " + str(data['results'][0]['geometry']['location']['lng'])