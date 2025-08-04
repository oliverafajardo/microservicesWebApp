import { Stan, Message } from 'node-nats-streaming';

export abstract class Listener {
    abstract subject: string;
    abstract queueGroupName: string;
    abstract onMessage(data: any, msg: Message): void;
    private client: Stan;
    protected ackWait = 5 * 1000;


    constructor(client: Stan) {
        this.client = client;
    }

    subscriptionOptions() {
        return this.client.subscriptionOptions()
        .setManualAckMode(true)
        .setDeliverAllAvailable()
        .setDurableName(this.queueGroupName);
    }

    listen() {
        console.log('Listening on subject:', this.subject);
        console.log('Queue group:', this.queueGroupName);
        
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        );

        subscription.on('message', (msg: Message) => {
            console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);
            
            const parsedData = this.parseMessage(msg);
            if (parsedData) {
                this.onMessage(parsedData, msg);
            }
        });

        subscription.on('error', (err: Error) => {
            console.error(err);
        });
    }

    parseMessage(msg: Message) {
            const data = msg.getData();
            try {
                return typeof data === 'string' 
                    ? JSON.parse(data) 
                    : JSON.parse(data.toString('utf8'));
            } catch (err) {
                console.log('Error parsing message:', data);
                return null;
            }
    }

}