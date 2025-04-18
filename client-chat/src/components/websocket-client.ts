import { Socket } from "dgram";
import { User } from "./user-list";

export class WebSocketClient {
    private socket: WebSocket;
    //private pendingRequests = new Map<number, (users: User[]) => void>();

    constructor() {
        this.socket = new WebSocket('ws://localhost:4000');

        this.socket.addEventListener('open', () => {
            console.log('Websocket connected to the server');
        });

        this.socket.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);
            console.log(message);
            
            //const resolve = this.pendingRequests.get(message.id);
            // if (resolve && message.payload?.users) {
            //     resolve(message.payload.users);
            //     this.pendingRequests.delete(message.id);
            // }
            });

        this.socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
            });
    }
    public sendRequest(data: { id: string, type: string, payload: unknown }, resolve: ((users: User[]) => void) | null = null): void {
        // this.pendingRequests.set(data.id, resolve);
        const json = JSON.stringify(data);
        this.socket.send(json);
        console.log('sent to server:', data);
    }
    public close(): void {
        this.socket.close()
    }
}