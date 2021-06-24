import nats, { Message } from 'node-nats-streaming'
import { randomBytes } from 'crypto'

console.clear()

const stan = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222'
})

stan.on('connect', () => {
  console.log('Listener connnected to nats')

  stan.on('close', () => {
    console.log('nats connection closed')
    process.exit()
  })

  const options = stan
    .subscriptionOptions()
    .setManualAckMode(true)
    .setDeliverAllAvailable()
    .setDurableName('accounting-service')

  const subscription = stan.subscribe('ticket:created', 'queueGroup', options)

  subscription.on('message', (msg: Message) => {
    const data = msg.getData()

    if (typeof data === 'string') {
      console.log(`Received event #${msg.getSequence()}, with data: ${data}`)
    }

    msg.ack()
  })
})

process.on('SIGINT', () => stan.close())
process.on('SIGTERM', () => stan.close())
