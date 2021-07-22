import request from 'supertest'
import mongoose from 'mongoose'
import { app } from '../../app'
import { natsWrapper } from '../../nats_wrapper'

const title = 'Ticket'
const price = 12.2

it('returns a 400 if tickedId is invalid', async () => {
  const ticketId = 'NotAValidId'
  await request(app).get(`/api/tickets/${ticketId}`).send().expect(400)
})

it('returns a 401 if the user is not authenticated', async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .send({
      title,
      price
    })
    .expect(401)
})

it('returns a 404 if ticket does not exist', async () => {
  const ticketId = new mongoose.Types.ObjectId().toHexString()
  await request(app)
    .put(`/api/tickets/${ticketId}`)
    .set('Cookie', global.signin())
    .send({
      title,
      price
    })
    .expect(404)
})

it('returns a 401 if the user does not own the ticket', async () => {
  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
      title,
      price
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', global.signin())
    .send({
      title: 'Ticket updated',
      price: 12.5
    })
    .expect(401)
})

it('returns a 400 if the user provides an invalid title', async () => {
  const cookie = global.signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title,
      price
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: '',
      price: 12.5
    })
    .expect(400)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      price: 12.5
    })
    .expect(400)
})

it('returns a 400 if the user provides an invalid price', async () => {
  const cookie = global.signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title,
      price
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title,
      price: -2
    })
    .expect(400)

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title
    })
    .expect(400)
})

it('updates the ticket provided valid inputs', async () => {
  const cookie = global.signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title,
      price
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: title + ' updated',
      price: price + 2
    })
    .expect(200)

  const updatedTicketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
  expect(updatedTicketResponse.body.title).toEqual(title + ' updated')
  expect(updatedTicketResponse.body.price).toEqual(price + 2)
})

it('publishes an event', async () => {
  const cookie = global.signin()

  const response = await request(app)
    .post('/api/tickets')
    .set('Cookie', cookie)
    .send({
      title,
      price
    })

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set('Cookie', cookie)
    .send({
      title: title + ' updated',
      price: price + 2
    })
    .expect(200)

  expect(natsWrapper.client.publish).toHaveBeenCalled()
})

