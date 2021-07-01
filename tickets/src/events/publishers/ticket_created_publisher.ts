import {
  Publisher,
  Subjects,
  TicketCreatedEvent
} from '@jonatlop-ticketing/common'

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated
}
