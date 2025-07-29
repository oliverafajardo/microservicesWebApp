import request from 'supertest'
import { app } from '../../app'
import { Ticket } from '../../models/ticket'

it ('has a route handler listening to /api/tickets for post requests', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .send({})

    expect(response.status).not.toEqual(404)
})

it('can only be accessed if the user is signed in', async () => {
   await request(app)
        .post('/api/tickets')
        .send({
            title: 'Valid Title',
            price: 10
        })
        .expect(401)
})

it('returns a status other than 401 if the user is signed in', async () => {
    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', (await global.signin()))
        .send({ })
    expect(response.status).not.toEqual(401);
})


it('returns an error if an invalid title is provided', async () => {
  await request(app)
        .post('/api/tickets')
        .set('Cookie',  (await global.signin())[0])
        .send({
            title: '',
            price: -10
        })
        .expect(400);

    await request(app)
        .post('/api/tickets')
        .set('Cookie',  (await global.signin())[0])
        .send({
            price: 10
        })
        .expect(400);
})

it('returns an error if an invalid price is provided', async () => {
    await request(app)
        .post('/api/tickets')
        .set('Cookie',  (await global.signin())[0])
        .send({
            title: 'Valid Title',
            price: -10
        })
        .expect(400);

        await request(app)
        .post('/api/tickets')
        .set('Cookie',  (await global.signin())[0])
        .send({
            title: 'Valid Title'
        })
        .expect(400);
})

//when this is ran, there is 0 tickets in the database
it('creates a ticket with valid inputs', async () => {
    let tickets = await Ticket.find({});
    expect(tickets.length).toEqual(0);

    const title = 'DHDHDKDSKJ';

    await request(app)
        .post('/api/tickets')
        .set('Cookie',  (await global.signin()))
        .send({
            title,
            price: 20,
        })
        .expect(201);
        
        tickets = await Ticket.find({});
        expect(tickets.length).toEqual(1);
        expect(tickets[0].title).toEqual(title);

  
});