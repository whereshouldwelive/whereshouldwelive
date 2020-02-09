import pandas as pd
from geo import GeoLocation
import requests
import json
import time

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
    return (data['results'][0]['geometry']['location']['lat'], data['results'][0]['geometry']['location']['lng'])

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

def get_surroundings(point, dist):
    lat,lon=point
    loc = GeoLocation.from_degrees(lat, lon)
    SW_loc, NE_loc = loc.bounding_locations(dist)
    SW_loc=[SW_loc.deg_lat,SW_loc.deg_lon]
    NE_loc=[NE_loc.deg_lat,NE_loc.deg_lon]
    NW_loc=[SW_loc[0],NE_loc[1]]
    SE_loc=[NE_loc[0],SW_loc[1]]
    x_step=(NE_loc[0]-NW_loc[0])/round(dist)
    y_step=(NW_loc[1]-SW_loc[1])/round(dist)
    loc_list=[]
    for i in range(round(dist)):
        for j in range(round(dist)):
            loc_list.append([SW_loc[0]+i*x_step,SW_loc[1]+j*y_step])
    return loc_list

def get_postcode(point):
    URL = "https://maps.googleapis.com/maps/api/geocode/json"
    KEY = "AIzaSyBUajMUOmaG_OFJFtVI-Fb2rtTQkeWzbUg"
    params = {'latlng': str(point[0])+","+str(point[1]), "key": KEY}

    r = requests.get(url=URL, params=params)

    data = r.json()

    return data['results'][0]['address_components'][-1]['long_name']

def get_area_info(postcode_list,bed_num):
    coordinates=[]
    df=pd.read_csv('rental_prices.csv')
    df = df.drop(df.columns[0], axis=1)
    df2=pd.DataFrame(columns=df.columns.values)
    sep=' '
    for i in postcode_list:
        first = i.split(sep, 1)[0]
        for j in range(len(df)):
            if df['Postcode District'][j]==first:
                if not df['Count of rents'][j]=='-':
                    if not int(df['Count of rents'][j])==0:
                        if int(df['Bedroom Category'][j])==bed_num:
                            if len(i)>=6:
                                coordinates.append(get_lat_long(i))
                                df2=df2.append(df.iloc[j],ignore_index=True)
    df2=df2.drop('Count of rents',1)
    return df2,coordinates

def get_travel_times(start,end): # start is one point, end can be a list
    URL = "https://maps.googleapis.com/maps/api/distancematrix/json"
    KEY = "AIzaSyBUajMUOmaG_OFJFtVI-Fb2rtTQkeWzbUg"
    travel_time=[]
    destination=""
    for i in end:
        destination=destination+str(i[0])+','+str(i[1])+'|'
    params = {'origins': str(start[0])+','+str(start[1]),
              'units': 'imperial','mode': 'transit',
              'destinations':destination,"key": KEY}
    dat = requests.get(url=URL, params=params).json()
#     time.sleep(2)
    #r['rows'][0]['elements']
#     print(dat)
    for i in range(len(dat['rows'][0]['elements'])):
        travel_time.append(dat['rows'][0]['elements'][i]['duration']['text'])
    return travel_time

def get_results(address, search_rad,bed_num):
    coordinates=[]
    for i in address:
        coordinates.append(get_lat_long(i))
    center = get_equidistant_points(coordinates)
    postcodes = get_surroundings(center, search_rad)
    postcode_list=[]
    for i in range(len(postcodes)):
        postcode_list.append(get_postcode(postcodes[i]))
    travel_time=[]
    df3,coords=get_area_info(postcode_list,bed_num)
    start_list=[]
    for i in address:
        start_list.append(get_lat_long(i))
    for i in coords:
        travel_time.append(get_travel_times(i,start_list))
    res=[]
    for i in range(len(df3)):
        res.append({"code": df3['Postcode District'][i], "price": df3['Mean'][i],
                    "lat": coords[i][0], "lon":coords[i][1]})
    for i in range(len(res)):
        res[i].update({"travel_time": travel_time[i]})
    return res

###### API ##########
def get_best_postcodes(locations):
    return ["SW7", "SW2", "SW1", "SW6"]

def get_distances(postcodes):
    distances = []
    for p in postcodes:
        distances.append([50, 50, 100])
    return distances

def get_average_prices(postcodes):
    prices = []
    for p in postcodes:
        prices.append(p)
    return prices

def get_result(postcodes):
    result = {"postcodes":
    [{"code": "SW7", "distances": [50, 50, 100], "price": 1000, "lat": 51.4965, "long": -0.1732},
     {"code": "SW1", "distances": [50, 50, 100], "price": 1000, "lat": 51.4493, "long": -0.1201},
     {"code": "SW2", "distances": [50, 50, 100], "price": 1000, "lat": 51.4974, "long": -0.1378},
     {"code": "SW3", "distances": [50, 50, 100], "price": 1000, "lat": 51.4925, "long": -0.1923}]}
    return json.dumps(result)
