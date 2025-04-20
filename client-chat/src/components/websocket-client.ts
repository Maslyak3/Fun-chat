import { log } from "console";
import { Socket } from "dgram";
import { renderUserList, User } from "./user-list";

export let activeArray = [];
export let inActiveArray = [];

type ServerMessage = 
  | { id: string; type: MessageType.active; payload: { users: User[] } }
  | { id: string; type: MessageType.inactive; payload: { users: User[] } }

export class WebSocketClient {
    private socket: WebSocket;
    
    constructor() {
        this.socket = new WebSocket('ws://localhost:4000');

        this.socket.addEventListener('open', () => {
            console.log('Websocket connected to the server');
        });

        this.socket.addEventListener('message', (event) => {
            const message = JSON.parse(event.data);
            this.handleWWSMessage(message);
            
            });

        this.socket.addEventListener('error', (error) => {
            console.error('WebSocket error:', error);
            });
    }
    
    public sendRequest(data: { id: string, type: string, payload: unknown }): void { 
            const send = () => {
                this.socket.send(JSON.stringify(data));
            };
    
            if (this.socket.readyState === WebSocket.OPEN) {
                send();
            } else {
                this.socket.addEventListener('open', () => send(), { once: true });
            }
    }
    

    private handleWWSMessage(message: any): void {
        console.log(message);
        
        switch (message.type) {
            case MessageType.active:
                activeArray = message.payload.users;
                renderUserList(activeArray);
                break;
            case MessageType.inactive:
                inActiveArray = message.payload.users;
                renderUserList(inActiveArray);
                break;
            default:
                break;
        }
    }

    public close(): void {
        this.socket.close()
    }
}

export enum MessageType {
    active = 'USER_ACTIVE',
    inactive = 'USER_INACTIVE'
}