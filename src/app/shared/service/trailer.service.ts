import { Injectable } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ActionsService} from './actions.service';
import {ChatService} from './chat.service';
import {ContactService} from './contact.service';
import {User} from '../model/User';
import {Message} from '../model/Message';
import {NotificationService} from './notification.service';

@Injectable({
  providedIn: 'root'
})
export class TrailerService {
  started = false;

  private D2R2: User = {
    firstName: 'D2-R2',
    lastName: '',
    display: 'D2R2',
    image: 'assets/D2R2.png'
  };

  private Unbekant: User = {
    firstName: 'Unbekannt',
    lastName: '',
    display: 'Unbekannt',
    image: 'assets/Stormtrooper.png'
  };

  constructor(private route: ActivatedRoute,
              private router: Router,
              private actionsService: ActionsService,
              private chatService: ChatService,
              private contactService: ContactService,
              private notificationService: NotificationService) { }

  play() {
    if (this.started) {
      return;
    }
    this.started = true;

    this.router.navigate(['contacts']).then();

    const message: Message = {

      text: 'Statusbericht: 35 Systemfehler, Treibstoff niedrig, Triebwerke ausgefallen, Elektronik gestört, 35 weitere Fehler',
      outgoing: false,
      date: new Date()
    };
    this.contactService.addContact({
      isActive: false,
      owner: this.D2R2,
      lastMessage: message
    });
    this.chatService.addChat({
      partner: this.D2R2,
      messages: [message]
    });
    this.notificationService.addNotification('D2R2');

    setTimeout( () => {
        this.router.navigate(['contacts/D2R2']).then();
        const a1 = {
          display: 'Was ist passiert?',
          triggerAfter: 2250,
          value: 'Was ist passiert?',
          appearMessage: {
            text: 'Wir sind abgestürzt und nicht mehr flugfähig.',
            // text: 'Die Absturzursache ist unbekannt, denn das Speichermodul ist beschädigt',
            outgoing: false
          }
        };
        const a2 = {
          display: 'Wo sind wir?',
          triggerAfter: 3000,
          value: 'Wo sind wir?',
          appearMessage: {
            text: '',
            outgoing: false
          }
        };
        const a3 = {
          display: 'Können wir Hifle rufen?',
          triggerAfter: 2650,
          value: 'Können wir Hilfe rufen?',
          appearMessage: {
            text: 'Nein, unser Kommunikationsmodul ist beschädigt, daher können wir nur noch über kurze Strecken kommunizieren.',
            outgoing: false
          }
        };

        this.actionsService.addAction(a1);
        this.actionsService.addAction(a2);
        this.actionsService.addAction(a3);

        setTimeout( () => {
          this.actionsService.emitAction(0, a1);

          setTimeout( () => {
            this.actionsService.emitAction(0, a3);
            this.actionsService.deleteActionObj(a2);
          }, 5000);
        }, 3000);

        setTimeout( () => {
          this.router.navigate(['contacts']).then();

        }, 16000);

        setTimeout( () => {
          // this.playUnknownSound();
        }, 17000);

        setTimeout( () => {
          const message2: Message = {
            text: 'Hallo? Ist da jemand?',
            outgoing: false,
            date: new Date()
          };

          this.contactService.addContact({
            isActive: false,
            owner: this.Unbekant,
            lastMessage: message2
          });
          this.chatService.addChat({
            partner: this.Unbekant,
            messages: [message2]
          });

          this.notificationService.addNotification('Unbekannt');
        }, 17500);
      }, 2500);
  }

  playUnknownSound() {
    const audio = new Audio();
    audio.src = 'assets/audio/light-saber-off.mp3';
    audio.load();
    audio.volume = 0.25;
    audio.play();
  }
}
