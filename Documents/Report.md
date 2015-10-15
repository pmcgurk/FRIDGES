
CS413 ACE Group 7

Scott Henderson, Candy Mortimer, Alexis McBride, Raniel Mark Lafferty and Paul Junior ‘PJ’ McGurk

----

Contents  
Introduction  
Assessment of Capabilities  

----

# Introduction
The project is to create a product using either an Arduino and/or Raspberry Pi that will be a part of the Internet of things. The Internet of things is about taking everyday objects and embedding them with software, electronics and networking capabilities so that they can sense the environment around them and then send and receive data. The idea, after much thought and discussion will be to create a smart fridge. This idea will not only have a physical benefit to its application but also an environmental one, as from the start the design is centred on trying to reduce food waste and energy consumption.

----

# Assessment of Capabilities
## Requirements
The device must be able to support a touchscreen, have a thermometer connected, webcam to act as barcode scanner, wireless capabilities and be able to run a web server.

## Arduino

| Arduino             |                   |
|---------------------|-------------------|
| Microcontroller     | 16 MHz ATmega328P |
| SRAM                | 2KB               |
| Flash Memory        | 32KB              |
| USB 2.0             | None              |
| HDMI                | None              |
| Audio output        | None              |
| Digital I/O pins    | 14                |
| Analogue input pins | 6                 |

## Raspberry Pi
![Raspberry Pi](https://upload.wikimedia.org/wikipedia/commons/4/45/Raspberry_Pi_-_Model_A.jpg)

The Raspberry Pi is a small form-factor ARM based computer. It is a very popular system that has a healthy development ecosystem. The RPi can run a custom Linux-based operating system, called Raspbian, allowing fairly high level development and integration with lower-level peripherals such as GPIOs.

There are several models of Raspberry Pi available:

|                | Raspberry Pi Model A                                 | Raspberry Pi 2                  |
|----------------|------------------------------------------------------|---------------------------------|
| CPU            | 700 MHz Low Power ARM1176JZ-F Applications Processor | 900MHz quad-core ARM Cortext-A7 |
| RAM            | 256MB                                                | 1GB                             |
| Ethernet port  | None                                                 | Yes                             |
| USB 2.0        | 1 port                                               | 4 ports                         |
| HDMI           | Full HDMI port                                       | Full HDMI port                  |
| Audio output   | 3.5mm audio jack                                     | 3.5mm audio jack                |
| Number of GPIO | 17                                                   | 40                              |

## Choice

We have chosen to go for the Raspberry Pi 2. The reason we chose a RPi over an Arduino was that we needed the higher performance that the RPi line offers in order to serve our web pages and do the barcode scanning in software. Furthermore we wanted internet connectivity and we felt this would be easier to achieve in the Linux based Pi. The reason we chose to use the model 2 instead of the model A was the better connectivity for peripherals in terms of USB ports and available GPIOs, with the higher performance an added bonus.

## Hardware Design
#### Main Parts
##### RGB LED
An RGB LED (Red Green Blue Light Emitting Diode) is a small light which has three different diodes within it, capable of emitting three types of light. Each pin controls a different colour, with the longest pin being the PLUS. Using PWM (Pulse Width Modulation), we can dim and lighten the different colours to give a range of colours.

This is being used within the project as a visual display of the temperature of the fridge, which Blue representing when the temperature is near the ideal temperature, and red

![RGB LED Diagram](rgb_led_diagram.jpg)

| Colour | Wave Length | Forward Voltage | Forward Current | Luminosity |
|--------|-------------|-----------------|-----------------|------------|
| Red    | 623nm       | 2.0V            | 20ma            | 2800mcd    |
| Green  | 623nm       | 3.2V            | 20ma            | 6500mcd    |
| Blue   | 623nm       | 3.2V            | 20ma            | 1200mcd    |

##### Resistors
A resistor is a device which reduces the flow of current within a circuit. This can be used to protect elements from high current, as well as other things.

This is being used within the project to protect the RGB LED, and within the temperature part of the circuit to work out the resistance of the themistor (see below).

| Value | Quantity |
|-------|----------|
| 1kΩ   | 2        |
| 470Ω  | 3        |

##### Thermistor
A themistor is a resistor which is sensitive to temperature. The resistance of the thermistor is used to work out the temperature of it's surroundings using a variety of different math techniques, notably the Steinhart–Hart equation.

This is being used within the project to work out the temperature within the fridge, allowing us to monitor it in real-time.

![Thermistor Diagram](thermistor_diagram.jpg)
###### Thermistor symbol

##### Raspberry Pi Camera
blah blah

##### Raspberry Pi Touch Screen
blah blah
