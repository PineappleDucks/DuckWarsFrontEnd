import {Message} from './Message';
import {User} from './User';

export interface Chat {
  messages: Message[];
  partner: User;
  owner?: User;
  index?: number;
}
