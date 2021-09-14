import {NgModule} from '@angular/core';
import {SelectAmphibianComponent} from './select-amphibian/select-amphibian.component';
import {ToitsuSharedModule} from '../toitsu-shared/toitsu-shared.module';

@NgModule({
  declarations: [
    SelectAmphibianComponent
  ],
  imports: [
    ToitsuSharedModule
  ],
  exports: [
    SelectAmphibianComponent
  ]
})
export class GeneralModule {
}
