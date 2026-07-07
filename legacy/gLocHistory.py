import sys
import json
import csv
from time import strftime, gmtime

def parseLocationHistory(inFilePath):
	# grabs lat, lon and time from Google location history json file into python list
	with open(inFilePath) as f:
		print f
		data = json.load(f)
		data = data[u'locations']
		d = [(a[u'latitudeE7'], a[u'longitudeE7'], a[u'timestampMs']) for a in data]
	return d
	
def munge(data):
	# converts lat, lon and timestamp from Google location history data list
	# to zenobase import standard (https://zenobase.com/#/api/create-event)
	zData = []
	
	for rec in data:
		z = {}
		z['lat'] = round(rec[0] * 0.0000001, 7) #latitude
		z['lon'] = round(rec[1] * 0.0000001, 7) #longitude
		z['time'] = strftime("%Y-%m-%dT%H:%M:%S", gmtime(int(rec[2])/1000)) #convert ms since epoch to yyyy-MM-dd'T'hh:mm:ss.SSSZ time
		zData.append(z)

	return zData
	
def exportToZenobase(data):
	return json.dumps(zData)
	
def exportToCSV(data, outFilePath):
	with open(outFilePath, "wb") as f:
		writer = csv.DictWriter(f, data[0].keys())
		writer.writeheader()
		writer.writerows(data)
	
if __name__ == '__main__':
	#takes your Google location history takeout json file and formats it
	#for direct upload into Zenobase
	input = sys.argv[1]
	output = sys.argv[2]
	with open(output, 'w') as out:
		print >> out, exportToZenobase(munge(parseLocationHistory(input)))