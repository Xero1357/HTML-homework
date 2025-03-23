const express = require("express");
const path = require("path");
const app = express();
const router = require('./data'); 
app.use(express.static(path.join(__dirname, 'public')));

app.use(router);

const APP_PORT = 3000;
const server = app.listen(APP_PORT, () => {
    let { address, port } = server.address();
    if (address === '::') {
        address = 'localhost';
    }
    console.log(`Server is listening at http://${address}:${port}`);
});