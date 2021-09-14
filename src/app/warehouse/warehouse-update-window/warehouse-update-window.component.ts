import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WhiteSpaceValidator } from 'src/app/toitsu-shared/my-shared/whitespace.validator';
import { ToitsuToasterService } from 'src/app/toitsu-shared/toitsu-toaster/toitsu-toaster.service';
import { WareHouseService } from '../warehouse.service';

@Component({
  selector: 'app-warehouse-update-window',
  templateUrl: './warehouse-update-window.component.html',
  styleUrls: ['./warehouse-update-window.component.css']
})
export class WarehouseUpdateWindowComponent implements OnInit {

  constructor( private fb:FormBuilder,
              private _warehouseService:WareHouseService,
              private toitsu:ToitsuToasterService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    
    this.hello();
    
  }

  displayEditDialog = false;

    _warehouseForm = this.fb.group({
    description_warehouse:['Περιγράφη Αποθήκης',[Validators.required,Validators.minLength(5)]],
    id_warehouse: ['ID Αποθήκης',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]],
  })

  onSubmit(){
    this._warehouseService.warehouseUpdate(this._warehouseForm.value).subscribe(
      response => console.log(
        'Success',
        response,
        this.toitsu.showSuccessStay(),
        this.router.navigate(['warehouse/'])),
      HttpErrorResponse => console.log('Error!',HttpErrorResponse,this.toitsu.showErrorUpdate()),
    );
  }

    onReset(){
    this._warehouseForm.reset;
  }

  hello(){
    this._warehouseService.getWarehouseDataById(this.route.snapshot.params.id).subscribe(data => {
      console.log(data);
    
  this._warehouseForm = this.fb.group({
    id_warehouse:[data['id_warehouse']],
    description_warehouse:[data['description_warehouse']],
 })
    })
  }

}
