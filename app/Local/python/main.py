## main program ##

## gets latest data from all the python programs, database ##
## updates LED, parses into JSON object ##

## ie data = {temp: 12.2, doorOpen: false, products: {name: "Sandwich", date:"01/01/01"}} etc##

# simple main for the temperature sensitive LED prototype
import LEDColour
import temperature
import changeLED
import time
import RPi.GPIO as GPIO
import json


def main():
    LEDColour.setup(15, 30, True)
    while (True):
        temp = round(temperature.getTemperature(), 1) #get temperature
	doorOpen = False # change to hall effect result
        changeLED.changeLED(LEDColour.getLEDColour(temp))
        time.sleep(0.2)
	print json.dumps({'temp': temp, 'doorOpen': doorOpen, 'products:': {'name': "sandwich"}}, sort_keys=True, indent=4, separators=(',', ': '))

main()
