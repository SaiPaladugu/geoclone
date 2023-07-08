import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MapComponent } from './map/map.component';
import { StreetviewComponent } from './streetview/streetview.component';
import { ApikeyService } from './apikey.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent implements OnInit{
  apiKey: any = null;
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  @ViewChild(StreetviewComponent) streetviewComponent!: StreetviewComponent;
  @Output() googleMapsApiLoaded = new EventEmitter<boolean>();
  title = 'Geoguessr Clone';
  gameStatus = 'next round';
  textScore = 'total score'
  score:any = 0;
  totalScore:any = 0;
  round = 0;
  disableGuess = false;

  constructor(private apikeyService: ApikeyService) { }

  ngOnInit(): void {
    this.apikeyService.getApiKey().subscribe(data => {
      this.apiKey = data.apiKey;
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;
      
      const specificElement = document.getElementById('apiscript');
      if (specificElement) {
        specificElement.appendChild(script);
      }
      
      script.onload = () => {
        this.googleMapsApiLoaded.emit(true);
      };
    });
  }
  

  loadGoogleMapsScript() {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}`;
    script.onload = () => this.googleMapsApiLoaded.emit(true);
    document.body.appendChild(script);
  }

  initMapComponents() {
    
  }

  guess() {
    this.mapComponent.addGreenMarkerAndLine(this.streetviewComponent.currCoords);
    this.score = (10000 - this.mapComponent.distanceCalc(this.streetviewComponent.currCoords)!)  > 0 
    ? Math.ceil(10000 - this.mapComponent.distanceCalc(this.streetviewComponent.currCoords)!) : 0;
    // let distance = this.mapComponent.distanceCalc(this.streetviewComponent.currCoords)!;
    // this.score = Math.max(Math.ceil(5000 - 250 * Math.log(distance + 1)), 0);
    this.disableGuess = true;
    this.mapComponent.isMarkerEnabled = false;
    if (this.round === 5) {
      this.textScore = 'final score';
      this.totalScore += this.score;
    }
  }

  nextRound() {
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
