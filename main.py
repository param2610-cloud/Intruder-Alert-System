from machine import Pin
from datetime import datetime
from pymongo import MongoClient
import requests
import time

# Motion detection setup
led_pin = 21
sensor_pin = 22

led = Pin(led_pin, Pin.OUT)
sensor = Pin(sensor_pin, Pin.IN)

state = 0
val = 0

TELEGRAM_BOT_TOKEN = '7530722949:AAGsOlEpzHHyTFqtZqp2Di16yQRAg0CSiB4'
TELEGRAM_CHAT_ID = '1872460442'
TELEGRAM_API_URL = 'https://api.telegram.org/bot{}/sendMessage'.format(TELEGRAM_BOT_TOKEN)
client = MongoClient("mongodb+srv://shareallmedia69:LOdPb5Hm46gGhMv9@cluster.pa042.mongodb.net/?retryWrites=true&w=majority&appName=Cluster")  # Replace with your MongoDB connection string
db = client["intruderHistory"]
collection = db["History"]

def send_telegram_message(message):
    payload = {'chat_id': TELEGRAM_CHAT_ID, 'text': message}
    try:
        requests.post(TELEGRAM_API_URL, json=payload)
        return True
    except Exception as e:
        print("Error sending message:", e)
        return False


while True:
    val = sensor.value()

    if val == 1:
        led.on()
        if state == 0:
            print("Motion detected!")
            message_sent = send_telegram_message("Motion detected!")
            data = {
                "time": datetime.now(),
                "message": "Motion Detected",
            }
            result = collection.insert_one(data)
            state = 1
    else:
        led.off()
        if state == 1:
            print("Motion stopped!")
            message_sent = send_telegram_message("Motion stopped!")
            
            state = 0

    time.sleep(0.1)
