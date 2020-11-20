import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPrizeHistory } from 'app/shared/model/prize-history.model';

@Component({
  selector: 'jhi-prize-history-detail',
  templateUrl: './prize-history-detail.component.html'
})
export class PrizeHistoryDetailComponent implements OnInit {
  prizeHistory: IPrizeHistory;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ prizeHistory }) => {
      this.prizeHistory = prizeHistory;
    });
  }

  previousState() {
    window.history.back();
  }
}
