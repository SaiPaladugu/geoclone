import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-streetview',
  templateUrl: './streetview.component.html',
  styleUrls: ['./streetview.component.scss']
})

export class StreetviewComponent implements AfterViewInit {
  @ViewChild('pano') panoElement!: ElementRef;
  panorama!: google.maps.StreetViewPanorama;
  streetViewService!: google.maps.StreetViewService;
  isLoading = false;

  ngAfterViewInit() {
    this.isLoading = true;
    this.streetViewService = new google.maps.StreetViewService();
    this.panorama = new google.maps.StreetViewPanorama(
      this.panoElement.nativeElement,
      {
        position: {lat: 0, lng: 0},
        pov: {heading: 165, pitch: 0},
        visible: true,
        linksControl: false,
        //panControl: false,
        enableCloseButton: false,
        motionTracking: false,
        motionTrackingControl: false,
        showRoadLabels: false,
        clickToGo: false,
        addressControl: false,
      }
    );
    this.findRandomLocation();
  }

  changePanoramaLocation() {
    this.isLoading = true;
    this.findRandomLocation();
  }

  findRandomLocation() {
    const lat = this.getRandomArbitrary(-90, 90);
    const lng = this.getRandomArbitrary(-180, 180);
    const location = new google.maps.LatLng(lat, lng);
    
    this.streetViewService.getPanorama({location: location, radius: 10000}, (data, status) => {
      if (status === google.maps.StreetViewStatus.OK && data && data.location && data.location.latLng) {
        this.panorama.setPosition(data.location.latLng);
        this.isLoading = false;
      } else {
        this.findRandomLocation();
      }
    });
  }  

  getRandomArbitrary(min: number, max: number) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(6));
  }
  
} //AIzaSyBpG6-VL79XdX8htvo_5r8jZciABBYRre8
