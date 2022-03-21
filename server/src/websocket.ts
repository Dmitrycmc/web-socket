import * as WebSocket from "ws";
import * as http from 'http';

export const createWebSocket = (server: http.Server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws: WebSocket) => {
        //connection is up, let's add a simple simple event
        ws.on('message', (message: string) => {

            //log the received message and send it back to the client
            console.log('[received] %s', message);
            const answer = `Hello, you sent: ${message}`;
            ws.send(answer);
            console.log('[sent] %s', answer);
        });

        //send immediatly a feedback to the incoming connection
        console.log("[opened] Connection opened");
        ws.send('Hi there, I am a WebSocket server');

        let i = 0;

        function schedule() {
            setTimeout(() => {
                ws.send(i);
                console.log('[sent] %s', i++);
                schedule();
            }, Math.floor(Math.random() * 5000) + 5000);
        }
        schedule();
    });
};