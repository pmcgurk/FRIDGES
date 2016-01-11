#!/usr/bin/env python

import zbar
import requests
import shlex
import subprocess

### README
# BarcodeScanner is the class that handles the camera and barcode scanner.
# Instantiate it with a callback function - this function should take 1 parameter which is the barcode found
# begin searching using startSearch()
# stop searching using stopSearch()
#
# TescoSearcher is the class that takes a barcode, and searches tesco groceries for it
# Instantiate it with a callback function - this function should take 1 parameter which is the json returned by tesco
# search by using search(barcode)
#
# an example of how to use this is given in the main() function


class TescoSearcher:
	tescoUrl = 'https://secure.techfortesco.com/tescolabsapi/restservice.aspx'
	sessionKey = None
# https://secure.techfortesco.com/tescolabsapi/restservice.aspx?command=LOGIN&email=alex.mcbride.2013@uni.strath.ac.uk&password=fridges%211&developerkey=Hx6jlIDDybbFaHJMbLZd&applicationkey=50B6A146DE93FA43AAC8
	productsFoundCallback = None

	def __init__(self, productsFoundCallback):
		self.productsFoundCallback = productsFoundCallback

	def login(self):
		payload = { 'command' : 'LOGIN'
			  , 'email' : 'alex.mcbride.2013@uni.strath.ac.uk'
		          , 'password' : 'fridges!1'
			  , 'developerkey' : 'Hx6jlIDDybbFaHJMbLZd'
			  , 'applicationkey' : '50B6A146DE93FA43AAC8' }
		r = requests.get(self.tescoUrl, params=payload)
		print r.url
		response = r.json()
		print response
		if response['StatusCode'] != 0:
			print "Error %d: %s" % (response['StatusCode'], response['StatusInfo'])
		self.sessionKey = response['SessionKey']
		print "setting self.sessionKey to %s" % self.sessionKey


	def search(self, barcode):
		if self.sessionKey is None:
			self.login()
		payload = { 'command' : 'PRODUCTSEARCH'
			  #, 'searchtext' : '5011157630113'
			  , 'searchtext' : barcode
			  , 'page' : 1
			  , 'sessionkey' : self.sessionKey }
		r = requests.get(self.tescoUrl, params=payload)
		print r.url
		response = r.json()
		with open('../data.json', 'w') as outfile:
            json.dump({response
                    }, outfile, sort_keys=True, indent=4, separators=(',', ': '))
		#return response
		self.productsFoundCallback(response)


class BarcodeScanner:
	callback = None
	zbarProc = None
	ffplay = None
	ffplayArgs = shlex.split("/home/pi/bin/ffplay -loglevel panic -s 640x400 -f video4linux2 -i /dev/video1")

	def __init__(self, callback):
		self.callback = callback

	@staticmethod
	def barcodeFoundHandler(proc, image, closure):
		for symbol in image.symbols:
			print 'decoded', symbol.type, 'symbol', '"%s"' % symbol.data
			closure.callback(symbol.data)

	def startSearch(self):
		self.startZbar()
		self.startFFMPEG()

	def startZbar(self):
		self.zbarProc = zbar.Processor()
		self.zbarProc.parse_config('enable')
		self.zbarProc.init('/dev/video1')
		self.zbarProc.set_data_handler(BarcodeScanner.barcodeFoundHandler, self)
		self.zbarProc.visible = False
		self.zbarProc.active = True

	def startFFMPEG(self):
		ffplayArgs = shlex.split("/home/pi/bin/ffplay -loglevel panic -s 640x400 -f video4linux2 -i /dev/video1")
		self.ffplay = subprocess.Popen(ffplayArgs)

	def stopSearch(self):
		self.zbarProc.active = False
		self.ffplay.terminate()


def main():
	def tescoCallback(json):
		print json

	ts = TescoSearcher(tescoCallback)

	def barcodeCallback(barcode):
		ts.search(barcode)

	bs = BarcodeScanner(barcodeCallback)

	bs.startSearch()

	try:
		while True:
			pass
	except KeyboardInterrupt:
		pass
	finally:
		bs.stopSearch()



if __name__ == "__main__":
	main()
