import nats from 'node-nats-streaming';
import { randomBytes } from 'crypto';
import { TicketCreatedListener } from './events/ticket-created-listener';

console.clear();

// Randombytes to generate unique id for client so you can run multiple listener services
const client = nats.connect('ticketing', randomBytes(4).toString('hex'), {
  url: 'http://localhost:4222',
});

client.on('connect', () => {
  console.log('Listener connected to NATS');

  // Manually close if interruption or termination logging to the console -> this is called by the listeners at the bottom of the file
  client.on('close', () => {
    console.log('NATS connection closed!');
    process.exit();
  });

  // TO set options you chain on method calls
  // Removed due to abstract class keeping for reference
  //   const options = client
  //     .subscriptionOptions()
  //     .setManualAckMode(true)
  //     .setDeliverAllAvailable()
  //     .setDurableName('accounting-service');

  // Second argument creates a queue group to manage which of the multiple running servces handles the event, third argument takes options variable
  // Removed due to abstract class keeping for reference
  //   const subscription = client.subscribe(
  //     'ticket:created',
  //     'queue-group-name',
  //     options
  //   );

  // getData and getSequence are part of the Message interface/class from
  // node nats streaming allow us to access data from the event bus
  // Removed due to abstract class keeping for reference
  //   subscription.on('message', (msg: Message) => {
  //     const data = msg.getData();

  //     if (typeof data === 'string') {
  //       console.log(`Recieved event #${msg.getSequence()}, with data: ${data}`);
  //     }

  //     // This manually acknowledges the message
  //     msg.ack();
  //   });

  new TicketCreatedListener(client).listen();
});

// Watching for interrupt or termination signals then tries to close the client (don't send me anymore messages)
process.on('SIGINT', () => client.close());
process.on('SIGTERM', () => client.close());
