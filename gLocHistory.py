import json

def parseLocationHistory(filePath):
	# converts Google location history json file to python list
	with open(filePath):
		data = json.load(data["locations"])
		d = [a[u'latitudeE7'], a[u'longitudeE7'], a[u'timestampMs'] for a in data]
	return d
	
def mungeForZenobase(data):
	# converts lat, lon and timestamp from Google location history data list
	# to zenobase import standard (https://zenobase.com/#/api/create-event)
	zData = []
	
	for rec in data:
		z = {}
		z['lat'] = rec[0] * 0.0000001 #latitude
		z['lon'] = rec[1] * 0.0000001 #longitude
		z['time'] = strftime("%Y-%m-%dT%H:%M:%S", rec[2]/1000) #convert ms since epoch to yyyy-MM-dd'T'hh:mm:ss.SSSZ time
		zData.append(z)
	
	return json.dumps(zData)
	
def googleLocationHistoryForZenobase(filePath):
	#takes your Google location history takeout json file and formats it
	#for direct upload into Zenobase
	return mungeForZenobase(parseLocationHistory(filePath))