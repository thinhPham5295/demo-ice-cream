import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFAQ } from 'app/shared/model/faq.model';
import { FAQService } from './faq.service';

@Component({
  selector: 'jhi-faq-delete-dialog',
  templateUrl: './faq-delete-dialog.component.html'
})
export class FAQDeleteDialogComponent {
  fAQ: IFAQ;

  constructor(protected fAQService: FAQService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.fAQService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'fAQListModification',
        content: 'Deleted an fAQ'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-faq-delete-popup',
  template: ''
})
export class FAQDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ fAQ }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(FAQDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.fAQ = fAQ;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/faq', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/faq', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          }
        );
      }, 0);
    });
  }

  ngOnDestroy() {
    this.ngbModalRef = null;
  }
}
