const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = require('./router/people');

app.use('/router/people', posts);

const port = process.env.PORT || 5050;

app.listen(port, () => console.log(`Server started on port ${port}`));