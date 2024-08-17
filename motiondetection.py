from machine import Pin
import time



led2 = Pin(2, Pin.OUT)

buzzer = Pin(16, Pin.OUT)
motion_sensor = Pin(15, Pin.IN)
def alert_system(state):
    
    led2.value(state)
    
    
    buzzer.value(state)

try:
    while True:
        
        if motion_sensor.value() == 1:
            print("Motion detected!")
            alert_system(1)  
            time.sleep(2)  
        else:
            alert_system(0)  
            
        time.sleep(0.1)  
        
except KeyboardInterrupt:
    print("Program stopped")
    alert_system(0)  

