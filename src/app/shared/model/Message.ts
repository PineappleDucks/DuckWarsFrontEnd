import {User} from './User';

export interface Message {
  text: string;
  outgoing: boolean; // ingoing
  date?: Date;
}
