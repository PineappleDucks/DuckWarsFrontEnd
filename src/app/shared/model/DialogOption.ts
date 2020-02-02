import {Contact} from './Contact';

export interface DialogOption {
  id: number;
  conditions: any[];
  answer: string;
  text: string;

  chatId?: number;

}

/*
dialogOptions: {
  answer: string,
  conditions: any[],
  id: number,
  text: string
}
 */
