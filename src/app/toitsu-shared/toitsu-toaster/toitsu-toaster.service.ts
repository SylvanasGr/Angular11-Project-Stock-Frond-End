import {Injectable} from '@angular/core';
import {MessageService} from 'primeng/api';
import {TranslateService} from '@ngx-translate/core';

@Injectable({providedIn: 'root'})
export class ToitsuToasterService {
  
  constructor(private messageService: MessageService, private translate: TranslateService) {}
  
  clearMessages() {
    this.messageService.clear();
  }
  
  showSuccessStay(message?) {
    if (!message) {
      message = this.translate.instant('global.save.success');
    }
    this.clearMessages();
    this.messageService.add({severity: 'success', summary: '', detail: message, life: 1000});
  }
  showSuccessLogin(message?) {
    if (!message) {
      message = this.translate.instant('Όλα τα δεδομένα φορτώθηκαν με επιτυχία');
    }
    this.clearMessages();
    this.messageService.add({severity: 'success', summary: '', detail: message, life: 1000});
  }
  showSuccessStaydelete(message?) {
    if (!message) {
      message = this.translate.instant('Η διαγραφή έγινε με επιτυχία!');
    }
    this.clearMessages();
    this.messageService.add({severity: 'success', summary: '', detail: message, life: 1000});
  }

  showErrorUpdate(message?) {
    if (!message) {
      message = this.translate.instant('Υπάρχει σφάλμα,προσπαθήστε ξανά ή πατήστε το κούμπι ΠΛΗΡΟΦΟΡΙΕΣ');
    }
    this.clearMessages();
    this.messageService.add({severity: 'error', summary: '', detail: message, life: 1000});
  }
  showError(message?) {
    if (!message) {
      message = this.translate.instant('Υπάρχει σφάλμα,επικοινωνήστε με την αρμόδια ομάδα.');
    }
    this.clearMessages();
    this.messageService.add({severity: 'error', summary: '', detail: message, life: 1000});
  }
  showErrorDelete(message?) {
    if (!message) {
      message = this.translate.instant('Yπάρχουν εγγραφές στο συγκεκριμένο ID');
    }
    this.clearMessages();
    this.messageService.add({severity: 'error', summary: '', detail: message, life: 1000});
  }
  
  showErrorStay(message) {
    this.clearMessages();
    this.messageService.add({severity: 'error', summary: '', detail: message, life: 1000});
  }
  
  showInfoStay(message) {
    this.clearMessages();
    this.messageService.add({severity: 'info', summary: '', detail: message, life: 1000});
  }
  
  apiValidationErrors(response) {
    if (response && response.status === 422 && response.error && response.error.errors && response.error.errors.length > 0) {
      let fullError = '';
      for (const error of response.error.errors) {
        fullError += error + '<br/>';
      }
      this.messageService.add({severity: 'error', summary: '', detail: fullError, life: 1000});
    }
  }
}
