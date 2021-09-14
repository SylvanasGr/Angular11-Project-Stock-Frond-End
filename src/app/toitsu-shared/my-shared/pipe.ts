import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPiper implements PipeTransform {

transform(value: any, args?: any): any {
  if(!value) return null;
  if(!args) return value;

  args = args.toLowerCase();
  debugger;
  return value.filter(function(item) {
    return JSON.stringify(item).toLowerCase().includes(args);
  });
}
}


  @Pipe({
        name: 'FilterPipe',
    })
    export class FilterPipe implements PipeTransform {
    
        transform(ninjas: any, term: any): any {  
          if(term === undefined) return ninjas;
          return ninjas.filter(function(ninja){
            return ninja.name.toLowerCase().includes(term.toLowerCase());
          })
    }
  }
