const express = require("express");
const bodyParser = require("body-parser");



const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.get("/hello", (req, res) => res.send("Hello !!!"))
app.post("/hello", (req, res) => res.send(`Post ${req.body.name}`))

app.get("/hello/:name", (req, res) => res.send(`Hello ${req.params.name}`))

app.listen(8000, () => {
    console.log('App listening on port 8000!');
});