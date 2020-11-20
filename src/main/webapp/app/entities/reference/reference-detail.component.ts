import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReference } from 'app/shared/model/reference.model';

@Component({
  selector: 'jhi-reference-detail',
  templateUrl: './reference-detail.component.html'
})
export class ReferenceDetailComponent implements OnInit {
  reference: IReference;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ reference }) => {
      this.reference = reference;
    });
  }

  previousState() {
    window.history.back();
  }
}
