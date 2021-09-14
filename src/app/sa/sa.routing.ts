import {Routes} from '@angular/router';

import {AuthGuard} from '../toitsu-auth/auth.guard';
import {AppLogListComponent} from './app-log/app-log-list.component';

export const saRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'applog',
        children: [
          {path: 'list', component: AppLogListComponent, canActivate: [AuthGuard],
            data: {
              title: 'sa.appLog',
              breadcrumbs: [
                {label: 'sa.appLog', routerLink: ['/sa/applog/list']}
              ],
              permissions: ['sa_applog'], anyPermission: true
            }
          }
        ]
      }
    ]
  }
];
