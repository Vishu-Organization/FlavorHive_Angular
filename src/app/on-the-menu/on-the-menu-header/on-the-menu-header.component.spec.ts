import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OnTheMenuHeaderComponent } from './on-the-menu-header.component';

describe('OnTheMenuHeaderComponent', () => {
  let component: OnTheMenuHeaderComponent;
  let fixture: ComponentFixture<OnTheMenuHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnTheMenuHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OnTheMenuHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle modal open/close when toggleModal is called', () => {
    expect(component.isModalOpen).toBeFalse();

    component.toggleModal();
    expect(component.isModalOpen).toBeTrue();

    component.toggleModal();
    expect(component.isModalOpen).toBeFalse();
  });

  it('should stop event propagation when event is passed to toggleModal', () => {
    const mockEvent = new MouseEvent('click');
    const stopSpy = spyOn(mockEvent, 'stopPropagation');

    component.toggleModal(mockEvent);

    expect(stopSpy).toHaveBeenCalled();
  });

  it('should close modal when clicking outside modal and button', () => {
    // Arrange
    component.isModalOpen = true;

    const modalEl = document.createElement('div');
    const buttonEl = document.createElement('button');

    const fakeDialogRef = { nativeElement: modalEl };
    const fakeButtonRef = { nativeElement: buttonEl };

    // Set up the component refs
    (component as any).modalRef = { dialogRef: fakeDialogRef };
    (component as any).buttonRef = fakeButtonRef;

    const outsideClick = new MouseEvent('mousedown', { bubbles: true });
    spyOn(modalEl, 'contains').and.returnValue(false);
    spyOn(buttonEl, 'contains').and.returnValue(false);

    // Act
    component.handleClickOutside(outsideClick);

    // Assert
    expect(component.isModalOpen).toBeFalse();
  });

  it('should not close modal when clicking inside modal or button', () => {
    component.isModalOpen = true;

    const modalEl = document.createElement('div');
    const buttonEl = document.createElement('button');

    (component as any).modalRef = { dialogRef: { nativeElement: modalEl } };
    (component as any).buttonRef = { nativeElement: buttonEl };

    spyOn(modalEl, 'contains').and.returnValue(true);
    spyOn(buttonEl, 'contains').and.returnValue(false);

    component.handleClickOutside(new MouseEvent('mousedown'));
    expect(component.isModalOpen).toBeTrue();
  });

  it('should return early if modal is not open', () => {
    component.isModalOpen = false;
    const event = new MouseEvent('mousedown');
    component.handleClickOutside(event);
    // nothing should throw
    expect(component.isModalOpen).toBeFalse();
  });
});
