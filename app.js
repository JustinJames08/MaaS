const express = require('express');

const bodyParser = require('body-parser');
const config = require('config');

const app = express();

let port = config.get('port');

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
        "Origin, X-Requested-With, Content-Type, Accept");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,PATCH,DELETE,OPTIONS"
    );
    next();
})

const orsRoutes = require('./routes/routes');

app.use(orsRoutes);

app.use(bodyParser.urlencoded({extended:true}));

app.listen(port, () => {
    console.log(`Server listening to your routes on port ${port}....`);
});