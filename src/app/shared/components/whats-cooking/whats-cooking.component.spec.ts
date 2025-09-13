import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WhatsCookingComponent } from './whats-cooking.component';
import { Store } from '@ngrx/store';
import { of, BehaviorSubject } from 'rxjs';
import { SharedService } from 'src/services/shared/shared.service';
import { BlogActions, EmailSignupActions } from 'src/store/shared/actions';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('WhatsCookingComponent', () => {
  let component: WhatsCookingComponent;
  let fixture: ComponentFixture<WhatsCookingComponent>;
  let storeSpy: jasmine.SpyObj<Store<any>>;
  let sharedServiceMock: any;

  // Mock observables
  const blog$ = new BehaviorSubject<any>(null);
  const blogLoading$ = new BehaviorSubject<boolean>(false);
  const blogError$ = new BehaviorSubject<string | null>(null);
  const isEmailAdded$ = new BehaviorSubject<boolean | null>(false);

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    sharedServiceMock = {
      blog$,
      blogLoading$,
      blogError$,
      isEmailAdded$,
    };

    await TestBed.configureTestingModule({
      imports: [WhatsCookingComponent, NoopAnimationsModule],
      providers: [
        { provide: Store, useValue: storeSpy },
        { provide: SharedService, useValue: sharedServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(WhatsCookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch BlogActions.load if blog$ is null', () => {
    component.blog$.subscribe(); // triggers the constructor logic
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });

  it('should reset emailForm when isEmailAdded$ emits true', () => {
    component.emailForm.setValue({ email: 'test@example.com' });
    isEmailAdded$.next(true);
    expect(component.emailForm.value.email).toBeNull();
    expect(component.emailForm.controls.email.errors).toBeNull();
  });

  it('should dispatch EmailSignupActions.signup when onSignUp is called', () => {
    component.emailForm.setValue({ email: 'test@example.com' });
    component.onSignUp();
    expect(storeSpy.dispatch).toHaveBeenCalled();
  });
});
