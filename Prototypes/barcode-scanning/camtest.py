#!/usr/bin/env python

import zbar
import requests
import shlex
import subprocess

class TescoSearcher:
	tescoUrl = 'https://secure.techfortesco.com/tescolabsapi/restservice.aspx'
	sessionKey = None
# https://secure.techfortesco.com/tescolabsapi/restservice.aspx?command=LOGIN&email=alex.mcbride.2013@uni.strath.ac.uk&password=fridges%211&developerkey=Hx6jlIDDybbFaHJMbLZd&applicationkey=50B6A146DE93FA43AAC8
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
		return response
		
			
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
	#ts = TescoSearcher()
	#proc = zbar.Processor()
	#proc.parse_config('enable')
	#device = '/dev/video1'
	#proc.init(device)

	#def my_handler(proc, image, closure):
	#	outpanApiKey = "6b16e7810c5ce6aa2c0bfae25b2ceb46"
	#	for symbol in image.symbols:
	#		print 'decoded', symbol.type, 'symbol', '"%s"' % symbol.data
	#		results = ts.search(symbol.data)
	#		print results	

	#	
	#proc.set_data_handler(my_handler)
	#proc.visible = False
	#proc.active = True

	#ffplayArgs = shlex.split("/home/pi/bin/ffplay -loglevel panic -s 640x400 -f video4linux2 -i /dev/video1")
	#ffplay = subprocess.Popen(ffplayArgs)

	#try:
	#	#proc.user_wait()
	#	while True:
	#		pass
	#except KeyboardInterrupt:
	#	pass
	#finally:
	#	ffplay.terminate()

	ts = TescoSearcher()

	def barcodeCallback(barcode):
		results = ts.search(barcode)
		print results	

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
