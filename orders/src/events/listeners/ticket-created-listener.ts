import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@trctickets/common';
import { Ticket } from '../../models/ticket';
import { queueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName = queueGroupName;

  // This implementation does not relate this ticket to orders or ticket service
  // Fixed the id in the ticket build method in its model to force the id to save
  // correctly in the database.
  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;
    const ticket = Ticket.build({
      id,
      title,
      price,
    });
    await ticket.save();

    msg.ack();
  }
}
