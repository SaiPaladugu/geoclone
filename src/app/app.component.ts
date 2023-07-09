import { Component, ViewChild, ElementRef, Renderer2, Inject } from '@angular/core';
import { MapComponent } from './map/map.component';
import { StreetviewComponent } from './streetview/streetview.component';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  @ViewChild(StreetviewComponent) streetviewComponent!: StreetviewComponent;
  @ViewChild('nextButton') nextButton!: ElementRef;

  title = 'Geoguessr Clone';
  gameStatus = 'next round';
  textScore = 'total score'
  score:any = 0;
  totalScore:any = 0;
  round = 0;
  disableGuess = false;
  disableNext = true;

  constructor(private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document) {}

  guess() {
    this.mapComponent.addGreenMarkerAndLine(this.streetviewComponent.currCoords);
    let distance = this.mapComponent.distanceCalc(this.streetviewComponent.currCoords)!;
    this.score = (10000 - this.mapComponent.distanceCalc(this.streetviewComponent.currCoords)!)  > 0 
    ? Math.ceil(10000 - this.mapComponent.distanceCalc(this.streetviewComponent.currCoords)!) : 0;
    // this.score = Math.max(Math.ceil(5000 - 250 * Math.log(distance + 1)), 0);
    this.disableGuess = true;
    this.mapComponent.isMarkerEnabled = false;
    this.disableNext = false;
    if (this.round === 5) {
      this.totalScore += this.score;
      this.textScore = 'final score';
      this.renderer.setStyle(this.nextButton.nativeElement, 'background-color', 'green');
      this.document.body.style.backgroundColor = '#301934';
    }
  }

  nextRound() {
    this.disableNext = true;
    if (this.round < 5) {
      this.disableGuess = false;
      this.round += 1;
      this.totalScore += this.score;
      this.score = 0;
      this.mapComponent.clearMap();
      this.streetviewComponent.changePanoramaLocation();
      
      if (this.round === 5) {
        this.gameStatus = 'next game';
      }
    } else {
      this.resetGame();
    }
  }

  resetGame() {
    this.renderer.setStyle(this.nextButton.nativeElement, 'background-color', '#3c3c3c');
    this.document.body.style.backgroundColor = '#181818';
    this.disableGuess = false;
    this.round = 0;
    this.totalScore = 0;
    this.score = 0;
    this.mapComponent.clearMap();
    this.streetviewComponent.changePanoramaLocation();
    this.gameStatus = 'next round';
    this.textScore = 'total score';
  }
  
}
