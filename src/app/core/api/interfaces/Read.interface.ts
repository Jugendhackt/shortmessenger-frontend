import { Base } from './Base.interface';
import { Chat } from './Chat.interface';

export interface Read extends Base {
    result: Array<Chat>
}