import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@trctickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
