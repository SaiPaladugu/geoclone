import { Component } from '@angular/core';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent {
  center: google.maps.LatLngLiteral = {lat: 0, lng: 0};
  zoom = 1;

  userGuess: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
      scaledSize: new google.maps.Size(40, 40)
    }
  };

  correctGuess: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      scaledSize: new google.maps.Size(40, 40)
    }
  };
  polylines: google.maps.PolylineOptions[] = [];
  currentMarkerPosition?: google.maps.LatLngLiteral;

  addMarker(event: any) {
    this.currentMarkerPosition = event.latLng!.toJSON();
    this.userGuess = {
      position: this.currentMarkerPosition,
      draggable: false,
    };
  }

  addGreenMarkerAndLine(coords: google.maps.LatLngLiteral) {
    this.correctGuess.position = coords;
    if(this.currentMarkerPosition) {
      this.polylines.push({
        path: [this.currentMarkerPosition, coords],
        geodesic: false,
        strokeColor: '#000000',
        strokeOpacity: 0.25,
        strokeWeight: 0.5,
        icons: [{
          icon: {
            path: 'M 0,-1 0,1',
            strokeOpacity: 1,
            scale: 2
          },
          offset: '0',
          repeat: '20px'
        }],
      });
    }
  }

  clearMap() {
    this.userGuess = { draggable: false };
    this.correctGuess = {
      draggable: false,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png"
      }
    };
    this.polylines = [];
    this.currentMarkerPosition = undefined;
  }
}
