const express = require('express');
const mongodb = require('mongodb');
const router = express.Router();
require('dotenv').config();

router.get('/', async (req, res) => {
    const people = await initialize();
    const response = {};
    response.total = await people.countDocuments();
    const { sortDir, orderBy, pageSize = 10, currentPage = 1 } = req.query;
    if (sortDir && orderBy) {
        const sortObject = {};
        sortObject[orderBy] = sortDir.toLowerCase() === 'asc' ? 1 : -1;
        response.result = await people.find().sort(sortObject).skip((currentPage - 1) * pageSize)
        .limit(parseInt(pageSize)).toArray();
        res.send(response);
    } else {
        response.result = await people.find().sort({ $natural: 1 }).skip((currentPage - 1) * pageSize)
        .limit(parseInt(pageSize)).toArray()
        res.send(response);
    }
});

async function initialize() {
    const dbName = process.env.DB_NAME;
    const url = process.env.DB_URL;
    const collectionName = process.env.DB_COLLECTION;
    console.log(dbName,url,collectionName);
    const client = await mongodb.MongoClient.connect(url);
    const collection = client.db(dbName).collection(collectionName);
    if (client.err) {
        console.log(`[MongoDB connection] ERROR: ${err}`);
    }
    else {
        console.log("[MongoDB connection] SUCCESS");
        return collection;
    }
}

module.exports = router;