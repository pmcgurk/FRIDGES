# -*- coding: latin-1 -*-
# Program that returns the RGB of an LED depending on the tempature given,
# using upper and lower limits specified when setup is ran (other wise uses,
# default values (0, 10). Currently ignores green.

# TODO: Should it work directly with the GPIO or just stay returning an array?

# the default temp the red is at it's maximum
upperLimit = 10
# temp default the blue is at it's maximum
lowerLimit = 0

def test():
    setup(0, 10)
    getLEDColour(10)
    getLEDColour(5)
    getLEDColour(3.5)
    getLEDColour(0)
    setLowerLimit(1);
    getLEDColour(10)
    getLEDColour(5)
    getLEDColour(3.5)
    getLEDColour(0)
    setUpperLimit(15);
    getLEDColour(10)
    getLEDColour(5)
    getLEDColour(3.5)
    getLEDColour(0)

def setup(lower, upper):
    global lowerLimit, upperLimit;
    lowerLimit = lower
    upperLimit = upper
    print ('[LEDColour] Setup complete with upper limit: ' + str(upperLimit) +
           ', lower limit: ' + str(lowerLimit))
    
def getLEDColour(temp):
    global lowerLimit, upperLimit;
    tempDiff = temp - lowerLimit
    red = int(((temp * (upperLimit - lowerLimit)) / 100) * 255)
    blue = 255 - red
    green = 0
    if (red > 255): red = 255
    elif (red < 0): red = 0
    if (blue > 255): blue = 255
    elif (blue < 0): blue = 0
    print('[LEDColour] Current: ' + str(temp) + '°C\tDifference: ' + str (tempDiff) +
          '°C  \tRGB(' + str(red) + ', ' + str(green) + ', ' + str(blue) + ')')
    return [red, blue, green]

def setLowerLimit(temp):
    global lowerLimit
    lowerLimit = temp
    print ('[LEDColour] Lower Limit changed to: ' + str(lowerLimit))

def getTargetTemp():
    return lowerLimit

def setUpperLimit(temp):
    global upperLimit
    upperLimit = temp
    print ('[LEDColour] Upper Limit changed to: ' + str(upperLimit))

def getUpperLimit():
    return upperLimit
