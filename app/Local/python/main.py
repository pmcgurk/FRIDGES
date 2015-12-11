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

def main():
    LEDColour.setup(3, 20, True)
    while (True):
        #temp = temp + 0.01 # test value as get temperature doesnt work
        temp = round(temperature.getTemperature(), 1)
        RGB = LEDColour.getLEDColour(temp)
        changeLED.changeLED(RGB)
        time.sleep(0.2)
			

main()
