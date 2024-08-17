#include <SPI.h>
#include <Ethernet.h>
#include <Wire.h>
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x27, 16, 2);
byte mac[] = { 0xDE, 0xAD, 0xBE, 0xEF, 0xFE, 0xED };
IPAddress server(192, 168, 254, 152);
EthernetClient client;

int pump1Pin = 7;
int pump2Pin = 6;
int readingLength = 0;

int prevPotValue = 0;

float calibration_value = 22.95; //23.48
float manul_callib = 0;
int phval = 0; 
unsigned long int avgval; 
int buffer_arr[10], temp;

int readingL = 5;
 
float ph_act;
float prev_ph_act;

boolean pump1Run = false;
boolean pump2Run = false;

boolean isChanged = false;

void setup() {
  Serial.begin(9600);
  lcd.init();
  lcd.backlight();
  lcd.setCursor(0, 0);
  lcd.print("Initializing...");
  Ethernet.begin(mac);
  Wire.begin();
  pinMode(pump1Pin, OUTPUT);
  pinMode(pump2Pin, OUTPUT);
  digitalWrite(pump1Pin, HIGH);
  digitalWrite(pump2Pin, HIGH);
  
  delay(1000);
  lcd.clear();
}
void loop() {
  findPh();
  sendData();

  int potValue = analogRead(A1) / 7.3;
  float callib = potValue * 0.1;

  if (potValue != prevPotValue) {
    isChanged = true;
      if(callib < 6.5 && callib > 0){
      manul_callib = callib - 6.5;
    }else{
      if(callib > 7.5){
        manul_callib = callib - 7.5;
      }else{
         manul_callib = 0;
      }
  }
    prevPotValue = potValue;
  }else{
    isChanged = false;
  }

  if(readingLength > readingL){
   if(ph_act < 5.7 && ph_act >= 0){
    digitalWrite(pump1Pin, LOW);
    digitalWrite(pump2Pin, HIGH);
    if(pump1Run){
      delay(30);
    }else{
      delay(260);
    }
    digitalWrite(pump1Pin, HIGH); 
    pump1Run = true;
    delay(1000);
  }else{
    if(ph_act > 5.9 && ph_act <= 14){
    digitalWrite(pump1Pin, HIGH);
    digitalWrite(pump2Pin, LOW);
     if(pump2Run){
      delay(30);
    }else{
      delay(260);
    }
    digitalWrite(pump2Pin, HIGH); 
    pump2Run = true;
    delay(1000);
    }else{
    digitalWrite(pump1Pin, HIGH);
    digitalWrite(pump2Pin, HIGH);
    }
  }
  readingLength = 0;
}

lcd.setCursor(0, 1);
if(isChanged){
  lcd.print("Cal: ");
  lcd.print(manul_callib, 1);
  lcd.print("  ");
  delay(1000);
}else{
  lcd.print("             ");
}

}

void findPh(){
  for(int i=0; i<10; i++) { 
    buffer_arr[i] = analogRead(A0);
    delay(100);
  }
  for(int i=0; i<9; i++) {
    for(int j=i+1; j<10; j++) {
      if(buffer_arr[i] > buffer_arr[j]) {
        temp = buffer_arr[i];
        buffer_arr[i] = buffer_arr[j];
        buffer_arr[j] = temp;
      }
    }
  }
  avgval = 0;
  for(int i=2; i<8; i++)
    avgval += buffer_arr[i];
  float volt = (float)avgval * 5.3 / 1024 / 6;
  float final_callib = calibration_value + manul_callib;
  float init_ph = -5.70 * volt + final_callib;
 
  ph_act = round(init_ph * 10.0) / 10.0;
  displayPh();
  readingLength ++;
}

void displayPh(){
  lcd.setCursor(0, 0);
  lcd.print("PH value: ");
  if(ph_act >=0 && ph_act <= 14){
    
    lcd.print(ph_act, 1);
  }else{
    lcd.print("INV");
  }
  lcd.print("  ");
}

void sendData() {
  if(ph_act >=0 && ph_act <= 14){
        if (ph_act != prev_ph_act) {
        prev_ph_act = ph_act;
        Serial.println("Connecting");
      if (client.connect("hyper-frost-fig.glitch.me", 80)) {
        Serial.println("Connected to server");
        String data = String(ph_act);
        client.print("POST /ph HTTP/1.1\r\n");
        client.print("Host: hyper-frost-fig.glitch.me\r\n");
        client.print("Content-Type: text/plain\r\n");
        client.print("Content-Length: ");
        client.println(data.length());
        client.print("User-Agent: Arduino/1.0\r\n");
        client.print("\r\n");
        client.println(data);

        delay(200);
    
        while (client.available()) {
          char c = client.read();
        }
        client.stop();
      } else {
        Serial.println("Connection to server failed");
      }
    } 
  }
}
