import {Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {LazyLoadEvent} from 'primeng/api';
import {ToitsuTableService} from './toitsu-table.service';
import {ToitsuToasterService} from '../toitsu-toaster/toitsu-toaster.service';
import {ExportService} from '../../cm/export/export.service';
import {ExportModel} from '../../cm/export/export.model';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-toitsu-table',
  templateUrl: './toitsu-table.component.html'
})
export class ToitsuTableComponent implements OnInit{
  
  @Input() url: string;
  @Input() cols: {}[];
  @Input() args: {};
  @Input() viewLink: string;
  @Input() excel: boolean;
  @Input() exportModel: ExportModel;
  
  @Output() loadComplete = new EventEmitter<{}>();
  @Output() loadError = new EventEmitter<{}>();
  @Output() rowClicked = new EventEmitter<{}>();
  @Output() rowDblClicked = new EventEmitter<{}>();
  
  @Input() selectionMode: string = 'single';
  @Output() rowSelected = new EventEmitter<{}>();
  @Output() rowUnselected = new EventEmitter<{}>();
  
  @Input() rowsPerPageOptions = this.toitsuTableService.ROWS_PER_PAGE_OPTIONS;
  @Input() first = this.toitsuTableService.FIRST;
  @Input() rows = this.toitsuTableService.ROWS;
  @Input() sortField = 'id';
  @Input() sortOrder = 1;
  
  @Input('loadOnInit') lazyLoadOnInit = false;
  
  @ContentChild('cell1', {static: false}) cell1Ref: TemplateRef<any>;
  @ContentChild('cell2', {static: false}) cell2Ref: TemplateRef<any>;
  @ContentChild('cell3', {static: false}) cell3Ref: TemplateRef<any>;
  
  data: {}[];
  totalRecords: number;
  loading: boolean;
  
  storedPaging = {};
  
  constructor(private http: HttpClient,
              private router: Router,
              private toitsuToasterService: ToitsuToasterService,
              private toitsuTableService: ToitsuTableService,
              private exportService: ExportService
  ) {}
  
  ngOnInit() {
    this.loading = !!this.lazyLoadOnInit;
  }
  
  public loadTableData(event: LazyLoadEvent) {
    
    this.loading = true;
    
    let theFirst = this.first;
    let theRows = this.rows;
    let theSortField = this.sortField;
    let theSortOrder = this.sortOrder;
    
    if (event && event.hasOwnProperty('sortField')) {
      // Event triggered from table
      
      // event.first = First row offset
      // event.rows = Number of rows per page
      // event.sortField = Field name to sort with
      // event.sortOrder = Sort order as number, 1 for asc and -1 for desc
      
      theFirst = event.first;
      theRows = event.rows;
      theSortField = event.sortField;
      theSortOrder = event.sortOrder;
    }
    
    const page = String(theFirst / theRows + 1);
    const rows = String(theRows);
    const sidx = theSortField ? theSortField : 'id';
    const sord = theSortOrder === 1 ? 'asc' : 'desc';
    
    let pageParams = new HttpParams();
    pageParams = pageParams.append('page', page);
    pageParams = pageParams.append('rows', rows);
    pageParams = pageParams.append('sidx', sidx);
    pageParams = pageParams.append('sord', sord);
    
    this.http
      .post<PageModel>(
        environment.apiBaseUrl + this.url,
        this.args,
        {
          params: pageParams
        }
      ).subscribe(
        responseData => {
          this.data = responseData.content;
          this.totalRecords = responseData.totalElements;
          
          this.storedPaging = {
            first: theFirst,
            rows: theRows,
            sortField: theSortField,
            sortOrder: theSortOrder
          };
          
          this.loadComplete.emit(responseData);
        },
        responseError => {
          this.toitsuToasterService.apiValidationErrors(responseError);
          
          this.loadError.emit(responseError);
        }
      ).add(() => {
        this.loading = false;
      });
    
  }
  
  onRowClick(rowData) {
    this.rowClicked.emit(rowData);
  }
  
  onRowDblClick(rowData) {
    this.rowDblClicked.emit(rowData);
    
    if (this.viewLink) {
      this.router.navigate([this.viewLink, rowData.id]);
    }
  }
  
  onRowSelect(rowData) {
    this.rowSelected.emit(rowData);
  }
  
  onRowUnselect(rowData) {
    this.rowUnselected.emit(rowData);
  }
  
  exportToExcel() {
    this.loading = true;
    
    let sidx = this.sortField ? this.sortField : 'id';
    let sord = this.sortOrder === 1 ? 'asc' : 'desc';
    
    let searchString = JSON.stringify(this.args);
    let model = this.exportService.prepareExcelModel(this.cols);
    
    this.exportService.exportToExcel(searchString, model, sidx, sord, this.exportModel)
      .subscribe(
        responseData => {
          this.exportService.saveAsExcelFile(responseData, this.exportModel.title, '.xlsx');
        },
        responseError => {
          this.toitsuToasterService.apiValidationErrors(responseError);
        }
      ).add(() => {
        this.loading = false;
      });
  }
}

class PageModel {
  content: any[];
  totalElements: number;
}
