import * as express from 'express';
import * as http from 'http';
import {AddressInfo} from "net";
import {createWebSocket} from "./websocket";

const path = require("path");

const app = express();

app.use(express.static(path.join(__dirname, '..', 'client')));

//initialize a simple http server
const server = http.createServer(app);

createWebSocket(server);

//start our server
server.listen(process.env.PORT || 8999, () => {
    console.log(`Server started on port ${(server.address() as AddressInfo).port} :)`);
});