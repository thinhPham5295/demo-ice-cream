import { Component, OnInit } from '@angular/core';
import { AccountService } from 'app/core';
import { JhiAlertService, JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { ActivatedRoute, Router } from '@angular/router';
import { ITEMS_PER_PAGE } from 'app/shared';
import { HttpResponse } from '@angular/common/http';
import { RecipeService } from 'app/entities/recipe';
import { IRecipe, Recipe } from 'app/shared/model/recipe.model';

@Component({
  selector: 'jhi-recipe-management',
  templateUrl: './recipe-management.component.html',
  styleUrls: ['./recipe-management.component.scss']
})
export class RecipeMgmtComponent implements OnInit {
  recipes: Recipe[];
  error: any;
  success: any;
  routeData: any;
  links: any;
  totalItems: any;
  itemsPerPage: any;
  page: any;
  predicate: any;
  previousPage: any;
  reverse: any;

  constructor(
    private recipeService: RecipeService,
    private alertService: JhiAlertService,
    private accountService: AccountService,
    private parseLinks: JhiParseLinks,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private eventManager: JhiEventManager
  ) {
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.routeData = this.activatedRoute.data.subscribe(data => {
      this.page = data['pagingParams'].page;
      this.previousPage = data['pagingParams'].page;
      this.reverse = data['pagingParams'].ascending;
      this.predicate = data['pagingParams'].predicate;
    });
  }

  ngOnInit() {
    this.loadAll();
  }

  ngOnDestroy() {
    this.routeData.unsubscribe();
  }

  registerChangeInRecipes() {
    this.eventManager.subscribe('RecipeListModification', response => this.loadAll());
  }

  setActive(recipe: Recipe, isActivated) {
    recipe.enableStatus = isActivated;
    this.recipeService.update(recipe).subscribe(response => {
      if (response.status === 200) {
        this.error = null;
        this.success = 'OK';
        this.loadAll();
      } else {
        this.success = null;
        this.error = 'ERROR';
      }
    });
  }

  loadAll() {
    this.recipeService
      .query({
        page: this.page - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IRecipe[]>) => this.onSuccess(res.body, res.headers),
        (res: HttpResponse<any>) => this.onError(res.body)
      );
  }

  trackIdentity(index, item: Recipe) {
    return item.id;
  }

  sort() {
    const result = [this.predicate + ',' + (this.reverse ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  loadPage(page: number) {
    if (page !== this.previousPage) {
      this.previousPage = page;
      this.transition();
    }
  }

  transition() {
    this.router.navigate(['/admin/Recipe-management'], {
      queryParams: {
        page: this.page,
        sort: this.predicate + ',' + (this.reverse ? 'asc' : 'desc')
      }
    });
    this.loadAll();
  }

  private onSuccess(data, headers) {
    this.links = this.parseLinks.parse(headers.get('link'));
    this.totalItems = headers.get('X-Total-Count');
    this.recipes = data;
  }

  private onError(error) {
    this.alertService.error(error.error, error.message, null);
  }
}
