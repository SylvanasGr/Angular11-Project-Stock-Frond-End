import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {saRoutes} from './sa.routing';
import {ToitsuSharedModule} from '../toitsu-shared/toitsu-shared.module';
import {GeneralModule} from '../_general/general.module';

import {AppLogListComponent} from './app-log/app-log-list.component';

@NgModule({
  declarations: [
    AppLogListComponent
  ],
  imports: [
    RouterModule.forChild(saRoutes),
    ToitsuSharedModule,
    GeneralModule
  ]
})
export class SaModule {
}
