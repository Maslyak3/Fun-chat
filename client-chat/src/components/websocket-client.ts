import { Socket } from "dgram";

export class WebSocketClient {
    private socket: WebSocket;

    constructor() {
        this.socket = new WebSocket('ws://localhost:4000');

        this.socket.addEventListener('open', () => {
            console.log('Websocket connected to the server');
        });

        this.socket.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);
            console.log('message fronm server:', message);
        });

        this.socket.addEventListener('error', (error) => {
            console.error('Websocket error:', error);
        });
    }
    public send(data: object): void {
        const json = JSON.stringify(data);
        this.socket.send(json);
        console.log('sent to server:', data);
    }
    public close(): void {
        this.socket.close()
    }
}