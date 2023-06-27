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

  nextRound() {
    this.mapComponent.addGreenMarkerAndLine(this.streetviewComponent.currCoords);
  }
}
