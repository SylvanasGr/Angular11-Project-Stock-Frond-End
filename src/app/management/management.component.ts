import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { WhiteSpaceValidator } from '../toitsu-shared/my-shared/whitespace.validator';
import { ToitsuToasterService } from '../toitsu-shared/toitsu-toaster/toitsu-toaster.service';
import { WarehouseComponent } from '../warehouse/warehouse.component';
import { ShelveComponent } from '../shelve/shelve.component';
import { ManagementService } from './management.service';
import { ProductComponent } from '../product/product.component';
import {  Router } from '@angular/router';



@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css']
})
export class ManagementComponent implements OnInit {

  managementList: any = [];
  cols: any;
  searchText: string;
  error: string;
  displayEditDialog = false;
  displayBarcodeDate = false;
  id_product_test: any;
  barcode: number;
  date: string;
  barcodeAndDateList: any = [];
  name: string;
  testCal: string;




  constructor(private fb:FormBuilder,
              private _managementService:ManagementService,
              private dialogService:DialogService,
              private toitsu:ToitsuToasterService,
              private router:Router) {}

  ngOnInit(): void {

    this.refreshData();
    console.log(this.name);
  }


  managementForm = this.fb.group({
    action_description:['Είδος Εγγραφής',[Validators.required,Validators.minLength(5)]],
    supplier:['Προμηθευτής',[Validators.required,Validators.minLength(3)]],
    recipient:['Παραλήπτης',[Validators.required,Validators.minLength(3)]],
    date:['01-01-1991',[Validators.required,Validators.minLength(10),Validators.maxLength(10)]],
    id_action: ['ID Εγγραφής',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]],
    quantity: ['',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("(^-?0\.[0-9]*[1-9]+[0-9]*$)|(^-?[1-9]+[0-9]*((\.[0-9]*[1-9]+[0-9]*$)|(\.[0-9]+)))|(^-?[1-9]+[0-9]*$)|(^0$){1}")]],
    war_id:this.fb.group({
      id_warehouse: ['',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]]}),
    shelve_id:this.fb.group({
      id_shelve: ['',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]]}),
    product_id:this.fb.group({
      id_product: ['',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]]}),
    hello:this.fb.group({
      product_quantity: ['']})
      
  })


  onSubmit(){
    this._managementService.managementUpdate(this.managementForm.value).subscribe(
      response => console.log(
        'Success',
        response,
        this.toitsu.showSuccessStay(),
        this.router.navigate(['management/'])),
      HttpErrorResponse => console.log('Error!',HttpErrorResponse,this.toitsu.showErrorUpdate()),
    );
  }

  onReset(){
    this.managementForm.reset;
  }

    getAllmanagement(){
    this._managementService.getmanagementData().subscribe(data => {
    this.managementList = data;
    // this.toitsu.showSuccessLogin();
  }, (error) => {
      console.log(error)
      this.toitsu.showError();
    });
};

    deletemanagement(id){
      this.toitsu.showSuccessStaydelete();
    this._managementService.deletemanagementData(id.id_action).subscribe(
      (resp) => {
        console.log(resp); 
        this.ngOnInit();
      },
      (err) => {console.log(err)
      this.toitsu.showErrorDelete();
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
        this.router.navigate(['management/'+id])
      }

      refreshData(){
              this._managementService.refreshData.subscribe(
        () => {this.getAllmanagement();
          });
      this.getAllmanagement();
      }



      hello2(){
    this._managementService.getWarehouseDataByBarcodeAndDate(this.barcode,this.date).subscribe(data => {
    this.barcodeAndDateList = data;
    })

    

  }
    }

  
    


