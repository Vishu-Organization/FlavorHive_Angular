import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FooterLinkComponent } from './footer-link.component';
import { LinkType } from 'src/store/footer/_interfaces';
import { provideRouter } from '@angular/router';

describe('FooterLinkComponent', () => {
  let component: FooterLinkComponent;
  let fixture: ComponentFixture<FooterLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterLinkComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should generate correct navigation link for type Link', () => {
    component.type = LinkType.Link;
    component.to = 'home';
    fixture.detectChanges();
    expect(component.navigation).toBe('/home');
  });

  it('should generate correct navigation link for type Email', () => {
    component.type = LinkType.Email;
    component.title = 'test@example.com';
    fixture.detectChanges();
    expect(component.navigation).toBe('mailto:test@example.com');
  });

  it('should generate correct navigation link for type Phone', () => {
    component.type = LinkType.Phone;
    component.title = '1234567890';
    fixture.detectChanges();
    expect(component.navigation).toBe('tel:1234567890');
  });

  it('should default to Link if type is null or undefined', () => {
    component.type = null;
    component.to = 'about';
    fixture.detectChanges();
    expect(component.navigation).toBe('/about');

    component.type = undefined as any;
    component.to = 'contact';
    fixture.detectChanges();
    expect(component.navigation).toBe('/contact');
  });
});
