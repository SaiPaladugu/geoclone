import { Component, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';

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
  currCoords:any = null;
  
  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit() {
    this.isLoading = true;
    this.cdr.detectChanges();
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
        fullscreenControl: false,
        zoomControl: false,
        disableDefaultUI: true
      }
    );
    this.findRandomLocation();
  }

  changePanoramaLocation() {
    this.isLoading = true;
    this.findRandomLocation();
  }

  async findRandomLocation() {
    const lat = this.getRandomArbitrary(-90, 90);
    const lng = this.getRandomArbitrary(-180, 180);
    const location = new google.maps.LatLng(lat, lng);

    const panoramaResult = await new Promise<google.maps.StreetViewPanoramaData | null>((resolve, reject) => {
      this.streetViewService.getPanorama({location: location, radius: 10000}, (data, status) => {
        if (status === google.maps.StreetViewStatus.OK) {
          resolve(data);
        } else {
          resolve(null);
        }
      });
    });

    if (panoramaResult && panoramaResult.location && panoramaResult.location.latLng) {
      this.panorama.setPosition(panoramaResult.location.latLng);
      if(this.panorama.getStatus() !== 'OK' || this.panorama.getVisible() !== true
      || this.panorama.getLocation() === undefined || this.panorama.getPosition() === null) {
        // || this.panorama.getLinks()![0]?.description !== ''
        this.findRandomLocation();
      } else {
        // console.log(this.panorama);
        // console.log(this.panorama.getLocation());
        // console.log(this.panorama.getLinks());
        // console.log(this.panorama.getPano());
        // console.log(this.panorama.getLinks()![0]?.description);
        this.currCoords = location.toJSON();
        this.isLoading = false;
      }
    } else {
      this.findRandomLocation();
    }
  }

  getRandomArbitrary(min: number, max: number) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(6));
  }
  
}
