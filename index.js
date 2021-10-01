const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/api/articles/:name", async (req, res) => {
    try {
        const articleName = req.params.name;
        const client = await MongoClient.connect('mongodb://localhost:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db("blog");
        const articleInfo = await db.collection('articles').findOne({ name: articleName })
        res.status(200).json(articleInfo)
        client.close();
    }
    catch {
        res.status(500).json({ message: "Error connecting to db", error })
    }

})
// app.post("/hello", (req, res) => res.send(`Post ${req.body.name}`))

// app.get("/hello/:name", (req, res) => res.send(`Hello ${req.params.name}`))

app.post('/api/articles/:name/add-comments', (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;
    articleInfo[articleName].comments.push({ username, text });
    res.status(200).send(articleInfo[articleName]);
})

app.listen(8000, () => {
    console.log('App listening on port 8000!');
});