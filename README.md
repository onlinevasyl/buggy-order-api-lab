# Fixed Order API (Built with GitHub Copilot)

A small Express REST API for creating and managing orders. Orders are stored in memory, so they are cleared whenever the server restarts.

## Requirements

- Node.js
- npm

## Setup and run

```bash
npm install
npm start
```

The server listens on port `3000` by default. Set `PORT` to use another port:

```bash
PORT=4000 npm start
```

The update and delete endpoints require an HS256 JWT. Set `JWT_SECRET` to the signing secret in the server environment before starting the API:

```bash
JWT_SECRET='your-local-secret' npm start
```

Do not commit or share the secret. Requests to protected endpoints must include:

```text
Authorization: Bearer <JWT>
```

## API

Base URL: `http://localhost:3000/api/v1/orders`

| Method | Path | Description | Authentication |
|--------|------|-------------|----------------|
| `GET` | `/` | List orders | No |
| `POST` | `/` | Create an order | No |
| `GET` | `/status?status=pending` | List orders with the requested status | No |
| `GET` | `/summary` | Return order counts and total revenue | No |
| `GET` | `/:id` | Get one order | No |
| `PUT` | `/:id` | Update an order | JWT required |
| `DELETE` | `/:id` | Delete an order | JWT required |

Supported order statuses are `pending`, `processing`, `shipped`, `delivered`, and `cancelled`; the status query is case-insensitive.

### Create an order

The request body must be JSON. `customerName` must be a non-empty string, `items` must be a non-empty array of items with a non-empty `name` and positive `price` and `quantity`, and `shippingAddress` must be an object.

```bash
curl -i -X POST http://localhost:3000/api/v1/orders \
  -H 'Content-Type: application/json' \
  -d '{
    "customerName": "Alice",
    "items": [
      { "name": "Book", "price": 10.5, "quantity": 2 }
    ],
    "shippingAddress": {
      "street": "123 Main St"
    }
  }'
```

Successful creation returns `201 Created` with the order, including its generated ID, timestamp, pending status, and calculated total.

### List orders by status

```bash
curl -i 'http://localhost:3000/api/v1/orders/status?status=pending'
```

### Update or delete an order

Include a valid JWT in the `Authorization` header:

```bash
curl -i -X PUT http://localhost:3000/api/v1/orders/ORDER_ID \
  -H 'Authorization: Bearer <JWT>' \
  -H 'Content-Type: application/json' \
  -d '{"customerName":"Alice Smith"}'

curl -i -X DELETE http://localhost:3000/api/v1/orders/ORDER_ID \
  -H 'Authorization: Bearer <JWT>'
```

## Tests

Run the configured Jest command with:

```bash
npm test
```
