import { Subject } from 'rxjs';

export class SocketConnection {
   private static instance: SocketConnection;
   timer:any = null;
   websocket:any = null;
   newMessage$: Subject<any>;
   newQuestion$: Subject<any>;
   updateAccount$: Subject<any>;

   public static getInstance(): SocketConnection {
        if (!SocketConnection.instance) {
            SocketConnection.instance = new SocketConnection();
        }
        return SocketConnection.instance;
    }

   constructor() {
    this.newMessage$ = new Subject();
    this.newQuestion$ = new Subject();
    this.updateAccount$ = new Subject();
    this.wsConnect();
   }

   wsConnect() {
    clearInterval(this.timer);
    // this.websocket = new WebSocket('ws://localhost:7777/quiz/');
    this.websocket = new WebSocket('ws://quiz.webmonstr.com:7777/quiz/');

    this.websocket.onerror = (evt: any) => {
        this.timer = setTimeout(() => this.wsConnect(),2000);
    }

    this.websocket.onmessage = (message: any) => {
        let msg = JSON.parse(message.data)
        console.log(msg);
        if(msg.type === 'message') {
            this.newMessage$.next(msg.message);
        }
        if(msg.type === 'new_question') {
            this.newQuestion$.next(msg);
        }
        if(msg.type === 'update_account') {
            this.updateAccount$.next(msg);
        }
    }

    this.websocket.onclose =  (event: any) => {
        console.log('Close connection');
        this.timer = setTimeout(() => this.wsConnect(),2000);
    };
   }
}