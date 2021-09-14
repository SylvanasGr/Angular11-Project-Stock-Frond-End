import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductComponent } from 'src/app/product/product.component';
import { ShelveComponent } from 'src/app/shelve/shelve.component';
import { WhiteSpaceValidator } from 'src/app/toitsu-shared/my-shared/whitespace.validator';
import { ToitsuToasterService } from 'src/app/toitsu-shared/toitsu-toaster/toitsu-toaster.service';
import { WarehouseComponent } from 'src/app/warehouse/warehouse.component';
import { ManagementComponent } from '../management.component';
import { ManagementService } from '../management.service';

@Component({
  selector: 'app-test-window',
  templateUrl: './test-window.component.html',
  styleUrls: ['./test-window.component.css']
})
export class TestWindowComponent implements OnInit {

  constructor(
              private fb:FormBuilder,
              private _managementService:ManagementService,
              private dialogService:DialogService,
              private toitsu:ToitsuToasterService,
              private route:ActivatedRoute,
              private router:Router
  ) {}

  ngOnInit(): void {

    this.hello();

  }

  displayEditDialog = false;



    updateManagementForm = this.fb.group({
    action_description:['',[Validators.required,Validators.minLength(5)]],
    supplier:['',[Validators.required,Validators.minLength(3)]],
    recipient:['',[Validators.required,Validators.minLength(3)]],
    date:['01-01-1991',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    id_action: ['',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]],
    quantity: ['',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("(^-?0\.[0-9]*[1-9]+[0-9]*$)|(^-?[1-9]+[0-9]*((\.[0-9]*[1-9]+[0-9]*$)|(\.[0-9]+)))|(^-?[1-9]+[0-9]*$)|(^0$){1}")]],
    war_id:this.fb.group({
      id_warehouse: ['',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]]}),
    shelve_id:this.fb.group({
      id_shelve: ['',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]]}),
    product_id:this.fb.group({
      id_product: ['',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]]})
  })

  onSubmit(){
    this._managementService.managementUpdate(this.updateManagementForm.value).subscribe(
      response => console.log(
        'Success',
        response,
        this.toitsu.showSuccessStay(),
        this.router.navigate(['management/'])),
      HttpErrorResponse => console.log('Error!',HttpErrorResponse,this.toitsu.showErrorUpdate()),
    );
  }

    onReset(){
    this.updateManagementForm.reset;
  }

  hello(){
    this._managementService.getmanagementDataById(this.route.snapshot.params.id).subscribe(data => {
      console.log(data);
    
  this.updateManagementForm = this.fb.group({
    action_description:[data['action_description']],
    supplier:[data['supplier']],
    recipient:[data['recipient']],
    date:[data['date']],
    id_action: [data['id_action']],
    quantity: [data['quantity']],
    war_id:this.fb.group({
      id_warehouse: [data['war_id']['id_warehouse']]}),
    shelve_id:this.fb.group({
      id_shelve: [data['shelve_id']['id_shelve']]}),
    product_id:this.fb.group({
      id_product: [data['product_id']['id_product']]})
  })

    })

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


}
