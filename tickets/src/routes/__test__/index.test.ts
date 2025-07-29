import request from 'supertest';
import { app } from '../../app';

const createTicket = async () => {
    await request(app)
    .post('/api/tickets')
    .set('Cookie', (await global.signin())[0])
    .send({
        title: 'concert',
        price: 20
    })
    .expect(201);
}

it('can fetch a list of tickets', async () => {
    await createTicket();
    await createTicket();
    await createTicket();

    const response = await request(app)
    .get('/api/tickets')
    .send()
    .expect(200);

    expect(response.body.length).toEqual(3);
})
