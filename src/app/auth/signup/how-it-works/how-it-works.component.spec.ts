import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HowItWorksComponent } from './how-it-works.component';
import { ISignupDataItem } from 'src/store/auth/_interfaces';

describe('HowItWorksComponent', () => {
  let component: HowItWorksComponent;
  let fixture: ComponentFixture<HowItWorksComponent>;

  const mockData: ISignupDataItem[] = [
    { id: 1, name: 'Step 1', description: 'Choose your meal' },
    { id: 2, name: 'Step 2', description: 'Receive your meal' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HowItWorksComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HowItWorksComponent);
    component = fixture.componentInstance;
  });

  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('Inputs', () => {
    it('should render loading spinner when howItWorksLoading is true', () => {
      component.howItWorksLoading = true;
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(By.css('mat-spinner'));
      expect(spinner).toBeTruthy();
    });

    it('should render data items when howItWorksData is provided', () => {
      component.howItWorksData = mockData;
      fixture.detectChanges();

      const items = fixture.debugElement.queryAll(
        By.css('[data-testid="how-it-works-item"]')
      );
      expect(items.length).toBe(2);
    });
  });

  describe('trackById', () => {
    it('should return the id of the data item', () => {
      const item: ISignupDataItem = {
        id: 42,
        name: 'Test',
        description: 'Desc',
      };
      expect(component.trackById(0, item)).toBe(42);
    });
  });

  describe('SVGs', () => {
    it('should have 3 predefined SVGs with paths and alts', () => {
      expect(component.svgs.length).toBe(3);
      expect(component.svgs[0].alt).toBe('choose meal');
      expect(component.svgs[1].path).toContain('enjoy-meal.svg');
    });
  });
});
