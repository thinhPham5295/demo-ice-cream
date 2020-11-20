import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPrizeHistory } from 'app/shared/model/prize-history.model';
import { PrizeHistoryService } from './prize-history.service';

@Component({
  selector: 'jhi-prize-history-delete-dialog',
  templateUrl: './prize-history-delete-dialog.component.html'
})
export class PrizeHistoryDeleteDialogComponent {
  prizeHistory: IPrizeHistory;

  constructor(
    protected prizeHistoryService: PrizeHistoryService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  clear() {
    this.activeModal.dismiss('cancel');
  }

  confirmDelete(id: number) {
    this.prizeHistoryService.delete(id).subscribe(response => {
      this.eventManager.broadcast({
        name: 'prizeHistoryListModification',
        content: 'Deleted an prizeHistory'
      });
      this.activeModal.dismiss(true);
    });
  }
}

@Component({
  selector: 'jhi-prize-history-delete-popup',
  template: ''
})
export class PrizeHistoryDeletePopupComponent implements OnInit, OnDestroy {
  protected ngbModalRef: NgbModalRef;

  constructor(protected activatedRoute: ActivatedRoute, protected router: Router, protected modalService: NgbModal) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ prizeHistory }) => {
      setTimeout(() => {
        this.ngbModalRef = this.modalService.open(PrizeHistoryDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
        this.ngbModalRef.componentInstance.prizeHistory = prizeHistory;
        this.ngbModalRef.result.then(
          result => {
            this.router.navigate(['/prize-history', { outlets: { popup: null } }]);
            this.ngbModalRef = null;
          },
          reason => {
            this.router.navigate(['/prize-history', { outlets: { popup: null } }]);
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
