export interface product_data
{
  id_product:number;
  description_product:string;
  quantity_product:number,
  shelve_product_id:testNested
}

export interface testNested{
  id_shelve:number;
}



// <form [formGroup]="productForm" (ngSubmit)="onSubmit()">


//   <div>
//     <h2>Φόρμα Καταχώρησης Προΐόντος</h2>
//   </div>

//   <!-- φορμα για id της  -->
//   <div class="p-formgroup-inline">
//     <div class="p-field">
//       <input id="id_product" type="text" pInputText formControlName="id_product"
//         [class.is-invalid]="productForm.get('id_product').invalid && productForm.get('id_product').touched">
//     </div>

//     <!-- φορμα για περιγραφή της Προΐόντος -->
//     <div class="p-field">
//       <input id="description" type="text" pInputText formControlName="description_product">
//     </div>

//     <!-- φορμα για ποσότητα  Προΐόντος -->
//     <div class="p-field">
//       <input id="quantity" type="text" pInputText formControlName="quantity_product">
//     </div>

//     <!-- φορμα για την ραφιου που ανηκει το καθε προιον -->
//       <div class="p-field" formGroupName="shelve_product_id">
//         <div>
//           <input type="text" pInputText formControlName="id_shelve"
//             [class.is-invalid]="productForm.get('description_product').invalid && productForm.get('description_product').touched" />
//         </div>
//       </div>

//     <button [disabled]='!productForm.valid' pButton type="submit" label="Δημιουργία Προΐόντος"
//       class="p-button-success"></button>

//     <button (ngSubmit)="onReset()" pButton type="reset" label="Καθαρισμός Πεδίων" class="p-button-danger"></button>
//   </div>
// </form>


// <!-- alert messages
// <div *ngIf="productForm.get('id_product').invalid && productForm.get('id_product').touched">
//   <small>*Παρακαλώ συμπληρώστε το <strong>id</strong> Προΐόντος</small>
//   <br>
//   <small>*Δεν μπορείτε να χρησιμοποιήσετε <strong>κενά</strong> ή <strong>αλφαριθμητικά</strong> σαν ID.</small>
// </div>

// <div *ngIf="productForm.get('description_product').invalid && productForm.get('description_product').touched">
//   <small *ngIf="productForm.get('description_product').errors?.required">*Παρακαλώ συμπληρώστε το
//     <strong>description</strong> Προΐόντος
//   </small>
//   <br>
//   <small *ngIf="productForm.get('description_product').errors?.minlength">*Παρακαλώ συμπληρώστε τουλάχιστων
//     <strong>5 ψηφία</strong>
//   </small>
// </div>

// <div *ngIf="productForm.get('war_id.id_warehouse').invalid && productForm.get('war_id.id_warehouse').touched">
//   <small>*Παρακαλώ συμπληρώστε το <strong>id</strong> Αποθήκης</small>
//   <br>
//   <small>*Δεν μπορείτε να χρησιμοποιήσετε <strong>κενά</strong> ή <strong>αλφαριθμητικά</strong> σαν ID.</small>
// </div> -->



// <!-- Filter/ Search -->
//  <div class="topnav">
//   <input type="text" [(ngModel)]="searchText" placeholder="Aναζήτηση">
// </div> 
// <!-- τραπεζι για να το view των ραφιων -->
//  <table #dt class="content-table">
//   <thead>
//     <tr>
//       <th>ID Προΐόντος</th>
//       <th>Περιγραφή Προΐόντος</th>
//       <th>Ποσότητα Προΐόντος</th>
//       <th>ID Ραφιού</th>
//       <th class="th-middle-for-form">Επεξεργασία</th>
//     </tr>
//   </thead>
//   <tbody>
//     <tr *ngFor="let pl of productList |  searchFilter:searchText">

//       <td>{{pl.id_product}}</td>
//       <td>{{pl.description_product}}</td>
//       <td>{{pl.quantity_product}}</td>
//       <td>{{pl.shelve_product_id.id_shelve}}</td>
//       <td>

//         <button pButton type="button" label="Επεξεργασία" icon="pi pi-bars" class='viewButton-edit'
//           (click)="editproduct(pl)"></button>
//         <button pButton type="button" label="Διαγραφή" icon="pi pi-times-circle" class='viewButton-delete'
//           (click)="deleteproduct(pl)"></button>
//       </td>
//     </tr>
//   </tbody>
// </table> 


// <button type="button" (click)="showWarehouse()" pButton icon="pi pi-info-circle" label="Αποθήκες"></button>
// <button type="button" (click)="showShelve()" pButton icon="pi pi-info-circle" label="Ράφια"></button> 
// <button type="button" (click)="showProduct()" pButton icon="pi pi-info-circle" label="Προΐόντα"></button> 

