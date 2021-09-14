import {Component} from '@angular/core';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';

@Component({
  selector: 'app-select-amphibian',
  templateUrl: 'select-amphibian.component.html'
})

export class SelectAmphibianComponent {
  
  message: string;
  
  constructor(private dynamicDialogConfig: DynamicDialogConfig) {
    this.message = this.dynamicDialogConfig.data['message'];
  }
  
}
