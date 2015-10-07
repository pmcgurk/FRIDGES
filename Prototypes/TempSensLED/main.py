# simple main for the temperature sensitive LED prototype
import LEDColour
import temperature
import changeLED
import time

def main():
    LEDColour.setup(0, 10, True)
    while (True):
        temp = temperature.getTemperature()
        RGB = LEDColour.getLEDColour(temp)
        changeLED.changeLED(RGB)
        time.sleep(1)

#LEDColour.test()
main()
