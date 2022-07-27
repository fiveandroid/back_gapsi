
const express = require("express")
const cors = require("cors")
const routerUsers = require("./routes/user.route")
const routerProviders = require("./routes/provider.route")

const app = express();

// Middleware
app.use(cors())
app.use(express.json())

// Middleware de ruta
app.use("/users", routerUsers)
app.use("/providers", routerProviders)

app.get("/", (request, response) => {
    response.json({
      message: "Endpoint de Home, Bienvenido a nuestra API de Test"
    })
  })


module.exports = app