export interface management_data
{
  id_action: number;
  action_description:string;
  supplier:string;
  recipient:string;
  date:Date;
  quantity:number;
  war_id:warehouseNested
  product_id:shelveNested
  shelve_id:productNested
}

export interface warehouseNested{
  id_warehouse:number;
}
export interface shelveNested{
  id_shelve:number;
}
export interface productNested{
  id_product:number;
  product_quantity:number;
}
