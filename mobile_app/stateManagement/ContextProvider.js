#include <dht.h>
dht DHT;
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 20, 4);

#include "Countimer.h"
Countimer tdown;

#define bt_set    A3
#define bt_up     A2
#define bt_down   A1
#define bt_start  A0

#define DHT22_PIN 2  

int heat_PIN = 6;
int buzzer = 7;
int tilt_PIN = 5;
int tilt_LED_PIN = 13;

float hum;
float temp;

long seconds = 1;
int mode = 0, dd = 0, mm = 0, hh = 0, secs = -1, humidBuzz = 5;
unsigned long lastTempUpdateTime = 0;
const unsigned long tempUpdateInterval = 1000;

int count = 0;

unsigned long previousMillis = 0;

const long interval = 1000;

bool isRunning = false;
bool alarm = false;
bool started = false;
bool isMotorTilt = false;

void setup() {
  Serial.begin(9600);

  pinMode(bt_set, INPUT_PULLUP);
  pinMode(bt_up, INPUT_PULLUP);
  pinMode(bt_down, INPUT_PULLUP);
  pinMode(bt_start, INPUT_PULLUP);
  pinMode(heat_PIN, OUTPUT);
  pinMode(tilt_PIN, OUTPUT);
  pinMode(buzzer, OUTPUT);
  pinMode(tilt_LED_PIN, OUTPUT);
  digitalWrite(tilt_PIN, HIGH);
  digitalWrite(heat_PIN, HIGH);

  lcd.init();
  lcd.backlight();
  tdown.setInterval(print_time, 1000);
  lcd.setCursor(0,1);
  lcd.print("   EGG  INCUBATOR");
  lcd.setCursor(0,2);
  lcd.print("      GROUP  1");
  delay(1000);
  lcd.clear();
}

void loop() {
  tdown.run();
  getTemp();
  lcdDisplay();
  tiltMotor();
  if (digitalRead(bt_set) == LOW) {
    if(humidBuzz == 10){
      digitalWrite(buzzer, LOW);
      humidBuzz = 0;
    }else{
      if(alarm){
      stopBuzzer();
      empty();
    }else{
      if(isRunning){
      tdown.stop();
      isRunning = false;
      started = false;
      empty();
    }else{
      mode++;
      if (mode >= 4) {
        mode = 0;
      }
    }
    }
    delay(200); 
    }
  }

   if (digitalRead(bt_up) == LOW) {
    if(humidBuzz == 10){
      digitalWrite(buzzer, LOW);
      humidBuzz = 0;
    }else{
      if(alarm){
       stopBuzzer();
       empty();
    }else{
       if(!isRunning && dd < 25){
         if(mode == 1){
      if(mm < 59){
        mm ++;
      }else{
        mm = 0;
        hh++;
      }
    }else{
      if(mode == 2){
        if(hh < 23){
          hh ++;
        }else{
          hh = 0;
          dd ++;
        }
      }else{
        if(mode == 3){
          dd ++;
        }
      }
    }  
      delay(200);
    }
    }
    }
  }
 
  if (digitalRead(bt_down) == LOW) {
   if(humidBuzz == 10){
    digitalWrite(buzzer, LOW);
    humidBuzz = 0;
   }else{
    if(alarm){
       stopBuzzer();
       empty();
   }else{
     if(!isRunning){
      if(mode == 1){
      if(mm > 0){
        mm --;
      }
    }else{
      if(mode == 2){
        if(hh > 0){
        hh --;
      }
      }else{
        if(mode == 3){
           if(dd > 0){
        dd --;
      }
        }
      }
    }
    delay(200);
    }
   }
   }
  }

   if (digitalRead(bt_start) == LOW) {
    if(humidBuzz == 10){
      digitalWrite(buzzer, LOW);
      humidBuzz = 0;
    }else{
      if(!started){
       if(mm > 0){
      seconds += mm * 60;
      mm = 0;
      }
      if(hh > 0){
        seconds += hh * 3600;
        hh = 0;
      }
      if(dd > 0){
        seconds += dd * 86400;
        dd = 0;
      }
      started = true;
    }
    if(alarm){
      stopBuzzer();
      empty();
    }else{
      if(seconds > 1){
          tdown.start();
          isRunning = true;
      }
    }
    delay(200);
  }
    }
}

void getTemp() {
  unsigned long currentMillis = millis();

  if (currentMillis - lastTempUpdateTime >= tempUpdateInterval) {
    lastTempUpdateTime = currentMillis;
    
    int chk = DHT.read22(DHT22_PIN);
    hum = DHT.humidity;
    temp = DHT.temperature;

    if(temp >= 37) {//37
        digitalWrite(heat_PIN, HIGH);
    } else {
        digitalWrite(heat_PIN, LOW);
    }
    if(hum >= 55 && hum <= 65){
      digitalWrite(buzzer, LOW);
      humidBuzz = 5;
    }else{
      if(humidBuzz >= 0 && humidBuzz < 10){
        humidBuzz ++;
      }else{
        digitalWrite(buzzer, HIGH);
      }
    }
  }
}


 void print_time() {
  if(seconds > 0 ){
    seconds --;
    if(secs < 59){
      secs ++;
    }else{
      if(mm < 59){
        mm ++;
        secs = 0;
      }else{
        if(hh < 23){
          hh ++;
          mm = 0;
          secs = 0;
        }else{
          dd ++;
          hh = 0;
          mm = 0;
          secs = 0;
        }
      }
    }
  }else{
    tdown.stop();
    isRunning = false;
    alarm = true;
    mode = 0;
    digitalWrite(buzzer, HIGH);
  }
 }

 void lcdDisplay(){
  lcd.setCursor(5, 0);
if(alarm){
  lcd.print("Time is up     ");
}else{
  if(isRunning){
  lcd.print("dd:hh:mm:ss");
}else{
  if (mode == 0) {
  lcd.print(" Set timer   ");
} else if (mode == 1) {
  lcd.print("  Set  mm    ");
} else if (mode == 2) {
  lcd.print("  Set  hh   ");
} else if (mode == 3) {
  lcd.print("  Set  dd     ");
}
}
}
lcd.print("");

lcd.setCursor(5, 1);
   if(dd < 10){
    lcd.print("0");
   }
  lcd.print(dd);
  lcd.print(":");
   
   if (hh < 10) {
     lcd.print("0");
   }
    lcd.print(hh);
   lcd.print(":");

   
   if (mm < 10) {
     lcd.print("0");
   }
    lcd.print(mm);

   lcd.print(":");
     if (secs < 10) {
     lcd.print("0");
   }
   if(secs == -1){
    lcd.print("0");
   }else{
    lcd.print(secs);
   }
    lcd.print("  ");

   lcd.setCursor(0, 2);
    lcd.print("Temp: ");
    lcd.print(temp);
    lcd.print(" C      ");
    lcd.setCursor(0, 3);
    lcd.print("Humid: ");
    lcd.print(hum);
    lcd.print(" %      ");
}

void empty(){
      mode = 0;
      secs = -1;
      dd = 0;
      hh = 0;
      mm = 0;
      seconds = 1;
}

void stopBuzzer(){
  alarm = false;
  started = false;
  humidBuzz = 0;
  digitalWrite(buzzer, LOW);
}

void tiltMotor(){
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
  
    previousMillis = currentMillis;

    if(isMotorTilt){
      if(count < 9){
        count ++;
      }else{
        digitalWrite(tilt_PIN, HIGH);
        digitalWrite(tilt_LED_PIN, LOW);
        isMotorTilt = false;
        count = 0;
      }
    }else{
      if(count < 7200){
      count++;
     }else{
      digitalWrite(tilt_PIN, LOW);
      digitalWrite(tilt_LED_PIN, HIGH);
      isMotorTilt = true;
      count = 0;
     }
    }
  }
}#include <dht.h>
dht DHT;
#include <LiquidCrystal_I2C.h>
LiquidCrystal_I2C lcd(0x27, 20, 4);

#include "Countimer.h"
Countimer tdown;

#define bt_set    A3
#define bt_up     A2
#define bt_down   A1
#define bt_start  A0

#define DHT22_PIN 2  

int heat_PIN = 6;
int buzzer = 7;
int tilt_PIN = 5;
int tilt_LED_PIN = 13;

float hum;
float temp;

long seconds = 1;
int mode = 0, dd = 0, mm = 0, hh = 0, secs = -1, humidBuzz = 5;
unsigned long lastTempUpdateTime = 0;
const unsigned long tempUpdateInterval = 1000;

int count = 0;

unsigned long previousMillis = 0;

const long interval = 1000;

bool isRunning = false;
bool alarm = false;
bool started = false;
bool isMotorTilt = false;

void setup() {
  Serial.begin(9600);

  pinMode(bt_set, INPUT_PULLUP);
  pinMode(bt_up, INPUT_PULLUP);
  pinMode(bt_down, INPUT_PULLUP);
  pinMode(bt_start, INPUT_PULLUP);
  pinMode(heat_PIN, OUTPUT);
  pinMode(tilt_PIN, OUTPUT);
  pinMode(buzzer, OUTPUT);
  pinMode(tilt_LED_PIN, OUTPUT);
  digitalWrite(tilt_PIN, HIGH);
  digitalWrite(heat_PIN, HIGH);

  lcd.init();
  lcd.backlight();
  tdown.setInterval(print_time, 1000);
  lcd.setCursor(0,1);
  lcd.print("   EGG  INCUBATOR");
  lcd.setCursor(0,2);
  lcd.print("      GROUP  1");
  delay(1000);
  lcd.clear();
}

void loop() {
  tdown.run();
  getTemp();
  lcdDisplay();
  tiltMotor();
  if (digitalRead(bt_set) == LOW) {
    if(humidBuzz == 10){
      digitalWrite(buzzer, LOW);
      humidBuzz = 0;
    }else{
      if(alarm){
      stopBuzzer();
      empty();
    }else{
      if(isRunning){
      tdown.stop();
      isRunning = false;
      started = false;
      empty();
    }else{
      mode++;
      if (mode >= 4) {
        mode = 0;
      }
    }
    }
    delay(200); 
    }
  }

   if (digitalRead(bt_up) == LOW) {
    if(humidBuzz == 10){
      digitalWrite(buzzer, LOW);
      humidBuzz = 0;
    }else{
      if(alarm){
       stopBuzzer();
       empty();
    }else{
       if(!isRunning && dd < 25){
         if(mode == 1){
      if(mm < 59){
        mm ++;
      }else{
        mm = 0;
        hh++;
      }
    }else{
      if(mode == 2){
        if(hh < 23){
          hh ++;
        }else{
          hh = 0;
          dd ++;
        }
      }else{
        if(mode == 3){
          dd ++;
        }
      }
    }  
      delay(200);
    }
    }
    }
  }
 
  if (digitalRead(bt_down) == LOW) {
   if(humidBuzz == 10){
    digitalWrite(buzzer, LOW);
    humidBuzz = 0;
   }else{
    if(alarm){
       stopBuzzer();
       empty();
   }else{
     if(!isRunning){
      if(mode == 1){
      if(mm > 0){
        mm --;
      }
    }else{
      if(mode == 2){
        if(hh > 0){
        hh --;
      }
      }else{
        if(mode == 3){
           if(dd > 0){
        dd --;
      }
        }
      }
    }
    delay(200);
    }
   }
   }
  }

   if (digitalRead(bt_start) == LOW) {
    if(humidBuzz == 10){
      digitalWrite(buzzer, LOW);
      humidBuzz = 0;
    }else{
      if(!started){
       if(mm > 0){
      seconds += mm * 60;
      mm = 0;
      }
      if(hh > 0){
        seconds += hh * 3600;
        hh = 0;
      }
      if(dd > 0){
        seconds += dd * 86400;
        dd = 0;
      }
      started = true;
    }
    if(alarm){
      stopBuzzer();
      empty();
    }else{
      if(seconds > 1){
          tdown.start();
          isRunning = true;
      }
    }
    delay(200);
  }
    }
}

void getTemp() {
  unsigned long currentMillis = millis();

  if (currentMillis - lastTempUpdateTime >= tempUpdateInterval) {
    lastTempUpdateTime = currentMillis;
    
    int chk = DHT.read22(DHT22_PIN);
    hum = DHT.humidity;
    temp = DHT.temperature;

    if(temp >= 37) {//37
        digitalWrite(heat_PIN, HIGH);
    } else {
        digitalWrite(heat_PIN, LOW);
    }
    if(hum >= 55 && hum <= 65){
      digitalWrite(buzzer, LOW);
      humidBuzz = 5;
    }else{
      if(humidBuzz >= 0 && humidBuzz < 10){
        humidBuzz ++;
      }else{
        digitalWrite(buzzer, HIGH);
      }
    }
  }
}


 void print_time() {
  if(seconds > 0 ){
    seconds --;
    if(secs < 59){
      secs ++;
    }else{
      if(mm < 59){
        mm ++;
        secs = 0;
      }else{
        if(hh < 23){
          hh ++;
          mm = 0;
          secs = 0;
        }else{
          dd ++;
          hh = 0;
          mm = 0;
          secs = 0;
        }
      }
    }
  }else{
    tdown.stop();
    isRunning = false;
    alarm = true;
    mode = 0;
    digitalWrite(buzzer, HIGH);
  }
 }

 void lcdDisplay(){
  lcd.setCursor(5, 0);
if(alarm){
  lcd.print("Time is up     ");
}else{
  if(isRunning){
  lcd.print("dd:hh:mm:ss");
}else{
  if (mode == 0) {
  lcd.print(" Set timer   ");
} else if (mode == 1) {
  lcd.print("  Set  mm    ");
} else if (mode == 2) {
  lcd.print("  Set  hh   ");
} else if (mode == 3) {
  lcd.print("  Set  dd     ");
}
}
}
lcd.print("");

lcd.setCursor(5, 1);
   if(dd < 10){
    lcd.print("0");
   }
  lcd.print(dd);
  lcd.print(":");
   
   if (hh < 10) {
     lcd.print("0");
   }
    lcd.print(hh);
   lcd.print(":");

   
   if (mm < 10) {
     lcd.print("0");
   }
    lcd.print(mm);

   lcd.print(":");
     if (secs < 10) {
     lcd.print("0");
   }
   if(secs == -1){
    lcd.print("0");
   }else{
    lcd.print(secs);
   }
    lcd.print("  ");

   lcd.setCursor(0, 2);
    lcd.print("Temp: ");
    lcd.print(temp);
    lcd.print(" C      ");
    lcd.setCursor(0, 3);
    lcd.print("Humid: ");
    lcd.print(hum);
    lcd.print(" %      ");
}

void empty(){
      mode = 0;
      secs = -1;
      dd = 0;
      hh = 0;
      mm = 0;
      seconds = 1;
}

void stopBuzzer(){
  alarm = false;
  started = false;
  humidBuzz = 0;
  digitalWrite(buzzer, LOW);
}

void tiltMotor(){
  unsigned long currentMillis = millis();

  if (currentMillis - previousMillis >= interval) {
  
    previousMillis = currentMillis;

    if(isMotorTilt){
      if(count < 9){
        count ++;
      }else{
        digitalWrite(tilt_PIN, HIGH);
        digitalWrite(tilt_LED_PIN, LOW);
        isMotorTilt = false;
        count = 0;
      }
    }else{
      if(count < 7200){
      count++;
     }else{
      digitalWrite(tilt_PIN, LOW);
      digitalWrite(tilt_LED_PIN, HIGH);
      isMotorTilt = true;
      count = 0;
     }
    }
  }
}