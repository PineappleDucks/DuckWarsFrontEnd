import {Contact} from './Contact';
import {Message} from './Message';

export interface Chat {
  chatId: number;
  backgroundId: number;
  jediSide: boolean;

  messageList: Message[];
  contact: Contact;
}



/*
  chats: {
    backgroundId: number,
    chatId: number,
    contact: {
      firstname: string,
      id: number,
      image: string,
      lastname: string
    },
    jediSide: boolean,
    messageList: {
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
    }[],
  }
 */
