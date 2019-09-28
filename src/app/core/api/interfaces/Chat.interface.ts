import { Filter } from './Filter.interface';
import { Message } from './Message.interface';

export interface Chat {
    members: Array<String>,
    filter: Filter,
    messages: Array<Message>
}