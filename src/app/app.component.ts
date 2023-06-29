import { Component, ViewChild } from '@angular/core';
import { MapComponent } from './map/map.component';
import { StreetviewComponent } from './streetview/streetview.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})

export class AppComponent {
  @ViewChild(MapComponent) mapComponent!: MapComponent;
  @ViewChild(StreetviewComponent) streetviewComponent!: StreetviewComponent;
  title = 'Geoguessr Clone';
  score:any = 0;
  totalScore:any = 0;
  round = 0;

  guess() {
    this.mapComponent.addGreenMarkerAndLine(this.streetviewComponent.currCoords);
    this.score = (5000 - this.mapComponent.distanceCalc(this.streetviewComponent.currCoords)!)  > 0 
    ? Math.ceil(5000 - this.mapComponent.distanceCalc(this.streetviewComponent.currCoords)!) : 0;
  }

  nextRound() {
    this.round += 1
    this.totalScore += this.score;
    this.score = 'pending'
    this.mapComponent.clearMap();
    this.streetviewComponent.changePanoramaLocation();
  }
}
