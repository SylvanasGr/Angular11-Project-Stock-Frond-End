import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { WhiteSpaceValidator } from '../toitsu-shared/my-shared/whitespace.validator';
import { WareHouseService } from './warehouse.service';
import { ToitsuToasterService } from '../toitsu-shared/toitsu-toaster/toitsu-toaster.service';
import { ShelveComponent } from '../shelve/shelve.component';
import { ProductComponent } from '../product/product.component';
import { ConfirmationService } from 'primeng/api';
import { ManagementComponent } from '../management/management.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit {

  warehouseList = [];
  cols: any;
  searchText:any;
  error: string;
  displayEditDialog = false;


  constructor(private fb:FormBuilder,
              private _warehouseService:WareHouseService,
              private dialogService:DialogService,
              private toitsu:ToitsuToasterService,
              private router:Router) {}

  ngOnInit(): void {

    this.refreshData();

  }

  warehouseForm = this.fb.group({
    description_warehouse:['Περιγράφη Αποθήκης',[Validators.required,Validators.minLength(5)]],
    id_warehouse: ['ID Αποθήκης',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]],
  })

  onSubmit(){
    this._warehouseService.warehouseUpdate(this.warehouseForm.value).subscribe(
      response => console.log(
        'Success',
        response,
        this.toitsu.showSuccessStay(),
        this.router.navigate(['warehouse/'])),
      HttpErrorResponse => console.log('Error!',HttpErrorResponse,this.toitsu.showErrorUpdate()),
    );
  }

  onReset(){
    this.warehouseForm.reset;
  }


    getAllWarehouse(){
    this._warehouseService.getWarehouseData().subscribe(data => {
    this.warehouseList = data
    // this.toitsu.showSuccessLogin();
  }, (error) => {
      console.log(error)
      this.toitsu.showError();
    });
};

    deleteWarehouse(id){
      this.toitsu.showSuccessStaydelete();
    this._warehouseService.deleteWarehouseData(id.id_warehouse).subscribe(
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


    display: boolean = false;

    showDialog() {
        this.display = true;
    }


          //οταν πατας επεξεργασια σε παει στο αντιστοιχο window
      showSomething(id){
        this.router.navigate(['warehouse/'+id])
      }

      refreshData(){
              this._warehouseService.refreshData.subscribe(
        () => {this.getAllWarehouse();
          });
      this.getAllWarehouse();
      }
    
      //  αλλαγες στις 09/07/2021


      


    }

