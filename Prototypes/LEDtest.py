## quick test for the LED colour within the fridge ##
## (because it's a great idea) ##


# the temp the fridge will aim for,
# also the temp the green is at it's maximum
targetTemp = 0;
# the temp at which the red is at it's maximum
upperLimit = 10;

def main(temp):
    print ('Goal: ' + str(targetTemp) + '°C\tUpper Limit: ' + str(upperLimit))
    getLEDColour(20)  # above upper
    getLEDColour(10)  # on upper
    getLEDColour(5)   # midway
    getLEDColour(1.4) # random decimal
    getLEDColour(0)   # target
    getLEDColour(-1)  # below target

def getLEDColour(temp):
    tempDiff = temp - targetTemp
    tempDiffPercent = temp / upperLimit
    red = int(tempDiffPercent * 255)
    blue = int((1 - tempDiffPercent) * 255)
    green = 0
    # keeps data within limits of RGB (255)
    # (is there a nicer way to do this?)
    if (red > 255): red = 255
    elif (red < 0): red = 0
    if (blue > 255): blue = 255
    elif (blue < 0): blue = 0
    print('Current: ' + str(temp) + '°C\tDifference: ' + str (tempDiff) +
          '°C  \tRGB(' + str(red) + ', ' + str(green) + ', ' + str(blue) + ')')
    
main(0)
