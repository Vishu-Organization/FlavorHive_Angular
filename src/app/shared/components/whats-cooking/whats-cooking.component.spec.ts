import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsCookingComponent } from './whats-cooking.component';

describe('WhatsCookingComponent', () => {
  let component: WhatsCookingComponent;
  let fixture: ComponentFixture<WhatsCookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsCookingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WhatsCookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
