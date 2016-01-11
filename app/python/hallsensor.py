# Import required libraries
import RPi.GPIO as GPIO
import time
import datetime

# Tell GPIO library to use GPIO references
GPIO.setmode(GPIO.BCM)

print "Setup GPIO pin as input"

# Set Switch GPIO as input
GPIO.setup(3 , GPIO.IN)

def sensorCallback1(channel):
  # Called if sensor output changes
  timestamp = time.time()
  stamp = datetime.datetime.fromtimestamp(timestamp).strftime('%H:%M:%S')
  if GPIO.input(3) == 1:
      print "Sensor HIGH " +   stamp
  else:   
      print "Sensor LOW " + stamp

def getSensorState():
  return GPIO.input(3) == 1
  
def main():
  # Wrap main content in a try block so we can
  # catch the user pressing CTRL-C and run the
  # GPIO cleanup function. This will also prevent
  # the user seeing lots of unnecessary error
  # messages.
  
  GPIO.add_event_detect(3, GPIO.BOTH, callback=sensorCallback1)  
  #GPIO.add_event_detect(3, GPIO.RISING, callback=sensorCallback2) 
  
  try:
    # Loop until users quits with CTRL-C
    while True :
      time.sleep(0.1)
        
  except KeyboardInterrupt:
    # Reset GPIO settings
    GPIO.cleanup()
  
if __name__=="__main__":
   main()
