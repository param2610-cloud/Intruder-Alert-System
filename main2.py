from machine import Pin
import time
import urequest as rq
import internet


stat = True

led = Pin(9, Pin.OUT)
led2 = Pin(2, Pin.OUT)
buzzer = Pin(16, Pin.OUT)
motion_sensor = Pin(15, Pin.IN)

def alert_system(state):
    led2.value(state)
    buzzer.value(state)

def sys_on():
    led.value(1)
    time.sleep(0.7)
    led.value(0)
    time.sleep(0.7)

try:
    while True:
        
        if motion_sensor.value() == 1:
            print("Motion detected!")

            if stat == True:
                rq.post("https://intruder-alert-system.onrender.com/api/intruder-alert")
                stat = False

            alert_system(1)  
            time.sleep(2)  
        else:
            alert_system(0)
            sys_on()
            stat = True
            
        time.sleep(0.1)  
        
except KeyboardInterrupt:
    print("Program stopped")
    alert_system(0)  
