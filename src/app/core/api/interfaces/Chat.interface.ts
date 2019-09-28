import {Filter} from './Filter.interface';
import {Message} from './Message.interface';
import {Base} from './Base.interface';

export interface Chat extends Base
{
    members: Array<String>,
    filter: Filter,
    messages: Array<Message>
}
