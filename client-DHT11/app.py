import Adafruit_DHT
import time
import requests
import json

sensor = Adafruit_DHT.DHT11
pin=4
while True:
    humidity, temperature = Adafruit_DHT.read_retry(sensor,pin)
    
    # API body variable
    payload_severity = ""
    payload_message = ""
    
    if humidity is not None and temperature is not None:
        msg = f"Temperature = {temperature} Humidity = {humidity}"
        payload = {
            "location" : "my-raspberry-pi",
            "temperature" : temperature,
            "humidity" : humidity

        }
        print(msg)
        payload_severity = "info"
        payload_message = json.dumps(payload)
    else:
        print("Failed to get reading. Try again!")
        payload_severity = "error"
        payload_message = "Hardware issue occured"

    try:
        requests.post("http://localhost:4500/publish",data= {
            "severity": payload_severity,
            "message": payload_message
        })
    except requests.exceptions.ConnectionError as e:
        print(f"Connection error occured. Please check API Server")
    time.sleep(1)