import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormArray, Validators, FormGroup, FormControl} from '@angular/forms';
import {Property} from './property.model';
import {UrbanFix} from '../urban-fix/urban-fix.model';
import {PropertyWeight} from '../property-weight/property-weight.model';
import {ToitsuSharedService} from '../../toitsu-shared/toitsu-shared.service';
import {propertyConsts} from './property.consts';
import {environment} from '../../../environments/environment';

@Injectable({providedIn: 'root'})
export class PropertyService {
  
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toitsuSharedService: ToitsuSharedService
  ) {}
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  initializePropertyForm(property?) {
    
    // If there is no given object, initialize a new one
    if (!property) {
      property = new Property();
    }
    
    // Create reactive form out of the object
    let form = this.formBuilder.group(property);
    
    // For each property in the response that is an array,
    // we need to create the form groups separately and re-add them to the main form group
    
    // Urban fixes
    let urbanFixesArray = new FormArray([]);
    for (let urbanFix of property['urbanFixes']) {
      urbanFixesArray.push(this.formBuilder.group(urbanFix));
    }
    form.removeControl('urbanFixes');
    form.addControl('urbanFixes', urbanFixesArray);
    
    // Property Weights
    let propertyWeightsArray = new FormArray([]);
    for (let propertyWeight of property['propertyWeights']) {
      propertyWeightsArray.push(this.formBuilder.group(propertyWeight));
    }
    form.removeControl('propertyWeights');
    form.addControl('propertyWeights', propertyWeightsArray);
    
    
    // Add validators
    form.controls['kaek'].setValidators([Validators.required, this.kaekOne]);
    
    let urbanFixArray = (<FormArray> form.controls['urbanFixes']).controls;
    for (let urbanFix of urbanFixArray) {
      (<FormGroup> urbanFix).controls['comments'].setValidators([this.urbanFixCommentsIfKind]);
    }
    
    return form;
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  // Custom validators
  // -----------------
  
  kaekOne(control: FormControl) {
    const formValue = control.parent.value;
    if (control.value === '1' && formValue['comments'] !== 'one') {
      return {notOne: true};
    }
    else {
      return null;
    }
  }
  
  urbanFixCommentsIfKind(control: FormControl) {
    const formValue = control.parent.value;
    if (!control.value && formValue['kind']) {
      return {nullWithKind: true};
    }
    else {
      return null;
    }
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  addUrbanFix(propertyForm: FormGroup) {
    const urbanFix = new UrbanFix();
    let formGroup = this.formBuilder.group(urbanFix);
    formGroup.controls['comments'].setValidators([this.urbanFixCommentsIfKind]);
    (<FormArray> propertyForm.controls['urbanFixes']).push(formGroup);
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  removeUrbanFix(propertyForm: FormGroup, index: number) {
    (<FormArray> propertyForm.controls['urbanFixes']).controls[index].markAsTouched();
    (<FormArray> propertyForm.controls['urbanFixes']).removeAt(index);
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  addPropertyWeight(propertyForm: FormGroup) {
    const propertyWeight = new PropertyWeight();
    let formGroup = this.formBuilder.group(propertyWeight);
    (<FormArray> propertyForm.controls['propertyWeights']).push(formGroup);
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  removePropertyWeight(propertyForm: FormGroup, index: number) {
    (<FormArray> propertyForm.controls['propertyWeights']).controls[index].markAsTouched();
    (<FormArray> propertyForm.controls['propertyWeights']).removeAt(index);
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  getProperty(id) {
    return this.http
      .get(
        environment.apiBaseUrl + propertyConsts.getUrl,
        {
          params: this.toitsuSharedService.initHttpParams({id})
        }
      );
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  saveProperty(property) {
    return this.http
      .post(
        environment.apiBaseUrl + propertyConsts.saveUrl,
        property
      );
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  deleteProperty(id) {
    return this.http
      .delete(
        environment.apiBaseUrl + propertyConsts.deleteUrl,
        {
          params: this.toitsuSharedService.initHttpParams({id})
        }
      );
  }
}
