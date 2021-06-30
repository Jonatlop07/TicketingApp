import { Message } from 'node-nats-streaming'
import { Listener } from './base_listener'
import { Subjects } from './subjects'
import { TicketCreatedEvent } from './ticket_created_event'

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
  queueGroupName = 'payments-service'

  onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    console.log('Event data!', data)

    msg.ack()
  }
}
