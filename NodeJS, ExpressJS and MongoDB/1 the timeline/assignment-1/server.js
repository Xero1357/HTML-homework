const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const router = require('./routes/routes.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use(router);

const APP_PORT = 3000;
const server = app.listen(APP_PORT, () => {
    let { address, port } = server.address();
    if (address === '::') {
        address = 'localhost';
    }
    console.log(`Server is listening at http://${address}:${port}`);
});