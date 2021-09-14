import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { WhiteSpaceValidator } from 'src/app/toitsu-shared/my-shared/whitespace.validator';
import { ToitsuToasterService } from 'src/app/toitsu-shared/toitsu-toaster/toitsu-toaster.service';
import { ShelveService } from '../shelve.service';

@Component({
  selector: 'app-shelve-update-window',
  templateUrl: './shelve-update-window.component.html',
  styleUrls: ['./shelve-update-window.component.css']
})
export class ShelveUpdateWindowComponent implements OnInit {

  constructor( private fb:FormBuilder,
              private _shelveService:ShelveService,
              private toitsu:ToitsuToasterService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    
    this.hello();
    
  }

  displayEditDialog = false;

  // dhlwneis to form me ta validation
  _shelveForm = this.fb.group({
    description_shelve:['Περιγράφη Ραφίου',[Validators.required,Validators.minLength(5)]],
    id_shelve: ['ID Ραφίου',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]],
    war_id: this.fb.group({
      id_warehouse: ['ID Αποθήκης',[Validators.required,WhiteSpaceValidator.cannotContainSpace,Validators.pattern("^[0-9]*$")]]
    })
  })

  //gia to update by id
    onSubmit(){
    this._shelveService.shelveUpdate(this._shelveForm.value).subscribe(
      response => console.log(
        'Success',
        response,
        this.toitsu.showSuccessStay(),
        this.router.navigate(['shelve/'])),
      HttpErrorResponse => console.log('Error!',HttpErrorResponse,this.toitsu.showErrorUpdate()),
    );
  }
 
  //clear the data fields
    onReset(){
    this._shelveForm.reset;
  }

  //custom
  hello(){
    this._shelveService.getShelveDataById(this.route.snapshot.params.id).subscribe(data => {
    this._shelveForm = this.fb.group({
      id_shelve: [data['id_shelve']],
      description_shelve: [data['description_shelve']],
      war_id: this.fb.group({
          id_warehouse: [data['war_id']['id_warehouse']],
      })
});

    })
  }


}

