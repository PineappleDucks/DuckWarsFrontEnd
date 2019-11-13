import {Message} from './Message';
import {Action} from './Action';

export interface Contact {
  display: string;
  firstName: string;
  lastName: string;

  isActive?: boolean;
  messages?: Message[];
  actions?: Action[];

  image?: string;
}
