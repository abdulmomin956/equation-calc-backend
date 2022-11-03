const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

app.use(express.json());
app.use(cors())

app.get('/', (req, res) => {
    res.send('running the server with' + port)
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.usnai.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect();

        const dataCollection = client.db('equation-calc').collection('data');

        app.get('/operands', async (req, res) => {
            const fetch = dataCollection.find({})
            const movie = await fetch.toArray();
            res.send(movie)
        })

    } finally {
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log('Listening the port' + port)
})