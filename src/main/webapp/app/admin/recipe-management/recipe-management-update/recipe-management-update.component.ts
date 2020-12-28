import { Component, OnInit } from '@angular/core';
import { IRecipe } from 'app/shared/model/recipe.model';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import moment = require('moment');

@Component({
  selector: 'jhi-recipe-management-update',
  templateUrl: './recipe-management-update.component.html',
  styleUrls: ['./recipe-management-update.component.scss']
})
export class RecipeMgmtUpdateComponent implements OnInit {
  recipe: IRecipe;
  updateForm = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(255), Validators.minLength(1)]],
    image: [''],
    description: [null],
    details: [null],
    author: [null],
    updateDate: [null],
    enableStatus: [null]
  });
  private fileToUpload: File;
  imageSrc: string;

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      ({ recipe }) => {
        this.updateRecipeForm(recipe.body);
      },
      () => {
        this.initRecipe();
      }
    );
  }

  initRecipe() {
    this.updateForm.patchValue({
      updateDate: moment().format('DD/MM/YYYY'),
      enableStatus: false
    });
  }

  clearAllFields() {
    this.updateForm.patchValue({
      name: '',
      image: '',
      description: '',
      details: '',
      author: '',
      updateDate: '',
      enableStatus: false
    });
  }

  handleFileInput(files: any) {
    this.fileToUpload = files.item(0);
    const reader = new FileReader();
    reader.onload = e => (this.imageSrc = reader.result.toString());
    reader.readAsDataURL(this.fileToUpload);
  }

  previewRecipe() {
    this.createRecipe();
    this.router.navigate(['/admin/recipe-management/view'], { queryParams: this.recipe });
  }

  createRecipe(): void {
    this.recipe = {
      name: this.updateForm.get(['name']).value,
      description: this.updateForm.get(['description']).value,
      details: this.updateForm.get(['details']).value,
      image: this.fileToUpload.name,
      imageData: this.imageSrc,
      enableStatus: this.updateForm.get(['enableStatus']).value,
      author: this.updateForm.get(['author']).value
    };
  }

  private updateRecipeForm(recipe: IRecipe) {
    this.updateForm.patchValue({
      name: recipe.name,
      image: recipe.image,
      description: recipe.description,
      details: recipe.details,
      author: recipe.author,
      updateDate: recipe.uploadDate ? recipe.uploadDate : moment().format('DD/MM/YYYY'),
      enableStatus: recipe.enableStatus ? recipe.enableStatus : false
    });
  }
}
