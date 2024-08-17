const express = require('express');
const axios = require('axios');
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

const TELEGRAM_BOT_TOKEN = '7530722949:AAGsOlEpzHHyTFqtZqp2Di16yQRAg0CSiB4'
const TELEGRAM_CHAT_ID = '1872460442'
const TELEGRAM_API_URL = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
const uri = 'mongodb+srv://shareallmedia69:LOdPb5Hm46gGhMv9@cluster.pa042.mongodb.net/?retryWrites=true&w=majority&appName=Cluster';
const dbName = 'intruderHistory';
const collectionName = 'History';
const client = new MongoClient(uri);

app.get('/api/history', async (req, res) => {
    
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

app.post('/api/intruder-alert', async (req, res) => {
    const timestamp = Date.now();
    const message = `Intruder alert detected at ${new Date(timestamp).toLocaleString()}`;

    try {
        await client.connect();
        const db = client.db(dbName);
        const collection = db.collection(collectionName);

        await axios.post(TELEGRAM_API_URL, {
            chat_id: TELEGRAM_CHAT_ID,
            text: message
        });

        const response = await collection.insertOne({
            time: timestamp,
            message: message
        });

        res.status(200).json({ success: true, message: 'Telegram message sent and data saved successfully!' });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ success: false, message: 'Failed to send Telegram message or save data.' });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
