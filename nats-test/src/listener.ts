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
    .setDeliverAllAvailable();

    const subscription = stan.subscribe('ticket:created',options);

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