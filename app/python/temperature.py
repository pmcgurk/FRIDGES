# temperature program modified from https://github.com/simonmonk/pi_starter_kit/blob/master/04_thermometer.py
import RPi.GPIO as GPIO, random as r
import time, math 
GPIO.setmode(GPIO.BCM)

a_pin = 17
b_pin = 23

fiddle_factor = 0.9;

def discharge():
    GPIO.setup(a_pin, GPIO.IN)
    GPIO.setup(b_pin, GPIO.OUT)
    GPIO.output(b_pin, False)
    time.sleep(0.01)

def charge_time():
    GPIO.setup(b_pin, GPIO.IN)
    GPIO.setup(a_pin, GPIO.OUT)
    GPIO.output(a_pin, True)
    t1 = time.time()
    counter = 0
    while not GPIO.input(b_pin):
        pass
    t2 = time.time()
    return (t2 - t1) * 1000000 # microseconds


def analog_read():
    discharge()
    return charge_time()

def read_resistance():
    n = 100
    total = 0;
    for i in range(1, n):
        total = total + analog_read()
    reading = total / float(n)
    resistance = reading * 6.05 - 939
    return resistance

def temp_from_r(R):
    B = 3800.0          # The thermistor constant - change this for a different thermistor
    R0 = 1000.0         # The resistance of the thermistor at 25C -change for different thermistor
    t0 = 273.15         # 0 deg C in K
    t25 = t0 + 25.0     # 25 deg C in K
    inv_T = 1/t25 + 1/B * math.log(R/R0)
    T = 1/inv_T - t0
    return T * fiddle_factor

def getTemperature():
	temp_c = temp_from_r(read_resistance())
	reading_str = "{:.2f}".format(temp_c)
	return temp_c
