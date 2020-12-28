import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { RecipeService } from 'app/entities/recipe';
import { Recipe } from 'app/shared/model/recipe.model';
import { RecipeMgmtComponent } from 'app/admin/recipe-management/recipe-management.component';
import { RecipeMgmtPreviewComponent } from 'app/admin/recipe-management/recipe-management-preview/recipe-management-preview.component';
import { RecipeMgmtUpdateComponent } from 'app/admin/recipe-management/recipe-management-update/recipe-management-update.component';

@Injectable({ providedIn: 'root' })
export class recipeResolve implements CanActivate {
  constructor(private accountService: AccountService) {}

  canActivate() {
    return this.accountService.identity().then(account => this.accountService.hasAnyAuthority(['ROLE_ADMIN']));
  }
}

@Injectable({ providedIn: 'root' })
export class RecipeMgmtResolve implements Resolve<any> {
  constructor(private service: RecipeService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const id = route.params['id'] ? route.params['id'] : null;
    if (id) {
      return this.service.find(id);
    }
    return new Recipe();
  }
}

export const recipeMgmtRoute: Routes = [
  {
    path: 'recipe-management',
    component: RecipeMgmtComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      pageTitle: 'recipes',
      defaultSort: 'id,asc'
    }
  },
  {
    path: 'recipe-management/view',
    component: RecipeMgmtPreviewComponent
  },
  {
    path: 'recipe-management/new',
    component: RecipeMgmtUpdateComponent,
    resolve: {
      recipe: RecipeMgmtResolve
    }
  },
  {
    path: 'recipe-management/:id/edit',
    component: RecipeMgmtUpdateComponent,
    resolve: {
      recipe: RecipeMgmtResolve
    }
  }
];
