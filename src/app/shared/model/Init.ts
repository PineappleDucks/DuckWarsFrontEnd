import {Chat} from './Chat';

export interface Init {
  id?: number;

  chats: Chat[];

  conditions: any;
  helleseite: any;
}

/*
  {
    chats: Chat[],
    conditions: any,
    helleseite: any
  }
 */
