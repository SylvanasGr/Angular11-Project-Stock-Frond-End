// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiBaseUrl: 'http://10.0.0.122:8080/open1core',
  ssoFederationDomains: '',
  ssoFederationOrganizations: '',
  ssoUrl: 'https://processes.ots.local:8443/openonesso',
  ssoClientId: 'ots',
  ssoResponseType: 'token',
  ssoApplication: 'Open1Rent'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
