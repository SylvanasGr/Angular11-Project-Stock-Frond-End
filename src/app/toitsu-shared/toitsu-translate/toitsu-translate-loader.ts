import {HttpClient} from '@angular/common/http';
import {MultiTranslateHttpLoader} from 'ngx-translate-multi-http-loader';

export function toitsuTranslateLoader(http: HttpClient) {
  return new MultiTranslateHttpLoader(http, [
    {prefix: './assets/messages/global-', suffix: '.json'},
    {prefix: './assets/messages/menu-', suffix: '.json'},
    {prefix: './assets/messages/rn/property-', suffix: '.json'},
    {prefix: './assets/messages/rn/urban-fix-', suffix: '.json'},
    {prefix: './assets/messages/rn/property-weight-', suffix: '.json'},
    {prefix: './assets/messages/sa/app-log-', suffix: '.json'}
  ]);
}
