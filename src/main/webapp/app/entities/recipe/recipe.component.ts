import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { IRecipe } from 'app/shared/model/recipe.model';
import { AccountService } from 'app/core';
import { RecipeService } from './recipe.service';

@Component({
  selector: 'jhi-recipe',
  templateUrl: './recipe.component.html'
})
export class RecipeComponent implements OnInit, OnDestroy {
  recipes: IRecipe[];
  currentAccount: any;
  eventSubscriber: Subscription;

  constructor(
    protected recipeService: RecipeService,
    protected jhiAlertService: JhiAlertService,
    protected eventManager: JhiEventManager,
    protected accountService: AccountService
  ) {}

  loadAll() {
    this.recipeService
      .query()
      .pipe(
        filter((res: HttpResponse<IRecipe[]>) => res.ok),
        map((res: HttpResponse<IRecipe[]>) => res.body)
      )
      .subscribe(
        (res: IRecipe[]) => {
          this.recipes = res;
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  ngOnInit() {
    this.loadAll();
    this.accountService.identity().then(account => {
      this.currentAccount = account;
    });
    this.registerChangeInRecipes();
  }

  ngOnDestroy() {
    this.eventManager.destroy(this.eventSubscriber);
  }

  trackId(index: number, item: IRecipe) {
    return item.id;
  }

  registerChangeInRecipes() {
    this.eventSubscriber = this.eventManager.subscribe('recipeListModification', response => this.loadAll());
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }
}
