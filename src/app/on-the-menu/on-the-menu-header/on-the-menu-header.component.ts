import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Filters } from 'src/store/on-the-menu/_types';
import { OnTheMenuHeaderFilterComponent } from './on-the-menu-header-filter/on-the-menu-header-filter.component';

@Component({
  selector: 'app-on-the-menu-header',
  standalone: true,
  imports: [MatIconModule, OnTheMenuHeaderFilterComponent, MatMenuModule],
  templateUrl: './on-the-menu-header.component.html',
  styleUrl: './on-the-menu-header.component.scss',
})
export class OnTheMenuHeaderComponent {
  @Input() setAppliedFilters!: (filters: Filters | null) => void;
  @ViewChild('modalRef', { static: false })
  modalRef?: OnTheMenuHeaderFilterComponent;
  @ViewChild('buttonRef', { static: false })
  buttonRef?: ElementRef<HTMLButtonElement>;
  isModalOpen = false;
  toggleModal(event?: MouseEvent): void {
    event?.stopPropagation();
    this.isModalOpen = !this.isModalOpen;
  }
  // Handle click outside modal and button
  @HostListener('document:mousedown', ['$event'])
  handleClickOutside(event: MouseEvent): void {
    if (!this.isModalOpen) return;

    const modal = this.modalRef?.dialogRef.nativeElement;
    const button = this.buttonRef?.nativeElement;

    if (modal && button) {
      const clickedInsideModal = modal.contains(event.target as Node);
      const clickedButton = button.contains(event.target as Node);
      if (!clickedInsideModal && !clickedButton) {
        this.isModalOpen = false;
      }
    }
  }
}
