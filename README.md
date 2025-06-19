# API projekt 

## Airbean är ett API projekt för att beställa koffe, byggt med Node.js, Express, SQLite.


### Installation 

```bash
git clone https://github.com/mohammedyasin4/Airbean-API
cd Airbean-API
npm start
npm run dev 
```

#### Dependencies 

* express@^5.1.0
* sqlite3@^5.1.7
* uuid@^11.1.0
* nodemon@^3.1.10

##### Databas struktur
```
-- Användare
CREATE TABLE Users (
  user_id TEXT PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Produkter
CREATE TABLE Products (
  product_id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL NOT NULL
);

-- Beställningar
CREATE TABLE Orders (
  order_id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id TEXT,
  total_price DECIMAL,
  status TEXT DEFAULT 'pending',
  FOREIGN KEY(user_id) REFERENCES Users(user_id)
);

-- Beställningsdetaljer
CREATE TABLE OrderItems (
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  FOREIGN KEY(order_id) REFERENCES Orders(order_id),
  FOREIGN KEY(product_id) REFERENCES Products(product_id)
);
```
###### Anrop exampel

```
# Skapa användare
 POST http://localhost:3000/users

# Hämta meny
 http://localhost:3000/menu

# Göra beställning
 POST http://localhost:3000/orders \
"Content-Type: application/json" \
'{
    "user_id": "ditt-id-här",
    "items": [
      {"product_id": 1, "quantity": 2},
      {"product_id": 3, "quantity": 1}
    ]
  }'
```
# Realtidsfunktionalitet med WebSockets
   ```bash
   npm install ws
```
Med WebSockets skulle vi kunna få realtidsuppdateringar i appen: När en kund gör en beställning får baristan en notifikation direkt på skärmen, samtidigt som alla anslutna enheter uppdateras automatiskt. Om orderstatus ändras. Och när kaffet är klart får kunden en notis direkt. Dessutom kan vi visa levande statistik, som antalet väntande beställningar och beräknad väntetid, som uppdateras i realtid.
Detta är bra av flera anledningar: Användarna slipper manuellt uppdatera sidan samt  får omedelbara notiser när deras kaffe är klart, så de vet precis när de ska hämta det. För personalen blir arbetet smidigare eftersom nya beställningar dyker upp direkt på skärmen.

# Mohammed Yasin: Utvecklare 
https://github.com/mohammedyasin4
