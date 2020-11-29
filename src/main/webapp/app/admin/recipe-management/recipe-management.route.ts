import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';

import { AccountService } from 'app/core';
import { RecipeService } from 'app/entities/recipe';
import { Recipe } from 'app/shared/model/recipe.model';
import { RecipeMgmtComponent } from 'app/admin/recipe-management/recipe-management.component';

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
  }
];
