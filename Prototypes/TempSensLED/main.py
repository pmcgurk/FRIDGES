# simple main for the temperature sensitive LED prototype
import LEDColour
import temperature
import changeLED
import time
import RPi.GPIO as GPIO

def main():
    LEDColour.test()
    LEDColour.setup(15, 20, True)
    while (True):
        #temp = temp + 0.01 # test value as get temperature doesnt work
        temp = round(temperature.getTemperature(), 1)
        RGB = LEDColour.getLEDColour(temp)
        changeLED.changeLED(RGB)
        time.sleep(0.2)
			

main()
