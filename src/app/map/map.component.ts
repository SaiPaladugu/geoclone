import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { AppComponent } from '../app.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})

export class MapComponent implements OnInit, OnDestroy {
  center!: google.maps.LatLngLiteral;
  zoom = 1;
  isMarkerEnabled = true;

  userGuess!: google.maps.MarkerOptions;
  correctGuess: google.maps.MarkerOptions = {
    draggable: false,
    icon: {
      url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
      scaledSize: new google.maps.Size(40, 40)
    }
  };
  polylines: google.maps.PolylineOptions[] = [];
  currentMarkerPosition?: google.maps.LatLngLiteral;

  private googleMapsApiLoadedSubscription?: Subscription;

  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {
    this.googleMapsApiLoadedSubscription = this.appComponent.googleMapsApiLoaded.subscribe(loaded => {
      if (loaded) {
        this.initializeMap();
      }
    });
  }

  private initializeMap(): void {
    this.center = { lat: 0, lng: 0 };

    this.userGuess = {
      draggable: false,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: new google.maps.Size(40, 40)
      }
    };

    this.correctGuess = {
      draggable: false,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        scaledSize: new google.maps.Size(40, 40)
      }
    };
  }

  ngOnDestroy(): void {
    this.googleMapsApiLoadedSubscription?.unsubscribe();
  }

  addMarker(event: any) {
    if (!this.isMarkerEnabled) {
      return;
    }
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
    this.userGuess = { 
      draggable: false,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
        scaledSize: new google.maps.Size(40, 40)
      }
    };
    this.correctGuess = {
      draggable: false,
      icon: {
        url: "http://maps.google.com/mapfiles/ms/icons/green-dot.png",
        scaledSize: new google.maps.Size(40, 40)
      }
    };

    this.polylines = [];
    this.currentMarkerPosition = undefined;
    this.isMarkerEnabled = true;
  }

  distanceCalc(coords: google.maps.LatLngLiteral) {
    if (!this.currentMarkerPosition) {
      console.error('Current marker position is not set');
      return null;
    }
  
    const R = 6371;
    const dLat = this.deg2rad(coords.lat - this.currentMarkerPosition.lat);
    const dLon = this.deg2rad(coords.lng - this.currentMarkerPosition.lng);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(coords.lat)) * Math.cos(this.deg2rad(this.currentMarkerPosition.lat)) * 
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ; 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
    const d = R * c;
    return d;
  }
  
  deg2rad(deg: number) {
    return deg * (Math.PI / 180)
  }
}
