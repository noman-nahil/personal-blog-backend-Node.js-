const express = require("express");
const bodyParser = require("body-parser");
const { MongoClient } = require('mongodb');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

const withDB = async (operations) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        const db = client.db("blog");
        await operations(db);
        client.close();
    }
    catch {
        res.status(500).json({ message: "Error connecting to db", error })
    }
}

app.get("/api/articles/:name", async (req, res) => {
    withDB(async (db) => {
        const articleName = req.params.name;
        const articleInfo = await db.collection('articles').findOne({ name: articleName })
        res.status(200).json(articleInfo)
    }, res);

});
app.post('/api/articles/:name/add-comments', (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;

    withDB(async (db) => {
        const articleInfo = await db
            .collection("articles")
            .findOne({ name: articleName });
        await db.collection("articles").updateOne(
            { name: articleName },
            {
                $set: {
                    comments: articleInfo.comments.concat({ username, text }),
                },
            }
        );
        const updatedArticleInfo = await db
            .collection("articles")
            .findOne({ name: articleName });
        res.status(200).json(updatedArticleInfo);
    }, res);
});

app.listen(8000, () => {
    console.log('App listening on port 8000!');
});