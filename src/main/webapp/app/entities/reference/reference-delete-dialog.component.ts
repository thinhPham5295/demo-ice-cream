import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IReference } from 'app/shared/model/reference.model';
import { ReferenceService } from './reference.service';

@Component({
  selector: 'jhi-reference-delete-dialog',
  templateUrl: './reference-delete-dialog.component.html'
})
export class ReferenceDeleteDialogComponent {
  reference: IReference;

  constructor(protected referenceService: ReferenceService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.referenceService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'referenceListModification',
        content: 'Deleted an reference'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-reference-delete-popup',
  template: ''
})
export class ReferenceDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reference }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(ReferenceDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.reference = reference;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/reference', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/reference', { outlets: { popup: null } }]);
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
