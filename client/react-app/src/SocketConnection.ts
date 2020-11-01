
export class SocketConnection {
   timer:any = null;
   websocket:any = null;
   constructor() {
    
    this.wsConnect();
   }

   wsConnect() {
    clearInterval(this.timer);
    this.websocket = new WebSocket('ws://quiz.webmonstr.com/quiz/');

    this.websocket.onerror = (evt: any) => {
        this.timer = setTimeout(() => this.wsConnect(),2000);
    }

    this.websocket.onmessage = (message: any) => {
        var message = JSON.parse(message.data)
        console.log(message);
    }

    this.websocket.onclose =  (event: any) => {
        console.log('Close connection');
        this.timer = setTimeout(() => this.wsConnect(),2000);
    };
   }
}