import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdditionalInfoComponent } from './additional-info.component';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { ISignupDataItem } from 'src/store/auth/_interfaces';

describe('AdditionalInfoComponent', () => {
  let component: AdditionalInfoComponent;
  let fixture: ComponentFixture<AdditionalInfoComponent>;
  let storeSpy: jasmine.SpyObj<Store<any>>;

  const mockData: ISignupDataItem[] = [
    { id: 1, name: 'Delivery', description: 'Fast delivery' },
    { id: 2, name: 'Menus', description: 'Personalized menus' },
  ];

  beforeEach(async () => {
    storeSpy = jasmine.createSpyObj('Store', ['select', 'dispatch']);
    storeSpy.select.and.returnValue(of(mockData));

    await TestBed.configureTestingModule({
      imports: [AdditionalInfoComponent],
      providers: [{ provide: Store, useValue: storeSpy }],
    }).compileComponents();

    fixture = TestBed.createComponent(AdditionalInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should define svgs with correct length', () => {
      expect(component.svgs.length).toBe(3);
      expect(component.svgs[0].alt).toBe('convenient-delivery');
    });
  });

  describe('trackById', () => {
    it('should return item id', () => {
      const item = { id: 42, name: 'Test', description: 'Desc' };
      expect(component.trackById(0, item)).toBe(42);
    });
  });

  describe('additionalInfo$', () => {
    it('should subscribe to additionalInfo$ and emit mock data', (done) => {
      component.additionalInfo$.subscribe((data) => {
        expect(data).toEqual(mockData);
        done();
      });
    });
  });
});
