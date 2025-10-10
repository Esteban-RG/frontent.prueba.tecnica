import { Component, Input, ViewChild, ElementRef, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-modal',
  imports: [],
  templateUrl: './modal.html',
})
export class Modal {
  @Input() modalId: string = 'myModal';
  @Input() modalTitle: string = 'Título del Modal';

   @ViewChild('modalRoot', { static: false }) modalRoot!: ElementRef;
  private modalInstance: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  async ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      const bootstrap = await import('bootstrap');
      this.modalInstance = new bootstrap.Modal(this.modalRoot.nativeElement);
    }
  }

  open() {
    if (this.modalInstance) {
      this.modalInstance.show();
    }
  }

  close() {
    if (this.modalInstance) {
      this.modalInstance.hide();
    }
  }
}
