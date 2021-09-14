import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {AppComponent} from '../../app.component';
import {TranslateService} from '@ngx-translate/core';
import {AuthService} from '../../toitsu-auth/auth.service';
import {ToitsuNavitemComponent} from './toitsu-navitem.component';

@Injectable({providedIn: 'root'})
export class ToitsuNavService {
  
  constructor(private translate: TranslateService, private authService: AuthService) {
  }
  
  model: any[];
  layoutModel: any[];
  
  private menuSource = new Subject<string>();
  private resetSource = new Subject();
  
  menuSource$ = this.menuSource.asObservable();
  resetSource$ = this.resetSource.asObservable();
  
  navItems: ToitsuNavitemComponent[] = [];
  
  onMenuStateChange(key: string) {
    this.menuSource.next(key);
  }
  
  reset() {
    this.resetSource.next();
  }
  


  initializeModel() {
    this.model = [
      {
        label: this.translate.instant('rn.property'), icon: 'fa fa-fw fa-building', routerLink: ['/rn/property/list'],
        needPermission: true, permission: this.authService.hasPermission('rn_property_index')
      },
      {
        label: this.translate.instant('sa.appLog'), icon: 'fa fa-fw fa-bug', routerLink: ['/sa/applog/list'],
        needPermission: true, permission: this.authService.hasPermission('sa_applog')
      },
      {
        label:"Άσκηση Angular" , icon: 'fa fa-star', needPermission: false,
        items:[
            {
        label: "Αποθήκη", icon: 'fa fa-university', routerLink: ['/warehouse'],
        needPermission: false,
        
      },
      {
        label: "Ράφια", icon: 'fa fa-wrench',  routerLink: ['/shelve'],
        needPermission: false,
      },
      {
        label: "Προΐόντα", icon: 'fa fa-gavel',  routerLink: ['/product'],
        needPermission: false,
      },
      {
        label: "Δέλτιο Εισαγώγων/Εξαγώγων", icon: 'fa fa-window-restore', routerLink:['/management'],
        needPermission: false,
      }
        ]
      },
      
    ];
    
    this.model.push(...this.layoutModel);
  }
  
  initializeLayoutModel(app: AppComponent) {
    this.layoutModel = [
      {
        label: this.translate.instant('global.display'), icon: 'fa fa-fw fa-paint-brush',
        items: [
          {
            label: 'Themes', icon: 'fa fa-fw fa-paint-brush',
            items: [
              {
                label: 'Solid',
                icon: 'fa fa-fw fa-paint-brush',
                items: [
                  {
                    label: 'Blue', icon: 'fa fa-fw fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('blue', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('blue', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('blue', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Cyan', icon: 'fa fa-fw fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('cyan', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('cyan', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('cyan', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Green', icon: 'fa fa-fw fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('green', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('green', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('green', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Yellow', icon: 'fa fa-fw fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('yellow', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('yellow', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('yellow', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Purple', icon: 'fa fa-fw fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('purple', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('purple', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('purple', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Pink', icon: 'fa fa-fw fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('pink', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('pink', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('pink', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Blue Grey', icon: 'fa fa-fw fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('bluegrey', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('bluegrey', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('bluegrey', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Teal', icon: 'fa fa-fw fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('teal', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('teal', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('teal', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Orange', icon: 'fa fa-fw fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('orange', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('orange', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('orange', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Grey', icon: 'fa fa-fw fa-paint-brush',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('grey', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('grey', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('grey', 'gradient')
                      }
                    ]
                  }
                ]
              },
              {
                label: 'Special',
                icon: 'fa fa-fw fa-paint-brush',
                items: [
                  {
                    label: 'Cappuccino', icon: 'fa fa-fw fa-picture-o',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('cappuccino', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('cappuccino', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('cappuccino', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Montreal', icon: 'fa fa-fw fa-picture-o',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('montreal', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('montreal', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('montreal', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Hollywood', icon: 'fa fa-fw fa-picture-o',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('hollywood', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('hollywood', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('hollywood', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Peak', icon: 'fa fa-fw fa-picture-o',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('peak', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('peak', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('peak', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Alive', icon: 'fa fa-fw fa-certificate',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('alive', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('alive', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('alive', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Emerald', icon: 'fa fa-fw fa-certificate',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('emerald', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('emerald', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('emerald', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Ash', icon: 'fa fa-fw fa-certificate',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('ash', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('ash', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('ash', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Noir', icon: 'fa fa-fw fa-certificate',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('noir', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('noir', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('noir', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Mantle', icon: 'fa fa-fw fa-certificate',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('mantle', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('mantle', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('mantle', 'gradient')
                      }
                    ]
                  },
                  {
                    label: 'Predawn', icon: 'fa fa-fw fa-certificate',
                    items: [
                      {
                        label: 'Light', icon: 'fa fa-fw fa-square-o',
                        command: (event) => app.changeTheme('predawn', 'light')
                      },
                      {
                        label: 'Dark', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('predawn', 'dark')
                      },
                      {
                        label: 'Gradient', icon: 'fa fa-fw fa-square',
                        command: (event) => app.changeTheme('predawn', 'gradient')
                      }
                    ]
                  },
                ]
              }
            ]
          },
          {
            label: 'Menu Modes', icon: 'fa fa-fw fa-bars',
            items: [
              {label: 'Static Menu', icon: 'fa fa-fw fa-bars', command: () => app.changeLayoutMode('static')},
              {label: 'Overlay Menu', icon: 'fa fa-fw fa-bars', command: () => app.changeLayoutMode('overlay')},
              {label: 'Slim Menu', icon: 'fa fa-fw fa-bars', command: () => app.changeLayoutMode('slim')},
              {label: 'Horizontal Menu', icon: 'fa fa-fw fa-bars', command: () => app.changeLayoutMode('horizontal')}
            ]
          }
        ]
      }
    ];
  }
  
  setActiveMenu() {
    for (let navItem of this.navItems) {
      if (navItem.item.routerLink) {
        navItem.updateActiveStateFromRoute();
      }
      else {
        navItem.updateActiveStateForNonFinalItem();
      }
    }
  }
}
