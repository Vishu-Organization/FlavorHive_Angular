import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurVisionImagesComponent } from './our-vision-images.component';

describe('OurVisionImagesComponent', () => {
  let component: OurVisionImagesComponent;
  let fixture: ComponentFixture<OurVisionImagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OurVisionImagesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurVisionImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
