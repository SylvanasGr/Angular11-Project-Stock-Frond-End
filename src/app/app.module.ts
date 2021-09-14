import {APP_INITIALIZER, Injector, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app-routing.module';
import {TranslateLoader, TranslateModule, TranslateService} from '@ngx-translate/core';
import {toitsuTranslateLoader} from './toitsu-shared/toitsu-translate/toitsu-translate-loader';
import {toitsuTranslateInitializer} from './toitsu-shared/toitsu-translate/toitsu-translate-initializer';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {ToitsuSharedModule} from './toitsu-shared/toitsu-shared.module';
import {GeneralModule} from './_general/general.module';

import {AppComponent} from './app.component';
import {ToitsuNavComponent} from './toitsu-layout/toitsu-nav/toitsu-nav.component';
import {ToitsuNavitemComponent} from './toitsu-layout/toitsu-nav/toitsu-navitem.component';
import {ToitsuBreadcrumbComponent} from './toitsu-layout/toitsu-breadcrumb/toitsu-breadcrumb.component';
import {ToitsuHeaderComponent} from './toitsu-layout/toitsu-header/toitsu-header.component';
import {ToitsuFooterComponent} from './toitsu-layout/toitsu-footer/toitsu-footer.component';
import {IndexComponent} from './toitsu-layout/index/index.component';
import {AuthInterceptorService} from './toitsu-auth/auth-interceptor.service';
import { SearchFilterPiper } from './toitsu-shared/my-shared/pipe';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ProductComponent } from './product/product.component';
import { ShelveComponent } from './shelve/shelve.component';
import { ManagementComponent } from './management/management.component';
import { TestWindowComponent } from './management/managementUpdateWindow/test-window.component';
import { ProductUpdateWindowComponent } from './product/product-update-window/product-update-window.component';
import { ShelveUpdateWindowComponent } from './shelve/shelve-update-window/shelve-update-window.component';
import { WarehouseUpdateWindowComponent } from './warehouse/warehouse-update-window/warehouse-update-window.component';

@NgModule({
  declarations: [
    AppComponent,
    ToitsuNavComponent,
    ToitsuNavitemComponent,
    ToitsuHeaderComponent,
    ToitsuFooterComponent,
    ToitsuBreadcrumbComponent,
    IndexComponent,
    ManagementComponent,
    SearchFilterPiper,
    WarehouseComponent,
    ProductComponent,
    ShelveComponent,
    TestWindowComponent,
    ProductUpdateWindowComponent,
    ShelveUpdateWindowComponent,
    WarehouseUpdateWindowComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (toitsuTranslateLoader),
        deps: [HttpClient]
      }
    }),
    ToitsuSharedModule,
    GeneralModule,
    
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: toitsuTranslateInitializer,
      deps: [TranslateService, Injector],
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    MessageService,
    ConfirmationService,
    DialogService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
