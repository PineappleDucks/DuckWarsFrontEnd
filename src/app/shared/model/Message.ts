import {Contact} from './Contact';
import {DialogOption} from './DialogOption';

export interface Message {
  messageId: number;
  text: string;
  date: string;

  dialogOptions: DialogOption[];

  author: Contact;
}

/*
author: {
  firstname: string,
  id: number,
  image: string,
  lastname: string
},
date: string,
dialogOptions: {
  answer: string,
  conditions: any[],
  id: number,
  text: string
}[],
messageId: number,
text: string
 */
