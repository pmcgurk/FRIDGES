# simple main for the temperature sensitive LED prototype
import LEDColour
import temperature
import changeLED
import time
import RPi.GPIO as GPIO

def main():
    LEDColour.test()
    LEDColour.setup(0, 10, True)
    temp = -1.0
    while (True):
        temp = temp + 0.0001 # test value as get temperature doesnt work
        #temp = temperature.getTemperature()
        RGB = LEDColour.getLEDColour(temp)
        changeLED.changeLED(RGB)
        time.sleep(0.0001)
			

main()