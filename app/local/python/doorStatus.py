# Program that changes uses hall effect sensor to work out if the door is open
import RPi.GPIO as GPIO, time

def getDoorStatus():
    return True;