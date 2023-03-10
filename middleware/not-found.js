const notFound = (req, res) => {
  res.status(404).json("Route does not exits")
}

module.exports = notFound
