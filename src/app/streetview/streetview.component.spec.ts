import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StreetviewComponent } from './streetview.component';

describe('StreetviewComponent', () => {
  let component: StreetviewComponent;
  let fixture: ComponentFixture<StreetviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StreetviewComponent]
    });
    fixture = TestBed.createComponent(StreetviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
