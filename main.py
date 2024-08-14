from machine import Pin
import time

led_pin = 21
sensor_pin = 22

led = Pin(led_pin, Pin.OUT)
sensor = Pin(sensor_pin, Pin.IN)

state = 0
val = 0

while True:
    val = sensor.value()  

    if val == 1:  
        led.on()  

        if state == 0:
            print("Motion detected!")
            state = 1  
    else:
        led.off()  

        if state == 1:
            print("Motion stopped!")
            state = 0  

    
    time.sleep(0.1)