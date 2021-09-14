import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { WhiteSpaceValidator } from '../toitsu-shared/my-shared/whitespace.validator';
import { ProductService } from './product.service';
import { ToitsuToasterService } from '../toitsu-shared/toitsu-toaster/toitsu-toaster.service';
import { WarehouseComponent } from '../warehouse/warehouse.component';
import { ShelveComponent } from '../shelve/shelve.component';
import { ManagementComponent } from '../management/management.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  productList: any = [];
  cols: any;
  searchText: any;
  error: string;
  displayEditDialog = false;


  constructor(private fb:FormBuilder,
              private _productService:ProductService,
              private dialogService:DialogService,
              private toitsu:ToitsuToasterService,
              private router:Router) {}

  ngOnInit(): void {

    this.refreshData();

  }

  productForm = this.fb.group({
    description_product:['Περιγράφη Προΐόντος',[Validators.required,Validators.minLength(5)]],
    id_product: ['Barcode Προΐοντος',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]],
    quantity_product: ['Ποσότητα Προΐόντος',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]],
    shelve_product_id:this.fb.group({
      id_shelve: ['ID Ραφίου',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]]
    })
  })

  onSubmit(){
    this._productService.productUpdate(this.productForm.value).subscribe(
      response => console.log(
        'Success',
        response,
        this.toitsu.showSuccessStay(),
        this.router.navigate(['product/'])),
      HttpErrorResponse => console.log('Error!',HttpErrorResponse,this.toitsu.showErrorUpdate()),
    );
  }

  onReset(){
    this.productForm.reset;
  }

    getAllproduct(){
    this._productService.getproductData().subscribe(data => {
    this.productList = data;
    // this.toitsu.showSuccessLogin();
  }, (error) => {
      console.log(error)
      this.toitsu.showError();
    });
};

    deleteproduct(id){
      this.toitsu.showSuccessStaydelete();
    this._productService.deleteproductData(id.id_product).subscribe(
      (resp) => {
        console.log(resp); 
        this.ngOnInit();
      },
      (err) => {console.log(err)
      this.toitsu.showErrorDelete();
      }
    );
  }

  // εχω διπλο σφαλμα γιατι θελω να το αλλαξω οποτε το αφηνω ετσι για να μπορω να το θυμαμαι στο view
  editproduct(id){
   this.toitsu.showErrorUpdate();
    this._productService.editproductData(id.id_product).subscribe(
      (resp) => {
        console.log(resp); 
        this.ngOnInit();
      },
      (err) => {console.log(err)
        this.toitsu.showError();
      }
    );
  }

  // Φορμα Ραφιων + κουμπι
  showShelve() {
      const ref = this.dialogService.open(ShelveComponent, {
          header: 'Ράφια',
          width: '70%'
      });
  }

  // φορμα Αποθήκης + κουμπι
  showWarehouse() {
      const ref = this.dialogService.open(WarehouseComponent, {
          header: 'Αποθήκες',
          width: '70%'
      });
  }
  
  // φορμα Προιοντων + κουμπι
  showProduct(){
          const ref = this.dialogService.open(ProductComponent, {
          header: 'Προΐόντα',
          width: '70%'
      });
  }

  // φορμα εγγραφης + κουμπι
  showmanagement(){
          const ref = this.dialogService.open(ManagementComponent, {
          header: 'Προΐόντα',
          width: '70%'
      });
  }

      // test για success notification pop-up
     confirm() {
        this.toitsu.showSuccessStay();
      };


      //οταν πατας επεξεργασια σε παει στο αντιστοιχο window
      showSomething(id){
        this.router.navigate(['product/'+id])
      }

      refreshData(){
              this._productService.refreshData.subscribe(
        () => {this.getAllproduct();
          });
      this.getAllproduct();
      }

    }

  
    


