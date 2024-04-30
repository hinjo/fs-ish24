const express = require("express"),
  path = require("path"),
  cors = require("cors")

const dotenv = require("dotenv"),
  { Client } = require("pg")

dotenv.config()

const client = new Client({
  connectionString: process.env.PGURI
})

client.connect()

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.static(path.join(path.resolve(), "dist")))

app.get("/api", async (_request, response) => {
  // response.send({ hello: "InternetWorld!" })
  //hämta data från db om vi så vill
  const { rows } = await client.query("SELECT * FROM cities WHERE name = $1", [
    "Goteborg"
  ])

  response.send(rows)

  // response.send("<html><head></head><body>Hello there</body></html>")
})

app.get("/hej", (_request, response) => {
  response.send("hej på dig!!!!!")
})

app.get("/health", (_request, response) => {
  response.status(200).send("OK")
})

app.listen(port, () => {
  console.log(`Redo på http://localhost:${port}/`)
})
