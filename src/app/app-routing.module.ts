import {Routes} from '@angular/router';

import {IndexComponent} from './toitsu-layout/index/index.component';
import {LoginCallbackGuard} from './toitsu-auth/login-callback.guard';
import {Toitsu401Component} from './toitsu-shared/toitsu-401/toitsu-401.component';
import {Toitsu403Component} from './toitsu-shared/toitsu-403/toitsu-403.component';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { ProductComponent } from './product/product.component';
import { ShelveComponent } from './shelve/shelve.component';
import { ManagementComponent } from './management/management.component';
import { TestWindowComponent } from './management/managementUpdateWindow/test-window.component';

import { ProductUpdateWindowComponent } from './product/product-update-window/product-update-window.component';
import { ShelveUpdateWindowComponent } from './shelve/shelve-update-window/shelve-update-window.component';
import { WarehouseUpdateWindowComponent } from './warehouse/warehouse-update-window/warehouse-update-window.component';

export const appRoutes: Routes = [
  {path: '', component: IndexComponent},
  {path: 'logincallback', canActivate: [LoginCallbackGuard], component: IndexComponent},
  {path: '401', component: Toitsu401Component, data: {title: 'global.error.401.title'}},
  {path: '403', component: Toitsu403Component, data: {title: 'global.error.403.title'}},
  {path: 'rn', loadChildren: () => import('./rn/rn.module').then(m => m.RnModule)},
  {path: 'sa', loadChildren: () => import('./sa/sa.module').then(m => m.SaModule)},
  {path: 'warehouse/:id',component:WarehouseUpdateWindowComponent},
  {path: 'warehouse',component:WarehouseComponent},
  {path: 'product',component:ProductComponent},
  {path: 'product/:id',component:ProductUpdateWindowComponent},
  {path: 'shelve',component:ShelveComponent},
  {path: 'shelve/:id',component:ShelveUpdateWindowComponent},
  {path: 'management',component:ManagementComponent},
  {path: 'management/:id',component:TestWindowComponent},
  {path: '**', redirectTo: ''}
];

export class AppRoutingModule {
}
