# Program that changes the LED by modifying the GPIO
import RPi.GPIO as GPIO
import time

# Configure the Pi to use the BCM (Broadcom) pin names, rather than the pin positions
GPIO.setmode(GPIO.BCM)
GPIO.setup(8, GPIO.OUT)
GPIO.setup(16, GPIO.OUT)
GPIO.setup(13, GPIO.OUT)

# Start Pulse Width Modulation (PWM) on the red, green and blue channels to 
# control the brightness of the LEDs.
# Follow this link for more info on PWM: http://en.wikipedia.org/wiki/Pulse-width_modulation
pwmRed = GPIO.PWM(8, 500)
pwmRed.start(100)

pwmGreen = GPIO.PWM(13, 500)
pwmGreen.start(100)

pwmBlue = GPIO.PWM(16, 500)
pwmBlue.start(100)

def changeLED(RGB):
    changeRed(RGB[0])
    changeGreen(RGB[1])
    changeBlue(RGB[2])

def changeGreen(value):
	#print ('[changeLED] Changed Green to value: ' + str(value));
	pwmGreen.ChangeDutyCycle(float(value))

def changeBlue(value):
	#print ('[changeLED] Changed Blue to value: ' + str(value));
	pwmBlue.ChangeDutyCycle(float(value))

def changeRed(value):
	#print ('[changeLED] Changed Red to value: ' + str(value));
	pwmRed.ChangeDutyCycle(float(value))
