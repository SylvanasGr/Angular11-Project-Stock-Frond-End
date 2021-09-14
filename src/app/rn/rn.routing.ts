import {Routes} from '@angular/router';

import {AuthGuard} from '../toitsu-auth/auth.guard';
import {ExitConfirmationGuard} from '../toitsu-shared/exit-confirmation.guard';
import {PropertyListComponent} from './property/property-list.component';
import {PropertyViewComponent} from './property/property-view.component';
import {PropertyResolver} from './property/property.resolver';

export const rnRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'property',
        children: [
          {path: 'list', component: PropertyListComponent, canActivate: [AuthGuard],
            data: {
              title: 'rn.property',
              breadcrumbs: [
                {label: 'rn.property', routerLink: ['/rn/property/list']}
              ],
              permissions: ['rn_property_index'], anyPermission: true
            }
          },
          {path: 'view', component: PropertyViewComponent, canActivate: [AuthGuard], canDeactivate: [ExitConfirmationGuard],
            data: {
              title: 'rn.property.new',
              breadcrumbs: [
                {label: 'rn.property', routerLink: ['/rn/property/list']},
                {label: 'rn.property.new', routerLink: ['/rn/property/view']}
              ],
              permissions: ['rn_property_create']
            }
          },
          {path: 'view/:id', component: PropertyViewComponent, canActivate: [AuthGuard], canDeactivate: [ExitConfirmationGuard],
            resolve: {record: PropertyResolver},
            data: {
              title: 'rn.property.edit',
              breadcrumbs: [
                {label: 'rn.property', routerLink: ['/rn/property/list']},
                {label: 'rn.property.edit', routerLink: ['/rn/property/view']}
              ],
              permissions: ['rn_property_update']
            }
          }
        ]
      }
    ]
  }
];
