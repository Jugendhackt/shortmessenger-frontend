import {Base} from './Base.interface';
import {Message} from './Message.interface';
import {Filter} from './Filter.interface';

export interface Chat extends Base
{
    id: string
    messages: Array<Message>
    name: string
    img: string
    users: Array<string>
    last: number
    filters: Filter
}
