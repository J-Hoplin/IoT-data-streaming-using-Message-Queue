import requests
import time
import psutil

while True:
    memory_usage = psutil.virtual_memory().percent
    cpu_usage = psutil.cpu_percent(1)
    print(f"CPU : {cpu_usage}% RAM : {memory_usage}%")
    influx_point = f"resource,location=my-raspberry-pi,indicator=client-resource cpu={cpu_usage},memory={memory_usage}"
    try:
        requests.post("http://127.0.0.1:4500/publish", data={
            "message": influx_point,
            "severity": "info",
            "exchangeName": "client-resource-exchange",
            "exchangeType": "direct"
        })
    except requests.exceptions.ConnectionError as e:
        print(f"Connection error occured. Please check API Server")
    time.sleep(1)
