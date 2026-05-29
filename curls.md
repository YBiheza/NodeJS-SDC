curl -X POST http://localhost:3000/production \
-H "Content-Type: application/json" \
-d '{
  "type": "margherita",
  "amount": 5
}' - для сервиса продакшн

curl -X POST http://localhost:3000/shipment \
-H "Content-Type: application/json" \
-d '{
  "targetWarehouse": "north",
  "ingredients": [
    {
      "id": "cheese",
      "unit": 200
    },
    {
      "id": "tomatoes",
      "unit": 300
    }
  ],
  "date": "2026-04-20T10:00:00Z"
}' - шипмент


$ curl -X POST http://localhost:3001/orderpizza 
-H "Content-Type: application/json" 
-d '{ 
"item": ["cheese"], 
"country": "US", 
"price": 100, 
"date": "2026-04-20T10:00:00Z", 
"status": "pending" 
}' - прод сервіс

$ curl -X POST http://localhost:3001/orders/ready \
-H "Content-Type: application/json" \
-d '{
  "type": "Margarita",
  "amount": 5
}'

$ curl -X POST http://localhost:3000/produce -H "Content-Type: application/json" -d '{
  "type": "Four seasons",
  "amount": 4
}'
{"success":true}