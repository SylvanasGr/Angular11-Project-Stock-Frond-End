import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ConfirmationService, SelectItem} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';
import {Observable} from 'rxjs';
import {ExitConfirmation} from '../../toitsu-shared/exit-confirmation.guard';
import {ToitsuToasterService} from '../../toitsu-shared/toitsu-toaster/toitsu-toaster.service';
import {ToitsuBlockUiService} from '../../toitsu-shared/toitsu-blockui/toitsu-block-ui.service';
import {ToitsuSharedService} from '../../toitsu-shared/toitsu-shared.service';
import {PropertyService} from './property.service';
import {UrbanFixService} from '../urban-fix/urban-fix.service';
import {PropertyWeightService} from '../property-weight/property-weight.service';
import {PropertyTypeService} from '../property-type/property-type.service';
import {EnumService} from '../../cm/enum/enum.service';
import {AuthService} from '../../toitsu-auth/auth.service';
import {SelectPropertyComponent} from './select-property/select-property.component';

@Component({
  selector: 'app-rn-property-view',
  templateUrl: 'property-view.component.html'
})

export class PropertyViewComponent implements OnInit, ExitConfirmation {
  
  id: number;
  propertyForm: FormGroup;
  
  propertyTypes: Array<{}>;
  statuses: Array<SelectItem>;
  urbanFixKinds: Array<SelectItem>;
  propertyWeightKinds: Array<SelectItem>;
  
  urbanFixesActiveIndex = -1;
  
  @ViewChild('selectProperty') selectProperty: SelectPropertyComponent;
  
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private translate: TranslateService,
    private route: ActivatedRoute,
    private router: Router,
    private confirmationService: ConfirmationService,
    private toitsuToasterService: ToitsuToasterService,
    private toitsuBlockUiService: ToitsuBlockUiService,
    private toitsuSharedService: ToitsuSharedService,
    private propertyService: PropertyService,
    private urbanFixService: UrbanFixService,
    private propertyWeightService: PropertyWeightService,
    private propertyTypeService: PropertyTypeService,
    private enumService: EnumService,
    public authService: AuthService,
  )  {}

  ngOnInit() {
    // Id from route
    this.id = +this.route.snapshot.params['id'];
    
    // Record from route resolver 
    let record = this.route.snapshot.data['record'];
    
    // Get the lists
    this.propertyTypeService.getAllPropertyTypes().subscribe(responseData => {
      this.propertyTypes = responseData;
    });
    this.enumService.getEnumValues('rn.core.enums.PropertyStatus').subscribe(responseData => {
      this.statuses = responseData;
    });
    this.enumService.getEnumValues('rn.core.enums.UrbanFixKind').subscribe(responseData => {
      this.urbanFixKinds = responseData;
    });
    this.enumService.getEnumValues('rn.core.enums.PropertyWeightKind').subscribe(responseData => {
      this.propertyWeightKinds = responseData;
    });
    
    // Initialize the form
    this.propertyForm = this.propertyService.initializePropertyForm(record);
    
    if (this.id) {
      this.urbanFixesActiveIndex = this.propertyForm.value.urbanFixes.length - 1;
    }
  }
  
  confirmExit(): boolean | Observable<boolean> {
    return this.propertyForm.dirty;
  }
  
  saveProperty() {
    this.toitsuToasterService.clearMessages();
    
    // Rerun frontend validation
    this.toitsuSharedService.updateTreeValidity(this.propertyForm);
    
    // Check form validity
    if (!this.propertyForm.valid) {
      console.log(this.propertyForm);
      this.toitsuToasterService.showErrorStay(this.translate.instant('global.validationErrors'));
      return;
    }
    
    this.toitsuBlockUiService.blockUi();
    
    this.propertyService.saveProperty(this.propertyForm.value).subscribe(
      responseData => {
        this.toitsuToasterService.showSuccessStay();
        if (!this.id) {
          this.propertyForm.markAsPristine();
          this.router.navigate(['/rn/property/view', responseData['id']]);
        }
        else {
          this.propertyForm = this.propertyService.initializePropertyForm(responseData);
        }
      },
      responseError => {
        this.toitsuToasterService.apiValidationErrors(responseError);
      }
    ).add(() => {
      this.toitsuBlockUiService.unblockUi();
    });
      
  }
  
  deleteProperty() {
    this.confirmationService.confirm({
      message: this.translate.instant('global.delete.confirmation'),
      accept: () => {
        this.toitsuToasterService.clearMessages();
        this.toitsuBlockUiService.blockUi();

        this.propertyService.deleteProperty(this.propertyForm.value.id).subscribe(
          responseData => {
            this.toitsuToasterService.showSuccessStay(this.translate.instant('global.delete.success'));
            this.propertyForm.markAsPristine();
            this.router.navigate(['/rn/property/list']);
          },
          responseError => {
            this.toitsuToasterService.apiValidationErrors(responseError);
          }
        ).add(() => {
          this.toitsuBlockUiService.unblockUi();
        });
      }
    });
  }
  
  propertyTypeIdChanged(event) {
    console.log(event);
    console.log(this.propertyForm.value.propertyTypeId);
  }
  
  statusChanged() {
    console.log(this.propertyForm.value.status);
  }
  
  setObjectiveValue() {
    this.propertyForm.controls['objectiveValue'].setValue(4096.18);
  }
  
  setTestPropertyId() {
    this.propertyForm.controls['municipalityId'].setValue(47);
    this.selectProperty.writeValue(47);
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  // Urban Fixes
  
  getUrbanFixControls() {
    return (<FormArray> this.propertyForm.get('urbanFixes')).controls;
  }
  
  addUrbanFix() {
    this.propertyService.addUrbanFix(this.propertyForm);
    this.changeDetectorRef.detectChanges();
    this.urbanFixesActiveIndex = this.propertyForm.value.urbanFixes.length - 1;
  }
  
  deleteUrbanFix(index, id) {
    this.confirmationService.confirm({
      message: this.translate.instant('global.delete.confirmation'),
      accept: () => {
        if (!id) {
          this.propertyService.removeUrbanFix(this.propertyForm, index);
          this.urbanFixesActiveIndex = -1;
        }
        else {
          this.toitsuToasterService.clearMessages();
          this.toitsuBlockUiService.blockUi();
          
          this.urbanFixService.deleteUrbanFix(id).subscribe(
            responseData => {
              this.toitsuToasterService.showSuccessStay(this.translate.instant('global.delete.success'));
              this.propertyService.removeUrbanFix(this.propertyForm, index);
              this.urbanFixesActiveIndex = -1;
            },
            responseError => {
              this.toitsuToasterService.apiValidationErrors(responseError);
            }
          ).add(() => {
            this.toitsuBlockUiService.unblockUi();
          });
        }
      }
    });
  }
  
  onUrbanFixOpen(event) {
    this.urbanFixesActiveIndex = event.index;
  }
  
  onUrbanFixClose(event) {
    this.urbanFixesActiveIndex = -1;
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
  
  // Property Weights
  
  getPropertyWeightControls() {
    return (<FormArray> this.propertyForm.get('propertyWeights')).controls;
  }
  
  addPropertyWeight() {
    this.propertyService.addPropertyWeight(this.propertyForm);
  }
  
  deletePropertyWeight(index, id) {
    this.confirmationService.confirm({
      message: this.translate.instant('global.delete.confirmation'),
      accept: () => {
        if (!id) {
          this.propertyService.removePropertyWeight(this.propertyForm, index);
        }
        else {
          this.toitsuToasterService.clearMessages();
          this.toitsuBlockUiService.blockUi();
          
          this.propertyWeightService.deletePropertyWeight(id).subscribe(
            responseData => {
              this.toitsuToasterService.showSuccessStay(this.translate.instant('global.delete.success'));
              this.propertyService.removePropertyWeight(this.propertyForm, index);
            },
            responseError => {
              this.toitsuToasterService.apiValidationErrors(responseError);
            }
          ).add(() => {
            this.toitsuBlockUiService.unblockUi();
          });
        }
      }
    });
  }
  
  // ---------------------------------------------------------------------------------------------------------------------------------------
}
