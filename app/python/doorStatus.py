# Program that changes uses hall effect sensor to work out if the door is open
import hallsensor

def getDoorStatus():
    return hallsensor.getSensorState()
