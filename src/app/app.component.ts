import {AfterViewChecked, Component, OnInit} from '@angular/core';
import {slideInAnimation} from './shared/animation/slideIn.animation';
import {TrailerService} from './shared/service/trailer.service';
import {showAnimation} from './shared/animation/show.animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [slideInAnimation, showAnimation]
})
export class AppComponent implements OnInit, AfterViewChecked {
  constructor(private trailerService: TrailerService) { }

  playIntro = true; // true
  showPhone = false; // false
  showOption = false;

  ngOnInit(): void {
    setTimeout( () => {
      this.playTheme();
      console.log('1');
    }, 5700);



    setTimeout( () => {
      this.showPhone = true;
      this.trailerService.play();

      setTimeout( () => {
        this.playIntro = false;
      }, 42000);

    }, 33000);

    setTimeout( () => {
      this.playUnknownSound();
    }, 52500);
  }

  ngAfterViewChecked(): void {



  }

  playUnknownSound() {
    const audio = new Audio();
    audio.src = 'assets/audio/light-saber-off.mp3';
    audio.load();
    audio.volume = 0.25;
    audio.play();
  }

  playTheme() {
    const audio = new Audio();
    audio.src = 'assets/audio/star-wars-theme-song.mp3';
    audio.load();
    audio.volume = 0.05;
    audio.play();

    // Fade out

    setTimeout( () => {
      const interval = setInterval( () => {
        audio.volume = audio. volume - 0.001;

        if (audio.volume === 0.000) {
          audio.pause();
          clearInterval(interval);
        }
      }, 50);
    }, 53000);
  }
}
