import {User} from './User';
import {Message} from './Message';

export interface Contact {
  isActive: boolean;
  lastMessage: Message;
  owner: User;
}
