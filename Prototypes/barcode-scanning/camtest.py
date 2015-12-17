#!/usr/bin/env python

import zbar
import requests

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
			  , 'searchtext' : '5011157630113'
			  , 'page' : 1
			  , 'sessionkey' : self.sessionKey }
		r = requests.get(self.tescoUrl, params=payload)
		print r.url
		response = r.json()
		print response
		return response
		
			

ts = TescoSearcher()

proc = zbar.Processor()

proc.parse_config('enable')

device = '/dev/video1'
proc.init(device)

def my_handler(proc, image, closure):
	outpanApiKey = "6b16e7810c5ce6aa2c0bfae25b2ceb46"
	for symbol in image.symbols:
		print 'decoded', symbol.type, 'symbol', '"%s"' % symbol.data
		results = ts.search(symbol.data)
#		print results	

	
proc.set_data_handler(my_handler)

proc.visible = False

proc.active = True

try:
	proc.user_wait()
except zbar.WindowClosed, e:
	pass

