import nats from 'node-nats-streaming';


//connect to NATS
const stan = nats.connect('ticketing', 'abc', {
    url: 'http://localhost:4222'
});

//listen for events
stan.on('connect', () => {
    console.log('Publisher connected to NATS');

    const data = JSON.stringify({
        id:  '123',
        title: 'concert',
        price: 20
    });

    // Listen for 'rs' command
    process.stdin.on('data', (data) => {
        const input = data.toString().trim();
        if (input === 'rs' || input === 'publish') {
            const eventData = JSON.stringify({
                id: '123',
                title: 'concert',
                price: 20
            });
            stan.publish('ticket:created', eventData, () => {
                console.log('Event published');
            });
        }
    });
    
    // Publish initial event
    const eventData = JSON.stringify({
        id: '123',
        title: 'concert',
        price: 20
    });
    stan.publish('ticket:created', eventData, () => {
        console.log('Initial event published');
    });
});

