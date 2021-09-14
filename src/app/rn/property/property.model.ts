import {UrbanFix} from '../urban-fix/urban-fix.model';
import {PropertyWeight} from '../property-weight/property-weight.model';

export class Property {
  public id: number = null;
  public kaek: string = null;
  public description: string = null;
  public propertyTypeId: number = null;
  public manufactureDate: Date = null;
  public objectiveValue: number = null;
  public status: string = null;
  public isActive: boolean = null;
  public comments: string = null;
  public municipalityId: number = null;
  
  public urbanFixes: UrbanFix[] = [];
  public propertyWeights: PropertyWeight[] = [];
}
