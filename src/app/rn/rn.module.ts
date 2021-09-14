import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {rnRoutes} from './rn.routing';
import {ToitsuSharedModule} from '../toitsu-shared/toitsu-shared.module';
import {GeneralModule} from '../_general/general.module';

import {PropertyListComponent} from './property/property-list.component';
import {PropertyViewComponent} from './property/property-view.component';
import {SelectPropertyComponent} from './property/select-property/select-property.component';
import {PropertyListDialogComponent} from './property/property-list-dialog/property-list-dialog.component';

@NgModule({
  declarations: [
    PropertyListComponent,
    PropertyViewComponent,
    SelectPropertyComponent,
    PropertyListDialogComponent
  ],
  imports: [
    RouterModule.forChild(rnRoutes),
    ToitsuSharedModule,
    GeneralModule
  ]
})
export class RnModule {
}
