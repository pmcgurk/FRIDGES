## main program ##

## gets latest data from all the python programs, database ##
## updates LED, parses into JSON object ##

## ie data = {temp: 12.2, doorOpen: false, products: {name: "Sandwich", date:"01/01/01"}} etc##

# simple main for the temperature sensitive LED prototype
import LEDColour, changeLED, temperature, MySQLdb, time, doorStatus, RPi.GPIO as GPIO, json
from time import gmtime, strftime

db = MySQLdb.connect(host="localhost", user="root", passwd='', db="FRIDGES")

def main():
    cursor = db.cursor()
    cursor.execute("SELECT * from Products")
    data = cursor.fetchone()
    if data is None:
        print ("Logged in wrong")
    else:
        print(str(data))
    target = 0
    maxTemp = 10
    LEDColour.setup(target, maxTemp, True)
    while (True):
        temp = round(temperature.getTemperature(), 1) #get temperature
        doorOpen = doorStatus.getDoorStatus()
        changeLED.changeLED(LEDColour.getLEDColour(temp))
        time.sleep(1)
        updateTime = strftime("%Y-%m-%d %H:%M:%S", gmtime())
        with open('../data.json', 'w') as outfile:
            json.dump({'time': updateTime, 'temp': temp, 'target': target, 'doorOpen': doorOpen, 
                       'products': [    {'pid': 1, 'name': "sandwich", 'date': "14-01-2016"},
                                        {'pid': 2, 'name': "cucumber", 'date': "15-01-2016"},]
                        }, outfile, sort_keys=True, indent=4, separators=(',', ': '))
main()
