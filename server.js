const express = require("express")

const server = express()

server.all("/", (req, res) => {
  res.send("The bot is running!")
})

function keepAlive() {
  server.listen(3000, () => {
    console.log("Server is ready!")
  })
}

module.exports = keepAlive
