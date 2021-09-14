import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {SelectItem} from 'primeng/api';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {propertyConsts} from '../property.consts';
import {PropertyTypeService} from '../../property-type/property-type.service';
import {EnumService} from '../../../cm/enum/enum.service';
import {ToitsuToasterService} from '../../../toitsu-shared/toitsu-toaster/toitsu-toaster.service';

@Component({
  selector: 'app-rn-property-list-dialog',
  templateUrl: 'property-list-dialog.component.html'
})
export class PropertyListDialogComponent implements OnInit {
  
  url = propertyConsts.indexUrl;
  
  cols = [
    {field: 'rowNum', header: '', sortField: '', width: '5px'},
    {field: 'kaek', header: this.translate.instant('property.kaek'), sortField: 'kaek', width: '35px'},
    {field: 'description', header: this.translate.instant('property.description'), sortField: 'description', width: '60px'}
  ];
  
  sortField = 'kaek';
  sortOrder = 1;
  
  args = this.initializeArgs();
  
  @ViewChild('table') table;
  
  selectedRowData: any;
  
  propertyTypes: Array<{}>;
  statuses: Array<SelectItem>;
  
  constructor(
    private dynamicDialogRef: DynamicDialogRef,
    private translate: TranslateService,
    private router: Router,
    private toitsuToasterService: ToitsuToasterService,
    private propertyTypeService: PropertyTypeService,
    private enumService: EnumService
  ) {
    
  }
  
  ngOnInit() {
    // Get the lists
    this.propertyTypeService.getAllPropertyTypes().subscribe(responseData => {
      this.propertyTypes = responseData;
    });
    this.enumService.getEnumValues('rn.core.enums.PropertyStatus').subscribe(responseData => {
      this.statuses = responseData;
    });
  }
  
  initializeArgs() {
    return {
      isActive: true,
      propertyTypeId: null,
      kaek: null,
      description: null,
      status: null,
    };
  }
  
  rowDblClicked(rowData) {
    let id = rowData['id'];
    this.dynamicDialogRef.close(id);
  }
  
  rowSelected(rowData) {
    this.selectedRowData = rowData['data'];
  }
  
  rowUnselected(rowData) {
    this.selectedRowData = null;
  }
  
  loadTableData() {
    this.table.loadTableData();
  }
  
  clearArgs() {
    this.args = this.initializeArgs();
  }
  
  confirm() {
    if (!this.selectedRowData) {
      this.toitsuToasterService.showErrorStay(this.translate.instant('global.recordNotSelected'));
    }
    else {
      this.toitsuToasterService.clearMessages();
      this.dynamicDialogRef.close(this.selectedRowData['id']);
    }
  }
  
  cancel() {
    this.dynamicDialogRef.close();
  }
}
