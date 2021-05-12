curl --header "Content-Type: application/json" --request POST --data '{"username":"xyz","password":"123","host":"localhost","port":"4222","clientType":"Dataloss","topic":"quest","message":"{'TagDataType':'Date','TagValue':'1990-01-01T00:00:00.000+00:00','TimeStamp':'2019-12-11T05:55:18.009+00:00','Value_Quality':3}","PublishCount":"100000","PublishInterval":"1000"}' http://localhost:6062/client

curl --header "Content-Type: application/json" --request DELETE --data '{"clientType":"Dataloss","clientName":"8u9nk"}' http://localhost:6062/client

curl --request GET http://localhost:6062/client

curl --header "Content-Type: application/json"  --request POST --data '{"clientType":"Dataloss","clientName":"x1l6y"}' http://localhost:6062/logs

-------------------------------------------------------------------------------------------------------------

curl --header "Content-Type: application/json" --request POST --data '{"username":"xyz","password":"123","host":"localhost","port":"4222","clientType":"Throughput","topic":"quest","message":"{'TagDataType':'Date','TagValue':'1990-01-01T00:00:00.000+00:00','TimeStamp':'2019-12-11T05:55:18.009+00:00','Value_Quality':3}","PublishCount":"300000"}' http://localhost:6062/client

curl --header "Content-Type: application/json" --request DELETE --data '{"clientType":"Throughput","clientName":"8u9nk"}' http://localhost:6062/client

curl --request GET http://localhost:6062/client

curl --header "Content-Type: application/json"  --request POST --data '{"clientType":"Throughput","clientName":"x1l6y"}' http://localhost:6062/logs


------------------------------------------------------------------------------------------------------------
curl --header "Content-Type: application/json" --request POST --data '{"username":"xyz","password":"123","host":"localhost","port":"4222","clientType":"Publisher","topic":"quest.1","message":"{'TagDataType':'Date','TagValue':'1990-01-01T00:00:00.000+00:00','TimeStamp':'2019-12-11T05:55:18.009+00:00','Value_Quality':3}","PublishCount":"100000","PublishInterval":"1000"}' http://localhost:6062/client

curl --header "Content-Type: application/json" --request DELETE --data '{"clientType":"Publisher","clientName":"8u9nk"}' http://localhost:6062/client

curl --request GET http://localhost:6062/client

curl --header "Content-Type: application/json"  --request POST --data '{"clientType":"Publisher","clientName":"x1l6y"}' http://localhost:6062/logs

-------------------------------------------------------------------------------------------------------------
curl --header "Content-Type: application/json" --request POST --data '{"username":"xyz","password":"123","host":"localhost","port":"4222","clientType":"Subscriber","topic":"quest.>","SubscribeInterval":"1000"}' http://localhost:6062/client

curl --header "Content-Type: application/json" --request DELETE --data '{"clientType":"Subscriber","clientName":"8u9nk"}' http://localhost:6062/client

curl --request GET http://localhost:6062/client

curl --header "Content-Type: application/json"  --request POST --data '{"clientType":"Subscriber","clientName":"x1l6y"}' http://localhost:6062/logs


-----------------------------------------------------------------------------------------------------------

curl --header "Content-Type: application/json" --request POST --data '{"username":"xyz","password":"123","host":"localhost","port":"4222","clientType":"PublisherLatency","topic":"quest","message":"{'TagDataType':'Date','TagValue':'1990-01-01T00:00:00.000+00:00','TimeStamp':'2019-12-11T05:55:18.009+00:00','Value_Quality':3},{'TagDataType':'Date','TagValue':'1990-01-01T00:00:00.000+00:00','TimeStamp':'2019-12-11T05:55:18.009+00:00','Value_Quality':3}","PublishCount":"100000","PublishInterval":"1000"}' http://localhost:6062/client

curl --header "Content-Type: application/json" --request DELETE --data '{"clientType":"PublisherLatency","clientName":"8u9nk"}' http://localhost:6062/client

curl --request GET http://localhost:6062/client

curl --header "Content-Type: application/json"  --request POST --data '{"clientType":"PublisherLatency","clientName":"x1l6y"}' http://localhost:6062/logs


-----------------------------------------------------------------------------------------------------------

curl --header "Content-Type: application/json" --request POST --data '{"username":"xyz","password":"123","host":"localhost","port":"4222","clientType":"SubscriberLatency","topic":"quest","SubscribeInterval":"1000"}' http://localhost:6062/client

curl --header "Content-Type: application/json" --request DELETE --data '{"clientType":"SubscriberLatency","clientName":"8u9nk"}' http://localhost:6062/client

curl --request GET http://localhost:6062/client

curl --header "Content-Type: application/json"  --request POST --data '{"clientType":"SubscriberLatency","clientName":"x1l6y"}' http://localhost:6062/logs


------------------------------------------------------------------------------------------------------------
curl --header "Content-Type: application/json" --request POST --data '{"username":"xyz","password":"123","host":"localhost","port":"4222","clientType":"PublisherPayload","topic":"quest","payload":"500","PublishCount":"500","PublishInterval":"1000"}' http://localhost:6062/client

curl --header "Content-Type: application/json" --request DELETE --data '{"clientType":"PublisherPayload","clientName":"8u9nk"}' http://localhost:6062/client

curl --request GET http://localhost:6062/client

curl --header "Content-Type: application/json"  --request POST --data '{"clientType":"PublisherPayload","clientName":"x1l6y"}' http://localhost:6062/logs


-------------------------------------------------------------------------------------------------------------
curl --header "Content-Type: application/json" --request POST --data '{"username":"xyz","password":"123","host":"localhost","port":"4222","clientType":"SubscriberPayload","topic":"quest","SubscribeInterval":"1000"}' http://localhost:6062/client

curl --header "Content-Type: application/json" --request DELETE --data '{"clientType":"SubscriberPayload","clientName":"8u9nk"}' http://localhost:6062/client

curl --request GET http://localhost:6062/client

curl --header "Content-Type: application/json"  --request POST --data '{"clientType":"SubscriberPayload","clientName":"x1l6y"}' http://localhost:6062/logs
