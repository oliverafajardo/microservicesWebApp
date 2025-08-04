import { Listener } from "./base-listener";
import { Message } from "node-nats-streaming";


export class TicketCreatedListener extends Listener {
    subject = 'ticket:created'; //channel we are publishing to
    queueGroupName = 'payments-service'; //queue group name

    onMessage(data: any, msg: Message) {
        console.log('Event data!', data);

        msg.ack();
    }
}

