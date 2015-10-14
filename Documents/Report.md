
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
