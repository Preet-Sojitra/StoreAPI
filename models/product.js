const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "product name must be provided"],
  },
  price: {
    type: Number,
    require: [true, "product price name must be provided"],
  },
  featured: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  company: {
    type: String,
    //   We want company to have only these 4 values
    //   enum: ["ikea", "liddy", "caressa", "marcos"],
    //   enum with custom error message
    enum: {
      values: ["ikea", "liddy", "caressa", "marcos"],
      // We will access the value that is passed by user and it it does not match we will show error message
      message: "{VALUE} is not supported",
    },
  },
})

module.exports = mongoose.model("Product", productSchema)
