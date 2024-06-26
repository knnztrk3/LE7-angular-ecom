import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CategoriesService, Category } from '@keoshop/products';
import { MessageService } from 'primeng/api';
import { Subject, takeUntil, timer } from 'rxjs';

@Component({
  selector: 'admin-categories-form',
  templateUrl: './categories-form.component.html',
  styles: [
  ]
})
export class CategoriesFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  isSubmited = false;
  editmode = false;
  currentCategoryID : string;
  endsubs$: Subject<any> = new Subject();

  constructor(
    private messageService: MessageService, 
    private formBuilder: FormBuilder, 
    private categoriesService: CategoriesService,
    private location: Location,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:['', Validators.required],
      icon:['', Validators.required],
      color:['#fff']
    });

    this._checkEditMode();
  }
  
  ngOnDestroy() {
    this.endsubs$.next(true);
    this.endsubs$.complete();
  }

  onSubmit() {
    this.isSubmited = true;
    if (this.form.invalid) {
      return;
    }
    const category : Category = {
      id: this.currentCategoryID,
      name: this.categoryForm.name.value,
      icon: this.categoryForm.icon.value,
      color: this.categoryForm.color.value

    };
    if(this.editmode) {
      this._updateCategory(category)
    }else {
      this._addCategory(category)
    }
  }

  onCancel() {
    this.location.back();
  }

  private _addCategory(category: Category) {
    this.categoriesService.createCategory(category).pipe(takeUntil(this.endsubs$)).subscribe((category: Category) => {
      this.messageService.add({severity:'success', summary:'Başarılı', detail:`Kategori ${category.name} başarıyla eklendi`});
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, ()=> {
      this.messageService.add({severity:'error', summary:'Hata', detail:'Hay aksi! Kategori eklenemedi, bir hata meydana geldi.'});
    });
  }

  private _updateCategory(category: Category) {
    this.categoriesService.updateCategory(category).pipe(takeUntil(this.endsubs$)).subscribe((category: Category) => {
      this.messageService.add({severity:'success', summary:'Başarılı', detail:`Kategori {${category.name}} başarıyla güncellendi`});
      timer(2000).toPromise().then(() => {
        this.location.back();
      })
    }, ()=> {
      this.messageService.add({severity:'error', summary:'Hata', detail:'Hay aksi! Kategori güncellenemedi, bir hata meydana geldi.'});
    });
  }

  private _checkEditMode() {
    this.route.params.pipe(takeUntil(this.endsubs$)).subscribe((params) => {
      if (params.id) {
        this.editmode = true;
        this.currentCategoryID = params.id;
        this.categoriesService.getCategoryById(params.id).subscribe(category => {
          this.categoryForm.name.setValue(category.name);
          this.categoryForm.icon.setValue(category.icon);
          this.categoryForm.color.setValue(category.color);
        });
      }
    });
  }

  get categoryForm() {
    return this.form.controls;
  }

}
