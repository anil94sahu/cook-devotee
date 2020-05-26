import { Router } from '@angular/router';
import { HomeService } from './../../shared/services/home.service';
import { LoaderService } from './../../shared/services/loader.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-special-recipes',
  templateUrl: './special-recipes.component.html',
  styleUrls: ['./special-recipes.component.css']
})
export class SpecialRecipesComponent implements OnInit {

  receipeForm: FormGroup;
  loading = false;
  constructor(private loaderService: LoaderService, private homeService: HomeService, private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.receipeForm = new FormGroup({
      receipeName: new FormControl('', Validators.required),
      description: new FormControl(''),
      recipePic: new FormControl('', Validators.required),
      createdDate: new FormControl(new Date().toLocaleDateString()),
      createdTime: new FormControl(new Date().toLocaleTimeString()),

    });
  }

  get form() {
    return this.receipeForm.controls;
  }

  onSubmit(value) {
    this.loaderService.show();
    this.loading = true;
    if (this.receipeForm.valid) {
      console.log(this.receipeForm.value);
      this.homeService.saveReceipe(this.receipeForm.value);
      this.loading = false;
      this.router.navigate(['special-recipes']);
    } else {
    }
    this.loaderService.hide();
    this.loading = false;
  }

  profileImage(imageUrl) {
    this.form.recipePic.setValue(imageUrl);
  }

}
