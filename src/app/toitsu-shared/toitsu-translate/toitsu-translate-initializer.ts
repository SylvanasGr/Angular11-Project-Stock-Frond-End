import {Injector} from '@angular/core';
import {LOCATION_INITIALIZED} from '@angular/common';
import {TranslateService} from '@ngx-translate/core';

export function toitsuTranslateInitializer(translate: TranslateService, injector: Injector) {
  
  return () => new Promise<any>((resolve: any) => {
    const defaultLanguage = 'el';
    
    const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
    locationInitialized.then(() => {
      translate.setDefaultLang(defaultLanguage);
      
      const toitsuLanguage = localStorage.getItem('toitsuLanguage');
      let languageToUse = toitsuLanguage ? toitsuLanguage : defaultLanguage;
      
      translate.use(languageToUse).subscribe(() => {
        // console.log(`Successfully initialized '${defaultLanguage}' language.'`);
      }, err => {
        // console.error(`Problem with '${defaultLanguage}' language initialization.'`);
      }, () => {
        resolve(null);
      });
    });
  });
}
