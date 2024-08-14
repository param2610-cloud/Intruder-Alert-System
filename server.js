const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 3000;

const allowedOrigins = ['http://192.168.0.158:5500',"https://param2610-cloud.github.io/"];

const corsOptions = {
    origin: (origin, callback) => {
        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(cors(corsOptions));

const uri = 'mongodb+srv://shareallmedia69:LOdPb5Hm46gGhMv9@cluster.pa042.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
const dbName = 'intruderHistory';
const collectionName = 'History';

app.get('/api/history', async (req, res) => {
    const client = new MongoClient(uri);
    
    try {
        console.log("hit")
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        const documents = await collection.find({}).toArray();
        res.json(documents); // Send data as JSON response
    } catch (err) {
        console.error('Error retrieving documents:', err);
        res.status(500).send('Error retrieving documents');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
