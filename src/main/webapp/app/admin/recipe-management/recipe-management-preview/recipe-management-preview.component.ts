import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'app/shared/model/recipe.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'jhi-recipe-management-preview',
  templateUrl: './recipe-management-preview.component.html',
  styleUrls: ['./recipe-management-preview.component.scss']
})
export class RecipeMgmtPreviewComponent implements OnInit {
  recipe: IRecipe;

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.data.subscribe(({ recipe }) => {
      this.recipe = recipe.body ? recipe.body : recipe;
    });
  }

  previousState() {
    window.history.back();
  }
}
