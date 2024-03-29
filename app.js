require("dotenv").config()
// async errors
require("express-async-errors")

const express = require("express")
const app = express()
const cors = require("cors")

const connectDB = require("./db/connect")
const productsRouter = require("./routes/products")

const notFoundMiddleware = require("./middleware/not-found")
const errorMiddleware = require("./middleware/error-handler")

// middleware
app.use(express.json())

app.use(cors())

app.get("/", (req, res) => {
  res.send("<h1>Store API </h1> <a href='/api/v1/products'>products</a>")
})

app.use("/api/v1/products", productsRouter)
// products routes

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const port = process.env.port || 5000

const start = async () => {
  try {
    //   connectDB
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () => {
      console.log(`Server is running on port ${port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}
start()
