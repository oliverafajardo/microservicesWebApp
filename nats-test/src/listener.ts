import nats, { Message } from 'node-nats-streaming';
import { randomBytes } from 'crypto';

console.clear();

//connect to NATS
const stan = nats.connect('ticketing', `listener-${randomBytes(4).toString('hex')}`, {
    url: 'http://localhost:4222'
});

//listen for events
stan.on('connect', () => {
    console.log('Listener connected to NATS');

    stan.on('close', () => {
        console.log('NATS connection closed!');
        process.exit();
    });

    const options = stan.
    subscriptionOptions().
    setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('accounting-service');

    const subscription = stan.subscribe(
        'ticket:created',
        'queue-group-name',
        options);

    subscription.on('message', (msg: Message) => {  
        const data = msg.getData();

        if (typeof data === 'string') {
            console.log(`Received event #${msg.getSequence()}, with data: ${data}`);
        }

        msg.ack(); //acknowledge the message from the queue
    });
});

//close NATS connection on exit, to prevent the listener from hanging
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());


abstract class Listener {
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
        const subscription = this.client.subscribe(
            this.subject,
            this.queueGroupName,
            this.subscriptionOptions()
        );

        subscription.on('message', (msg: Message) => {
            console.log(`Message received: ${this.subject} / ${this.queueGroupName}`);
        });

        const parsedData = this.parseMessage(msg);
        this.onMessage(parsedData, msg);

        subscription.on('error', (err) => {
            console.error(err);
        });
    }

    parseMessage(msg: Message) {
            const data = msg.getData();
            return typeof data === 'string' 
                ? JSON.parse(data) 
                : JSON.parse(data.toString('utf8'));
    }

}

class TicketCreatedListener extends Listener {
    subject = 'ticket:created'; //channel we are publishing to
    queueGroupName = 'payments-service'; //queue group name

    onMessage(data: any, msg: Message) {
        console.log('Event data!', data);

        msg.ack();
    }
}