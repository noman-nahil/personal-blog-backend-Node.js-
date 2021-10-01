const express = require("express")

const app = express()

app.get("/hello", (req, res) => res.send("Hello"))

app.listen(8000, () => {
    console.log('App listening on port 8000!');
});