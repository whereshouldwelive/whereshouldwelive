import requests
import json

def get_listings(addresses):
    points = []
    for a in addresses:
        points.append(get_lat_long(a))

    lat, long = get_equidistant_points(points)
    return get_zoopla_results(lat, long)

def get_lat_long(address):
    URL = "https://maps.googleapis.com/maps/api/geocode/json"
    KEY = "AIzaSyBUajMUOmaG_OFJFtVI-Fb2rtTQkeWzbUg"
    params = {'address': address, "key": KEY}

    r = requests.get(url=URL, params=params)

    data = r.json()
    print(data)
    lat = data['results'][0]['geometry']['location']['lat']
    long = data['results'][0]['geometry']['location']['lng']
    get_zoopla_results(lat, long)
    return (data['results'][0]['geometry']['location']['lat']), str(data['results'][0]['geometry']['location']['lng'])

def get_equidistant_points(points):
    lats = [l for (l, _) in points]
    longs = [l for (_, l) in points]
    mean_lat = sum(lats) / len(lats)
    mean_long = sum(longs) / len(longs)
    return mean_lat, mean_long

def get_zoopla_results(lat, long):
    key = "r69gx65afduas4x328vhqhf3"
    url = "https://api.zoopla.co.uk/api/v1/property_listings.json"
    params = {"latitude": lat, "longitude": long, "api_key": key, "radius": 5}

    r = requests.get(url=url, params=params)
    data = r.json()
    print(data)
    return data['listing']

###### API ##########
def get_best_postcodes(locations):
    return ["SW7", "SW2", "SW1", "SW6"]

def get_distances(postcodes):
    distances = []
    for p in postcodes:
        distances.append([50, 50, 100])
    return distances

def get_avergae_prices(postcodes):
    prices = []
    for p in postcodes:
        prices.append(p)
    return prices

def get_result(postcodes):
    result = {"postcodes": [{"code": "SW7", "distances": [50, 50, 100], "price": 1000, "lat": 123, "long": 123},
                   {"code": "SW1", "distances": [50, 50, 100], "price": 1000, "lat": 123, "long": 123},
                   {"code": "SW2", "distances": [50, 50, 100], "price": 1000, "lat": 123, "long": 123},
                   {"code": "SW3", "distances": [50, 50, 100], "price": 1000, "lat": 123, "long": 123}]}
    return json.dumps(result)

