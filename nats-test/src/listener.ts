import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

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

    // Create and start the listener
    const listener = new TicketCreatedListener(stan);
    listener.listen();
});

//close NATS connection on exit, to prevent the listener from hanging
process.on('SIGINT', () => stan.close());
process.on('SIGTERM', () => stan.close());



