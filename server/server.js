"use strict";

const express = require('express'); 
const { json, urlencoded } = require('express');

const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors'); // Just incase

// INFO: https://stackoverflow.com/a/11745114
// import fs from 'fs';
// const http = require('http');
// const https = require('https';

const dotenv = require('dotenv');
dotenv.config();

const isDev = process.env.NODE_ENV.includes('dev');

const apiEndpoints = require('./endpoints');

// console.log(process.env);

const PORT = process.env.PORT || process.env.HTTP_SERVER_PORT || 8080;
// const HTTP_PORT = process.env.HTTP_SERVER_PORT || 8080;
// const HTTPS_PORT = process.env.HTTPS_SERVER_PORT || 8443;

const app = express();

app.use(helmet())
app.use(morgan(isDev ? 'dev' : 'tiny'));
app.use(cors());

// app.set('trust-policy', 1);

app.use(json());

app.use('/api/v1', apiEndpoints.v1);

app.use((err, req, res, next) => {
    if (err.status) {
        res.statusCode = err.status;
    } else {
        res.statusCode = 500;
    }
    return res.json({
        message: err.message,
        stack: isDev ? err.stack : null
    });
});

// INFO: This is done automatically via hosting (env.PORT) on Heroku
// INFO: https://stackoverflow.com/a/11745114
// const privateKey  = fs.readFileSync('sslcert/server.key', 'utf8');
// const certificate = fs.readFileSync('sslcert/server.crt', 'utf8');
// const credentials = {key: privateKey, cert: certificate};

// const httpServer = http.createServer(app);
// const httpsServer = https.createServer(credentials, app);

// httpServer.listen(HTTP_PORT, () => console.log(`HTTP running on ${HTTP_PORT}`));
// httpsServer.listen(HTTPS_PORT, () => {console.log(`HTTPS running on ${HTTPS_PORT}`);});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));