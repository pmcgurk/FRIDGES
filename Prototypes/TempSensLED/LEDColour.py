# -*- coding: latin-1 -*-
# Program that returns the RGB of an LED depending on the tempature given,
# using upper and lower limits specified when setup is ran (other wise uses,
# default values (0, 10). Doesn't ignore green, but should it?

# the default temp the red is at it's maximum
upperLimit = 10
# temp default the blue is at it's maximum
lowerLimit = 0
# between these is when the green is at it's maximum
# wether or not debug messages are shown
verbose = False

def test():
    print('[LEDColour] Running tests:')
    setup(0, 10, True)
    getLEDColour(10)
    getLEDColour(7.5)
    getLEDColour(5)
    getLEDColour(2.5)
    getLEDColour(0)
    print('[LEDColour] Tests complete.')


def setup(lower, upper, verb):
    global lowerLimit, upperLimit, verbose
    verbose = verb
    lowerLimit = lower
    upperLimit = upper
    print ('[LEDColour] Setup with upper limit: ' + str(upperLimit) +
           ', lower limit: ' + str(lowerLimit) + ', verbose messages: ' + str(verbose))

def getLEDColour(temp):
    global lowerLimit, upperLimit, verbose
    red = 0
    blue = 0
    green = 0
    tempDiff = temp - lowerLimit
    # keeps the LED blue if it's under the lower limit
    if (tempDiff > 0):
        red = (temp / upperLimit) * 100
        blue = 100 - red
        green = min(blue, red) * 2
    else:
        blue = 100
    # keeps the values between 0 and 100 (nicer way of doing it?)
    if (red > 100): red = 100
    elif (red < 0): red = 0
    if (blue > 100): blue = 100
    elif (blue < 0): blue = 0
    if (green > 100): green = 100
    elif (green < 0): green = 0
    if (verbose):
        # prints out information, for debugging
        print('[LEDColour] Current: ' + str(temp) + 'C  \tDifference: ' + str (tempDiff) +
              'C  \tRGB(' + str(red) + ', ' + str(green) + ', ' + str(blue) + ')')
    return [int(red), int(green), int(blue)]

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
