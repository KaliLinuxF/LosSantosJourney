import express from 'express';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { socketsConfig } from './config';

const app = express();
const server = http.createServer(app);

const mapHTML = fs.readFileSync(path.join(__dirname, '../../socks/index.html'), 'utf8');
const socketIO = fs.readFileSync(path.join(__dirname, '../../socks/socket.io.js'), 'utf8');
const socketIOMap = fs.readFileSync(path.join(__dirname, '../../socks/socket.io.js.map'), 'utf8');

app.get('/', (req, res) => {
    res.send(mapHTML);
});

app.get('/socket.io.js', (req, res) => {
    res.send(socketIO);
});

app.get('/socket.io.js.map', (req, res) => {
    res.send(socketIOMap);
});

server.listen(socketsConfig.listenPort);
console.log('[SOCKET]: Socket server is ready');

export default server;