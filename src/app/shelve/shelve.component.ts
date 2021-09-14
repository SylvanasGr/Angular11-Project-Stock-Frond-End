import { Component, OnInit } from '@angular/core';
import { FormBuilder,Validators} from '@angular/forms';
import { DialogService } from 'primeng/dynamicdialog';
import { WhiteSpaceValidator } from '../toitsu-shared/my-shared/whitespace.validator';
import { ShelveService } from './shelve.service';
import { ToitsuToasterService } from '../toitsu-shared/toitsu-toaster/toitsu-toaster.service';
import { WarehouseComponent } from '../warehouse/warehouse.component';
import { ProductComponent } from '../product/product.component';
import { ManagementComponent } from '../management/management.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shelve',
  templateUrl: './shelve.component.html',
  styleUrls: ['./shelve.component.css']
})
export class ShelveComponent implements OnInit {

  shelveList: any = [];
  cols: any;
  searchText: string;
  error: string;
  displayEditDialog = false;

  constructor(private fb:FormBuilder,
              private _shelveService:ShelveService,
              private dialogService:DialogService,
              private toitsu:ToitsuToasterService,
              private router:Router) {}

  ngOnInit(): void {

    this.refreshData();

  }

  shelveForm = this.fb.group({
    description_shelve:['Περιγράφη Ραφίου',[Validators.required,Validators.minLength(5)]],
    id_shelve: ['ID Ραφίου',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]],
    war_id:this.fb.group({
      id_warehouse: ['ID Αποθήκης',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]]
    })
  })

  //gia to update by id
    onSubmit(){
    this._shelveService.shelveUpdate(this.shelveForm.value).subscribe(
      response => console.log(
        'Success',
        response,
        this.toitsu.showSuccessStay(),
        this.router.navigate(['shelve/'])),
      HttpErrorResponse => console.log('Error!',HttpErrorResponse,this.toitsu.showErrorUpdate()),
    );
  }
  onReset(){
    this.shelveForm.reset;
  }

    getAllshelve(){
    this._shelveService.getshelveData().subscribe(data => {
    this.shelveList = data;
    // this.toitsu.showSuccessLogin();
  }, (error) => {
      console.log(error)
      this.toitsu.showError();
    });
};

    deleteshelve(id){
      this.toitsu.showSuccessStaydelete();
    this._shelveService.deleteshelveData(id.id_shelve).subscribe(
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
  editshelve(id){
   this.toitsu.showErrorUpdate();
    this._shelveService.editshelveData(id.id_shelve).subscribe(
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
        this._shelveService.getShelveDataById(id);
        this.router.navigate(['shelve/'+id])
      }


      refreshData(){
              this._shelveService.refreshData.subscribe(
        () => {this.getAllshelve();
          });
      this.getAllshelve();

      }


    }

  
    


