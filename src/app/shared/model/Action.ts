import {Message} from './Message';

export interface Action {
  display: string; // text to display on button
  value: string; // text to send as value
  triggerAfter: number; // time in ms after answer will appear
  appearMessage: Message; // message that will appear after the defined time
}
