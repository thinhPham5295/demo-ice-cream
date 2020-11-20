import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IFAQ } from 'app/shared/model/faq.model';

@Component({
  selector: 'jhi-faq-detail',
  templateUrl: './faq-detail.component.html'
})
export class FAQDetailComponent implements OnInit {
  fAQ: IFAQ;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ fAQ }) => {
      this.fAQ = fAQ;
    });
  }

  previousState() {
    window.history.back();
  }
}
