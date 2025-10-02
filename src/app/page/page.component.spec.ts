import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { PageComponent } from './page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('PageComponent', () => {
  let component: PageComponent;
  let fixture: ComponentFixture<PageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageComponent, NoopAnimationsModule],
      providers: [
        provideHttpClient(withInterceptorsFromDi()), // ✅ HttpClient
        provideHttpClientTesting(), // ✅ Testing utilities
        provideMockStore({}), // ✅ Mock Store for SharedService
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
