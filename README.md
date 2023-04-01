# Store API

Basic API to fetch products from a store. This API is built using Node.js, Express.js and MongoDB.

Deployed on Render: [https://storeapi-hjc5.onrender.com/](https://storeapi-hjc5.onrender.com/)

## Documentation

Documentation for the API can be found at [https://documenter.getpostman.com/view/25069159/2s93RUus4n](https://documenter.getpostman.com/view/25069159/2s93RUus4n)

## Running the API locally

1. Clone the repository
2. Run `npm install` to install the dependencies
3. Create a `.env` file in the root directory and add the following environment variables:

```bash
MONGO_URI=<your_mongo_uri>
PORT=<your_port>
```

4. Run `popluate.js` to populate the database with products

```bash
node populate.js
```

5. Run `npm start` to start the server

> API will be running on `http://localhost:<your_port>` by default
