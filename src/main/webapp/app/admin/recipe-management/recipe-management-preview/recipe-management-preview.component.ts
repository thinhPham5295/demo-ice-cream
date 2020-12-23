import { Component, OnInit } from '@angular/core';
import { IRecipe, Recipe } from 'app/shared/model/recipe.model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'app/entities/recipe';
import { dataURIToFile } from 'app/shared/util/file.util';
import { FileService } from 'app/shared/file/file.service';

@Component({
  selector: 'recipe-management-preview',
  templateUrl: './recipe-management-preview.component.html',
  styleUrls: ['./recipe-management-preview.component.scss']
})
export class RecipeMgmtPreviewComponent implements OnInit {
  recipe: IRecipe;
  recipeUpdate: IRecipe;
  private id: number;

  constructor(
    private activatedRouter: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService,
    private fileService: FileService
  ) {}

  ngOnInit() {
    this.activatedRouter.queryParams.subscribe(params => {
      this.id = params['id'] ? params['id'] : null;
      if (this.id) {
        this.recipeService.find(this.id).subscribe(res => {
          if (res && res.body) {
            this.recipe = res.body;
          }
        });
      } else {
        this.recipe = params;
      }
    });
  }

  previousState() {
    this.router.navigate(['/admin/recipe-management/new', { data: this.recipe }]);
  }

  createRecipe() {
    const fileImage = dataURIToFile(this.recipe.imageData, this.recipe.image);
    this.fileService.uploadImageCommon(fileImage).subscribe(
      res => {
        if (res && res.body) {
          this.recipeUpdate = Object.assign({}, this.recipe, {
            image: res.body.name
          });
        }
      },
      () => {},
      () =>
        this.recipeService.create(this.recipeUpdate).subscribe(res => {
          if (res && res.body) {
            this.router.navigate(['/admin/recipe-management']);
          }
        })
    );
  }
}
