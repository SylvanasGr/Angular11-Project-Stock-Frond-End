import {Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output, Renderer2, SkipSelf} from '@angular/core';
import {ControlContainer, DefaultValueAccessor} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from 'primeng/dynamicdialog';
import {PropertyService} from '../property.service';
import {PropertyListDialogComponent} from '../property-list-dialog/property-list-dialog.component';

@Component({
  selector: 'app-select-property',
  templateUrl: 'select-property.component.html',
  styleUrls: ['./select-property.component.css'],
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new Optional(), new SkipSelf(), ControlContainer]]
    }
  ]
})
export class SelectPropertyComponent extends DefaultValueAccessor implements OnInit {
  
  @Input() controlName: string;
  @Input() model: number;
  @Output() modelChange = new EventEmitter<number>();
  
  @Input() inputId: string;
  @Input() disabled = false;
  
  propertyLabel: string;
  
  constructor(
    private renderer: Renderer2,
    private elementRef: ElementRef,
    private controlContainer: ControlContainer,
    private translate: TranslateService,
    private dialogService: DialogService,
    private propertyService: PropertyService
  ) {
    super(renderer, elementRef, true);
  }
  
  ngOnInit() {
    if (this.controlName) {
      // Reactive form
      let value = this.controlContainer['form'].controls[this.controlName].value;
      this.setPropertyLabel(value);
    }
    else {
      // Template driven form
      this.setPropertyLabel(this.model);
    }
  }
  
  emitModelChange() {
    this.modelChange.emit(this.model);
  }
  
  writeValue(value: any) {
    super.writeValue(value);
    
    if (this.controlName) {
      // Reactive form
      this.controlContainer['form'].controls[this.controlName].setValue(value);
    }
    else {
      // Template driven form
      this.model = value;
      this.emitModelChange();
    }
    
    this.setPropertyLabel(value);
  }
  
  setPropertyLabel(id) {
    if (id) {
      this.propertyService.getProperty(id).subscribe(responseData => {
        let propertyLabel = '';
        if (responseData && responseData['description']) {
            propertyLabel += responseData['description'];
        }
        else {
          propertyLabel = '-';
        }
        
        this.propertyLabel = propertyLabel;
      });
    }
    else {
      this.propertyLabel = null;
    }
  }
  
  hasId() {
    if (this.controlName) {
      // Reactive form
      return !!(this.controlContainer['form'].controls[this.controlName].value);
    }
    else {
      // Template driven form
      return !!(this.model);
    }
  }

  openDialog() {
    const dialogRef = this.dialogService.open(PropertyListDialogComponent, {
      header: this.translate.instant('property.select.dialogTitle'),
      width: '95%'
    });
    
    dialogRef.onClose.subscribe((result) => {
      this.writeValue(result);
    });
  }
  
  removeRecord() {
    this.writeValue(null);
  }
}
