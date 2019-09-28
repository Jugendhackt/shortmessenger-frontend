import { Base } from './Base.interface';

export interface Message extends Base
{
    sender: string,
    content: string,
    time: number
}
