import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WhiteSpaceValidator } from 'src/app/toitsu-shared/my-shared/whitespace.validator';
import { ToitsuToasterService } from 'src/app/toitsu-shared/toitsu-toaster/toitsu-toaster.service';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-product-update-window',
  templateUrl: './product-update-window.component.html',
  styleUrls: ['./product-update-window.component.css']
})
export class ProductUpdateWindowComponent implements OnInit {


  constructor(
              private fb:FormBuilder,
              private _productService:ProductService,
              private toitsu:ToitsuToasterService,
              private route:ActivatedRoute,
              private router:Router
  ) {}

  ngOnInit(): void {

    this.hello();

  }

  displayEditDialog = false;


  _productForm = this.fb.group({
    description_product:['Περιγράφη Προΐόντος',[Validators.required,Validators.minLength(5)]],
    id_product: ['Barcode Προΐοντος',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]],
    quantity_product: ['Ποσότητα Προΐόντος',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]],
    shelve_product_id:this.fb.group({
      id_shelve: ['ID Ραφίου',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]]
    })
  })

 

  onSubmit(){
    this._productService.productUpdate(this._productForm.value).subscribe(
      response => console.log(
        'Success',
        response,
        this.toitsu.showSuccessStay(),
        this.router.navigate(['product/'])),
      HttpErrorResponse => console.log('Error!',HttpErrorResponse,this.toitsu.showErrorUpdate()),
    );
  }


    onReset(){
    this._productForm.reset;
  }

  hello(){
    this._productService.getproductDataById(this.route.snapshot.params.id).subscribe(data => {
      console.log(data);
    
  this._productForm = this.fb.group({
  id_product:[data['id_product']],
  description_product:[data['description_product']],
  quantity_product: [data['quantity_product']],
      shelve_product_id:this.fb.group({
      id_shelve: [data['shelve_product_id']['id_shelve']]
    })
  })
    })
  }



}


