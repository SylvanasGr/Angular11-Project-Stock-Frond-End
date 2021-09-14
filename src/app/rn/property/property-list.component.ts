import {Component, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {DialogService} from 'primeng/dynamicdialog';
import {ToitsuTableService} from '../../toitsu-shared/toitsu-table/toitsu-table.service';
import {ToitsuToasterService} from '../../toitsu-shared/toitsu-toaster/toitsu-toaster.service';
import {SelectAmphibianComponent} from '../../_general/select-amphibian/select-amphibian.component';
import {ExportModel} from '../../cm/export/export.model';
import {propertyConsts} from './property.consts';

@Component({
  selector: 'app-rn-property-list',
  templateUrl: 'property-list.component.html'
})

export class PropertyListComponent {
  
  url = propertyConsts.indexUrl;
  
  cols = [
    {field: 'rowNum', header: '', sortField: '', width: '5px', align: 'center'},
    {field: 'extraActions', header: this.translate.instant('global.extraActions'), sortField: '', width: '8px', align: 'center'},
    {field: 'statusLabel', header: this.translate.instant('property.status'), sortField: 'status', width: '10px', align: 'center'},
    {field: 'kaek', header: this.translate.instant('property.kaek'), sortField: 'kaek', width: '10px'},
    {field: 'description', header: this.translate.instant('property.description'), sortField: 'description', width: '30px'},
    {field: 'manufactureDate', header: this.translate.instant('property.manufactureDate'), sortField: 'manufactureDate', width: '15px', align: 'center'},
    {field: 'objectiveValue', header: this.translate.instant('property.objectiveValue'), sortField: 'objectiveValue', width: '10px', align: 'center',
      customCell: 'embedded', applyFunc: this.getCustomObjectiveValueCell, inExcel: true},
    {field: 'showKaek', header: this.translate.instant('property.list.showKaek'), sortField: '', width: '10px', align: 'center',
      customCell: 'cell1'},
    {field: 'showDescription', header: this.translate.instant('property.list.showDescription'), sortField: '', width: '10px', align: 'center',
      customCell: 'cell2'}
  ];
  
  private storedPaging = this.toitsuTableService.initializePagingFromLocalStorage(this.router.url);
  paging = this.storedPaging ? this.storedPaging : {
    first: this.toitsuTableService.FIRST,
    rows: this.toitsuTableService.ROWS,
    sortField: 'manufactureDate',
    sortOrder: -1
  };
  
  private storedArgs = this.toitsuTableService.initializeArgsFromLocalStorage(this.router.url);
  args = this.storedArgs ? this.storedArgs : this.initializeArgs();
  
  exportModel = new ExportModel(this.translate.instant('rn.property'), 'propertyController', 'propertyIndex', 'rn.args.PropertyArgs');
  
  viewLink = '/rn/property/view';
  
  @ViewChild('table') table;
  
  testArgs = {
    testPropertyId: 13
  };
  
  constructor(
    private translate: TranslateService,
    private router: Router,
    private dialogService: DialogService,
    private toitsuTableService: ToitsuTableService,
    private toitsuToasterService: ToitsuToasterService
  ) {}
  
  initializeArgs() {
    return {
      isActive: true,
      kaek: null,
      description: null,
      manufactureDateAfter: null,
      manufactureDateBefore: null
    };
  }
  
  loadComplete(responseData) {
    console.log(responseData);
    this.toitsuTableService.storeArgsAndPagingInLocalStorage(this.router.url, this.args, this.table);
  }
  
  loadError(responseError) {
    console.log(responseError);
  }
  
  rowClicked(rowData) {
    console.log('Row data');
    console.log(rowData);
    console.log('----------------');
    console.log('All table data');
    console.log(this.table.data);
  }
  
  loadTableData() {
    this.table.loadTableData();
  }
  
  clearArgs() {
    this.args = this.initializeArgs();
    this.toitsuTableService.removeArgsAndPagingFromLocalStorage(this.router.url);
  }
  
  newRecord() {
    this.router.navigate(['/rn/property/view']);
  }
  
  openSelectAmphibian() {
    this.dialogService.open(SelectAmphibianComponent, {
      data: {
        message: 'Hello from Toitsu NG!'
      },
      header: 'Amphibian Info',
      width: '50%'
    });
  }
  
  getCustomObjectiveValueCell(rowData, field) {
    if (rowData[field]) {
      return '<strong>' + rowData[field] + '</strong>';
    }
  }
  
  showKaekClicked(rowData) {
    this.toitsuToasterService.showInfoStay(this.translate.instant('property.kaek') + ': ' + rowData['kaek']);
  }
  
  showDescriptionClicked(rowData) {
    this.toitsuToasterService.showInfoStay(this.translate.instant('property.description') + ': ' + rowData['description']);
  }
}
