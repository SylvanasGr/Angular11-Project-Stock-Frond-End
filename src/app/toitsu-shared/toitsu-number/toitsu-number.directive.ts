import {Directive, HostListener, Input, OnInit} from '@angular/core';
import {NgControl} from '@angular/forms';

@Directive({
  selector: '[appToitsuNumber]'
})
export class ToitsuNumberDirective implements OnInit {
  
  @Input() isFloat: boolean = false;
  @Input() decimals: number = 2;
  @Input() hideThousands: boolean = false;
  
  initializing = false;
  
  constructor(private model: NgControl) {
  }
  
  ngOnInit() {
    this.initializing = true;
    
    let value = null;
    if (this.model.hasOwnProperty('model')) {
      // ngModel
      value = this.model['model'];
    }
    else {
      // formControlName
      value = this.model.value;
    }
    
    if (this.isFloat) {
      this.floatInputValue(value);
    }
    else {
      this.integerInputValue(value);
    }
    
    setTimeout(() => {
      this.onBlur();
    });
    this.initializing = false;
  }
  
  @HostListener('input') onInput() {
    if (this.isFloat) {
      this.floatInputValue(this.model.value);
    }
    else {
      this.integerInputValue(this.model.value);
    }
  }
  
  @HostListener('focus') onFocus() {
    if (this.model.value) {
      let viewValue = String(this.model.value).replace('.', ',');
      this.model.valueAccessor.writeValue(viewValue); // αυτό που φαίνεται
    }
  }
  
  @HostListener('blur') onBlur() {
    if (this.model.value) {
      let renderedValue = String(this.model.value).replace('.', ',');
      if (!this.hideThousands) {
        renderedValue = this.addThousandsDots(renderedValue);
      }
      if (this.isFloat) {
        renderedValue = this.appendTrailingDecimalZeroes(renderedValue, this.decimals);
      }
      this.model.valueAccessor.writeValue(renderedValue); // αυτό που φαίνεται
    }
  }
  
  @HostListener('ngModelChange', ['$event']) onNgModelChange(value) {
    // Υλοποίηση για προγραμματιστική αλλαγή της τιμής
    if (this.initializing) {
      // Στην αρχικοποίηση
      // Τίποτα
    }
    else {
      // Έλεγχος ποιο είναι το ενεργό element στο DOM
      // Πρέπει να είναι κάποιο που ΔΕΝ έχει ως attribute το apptoitsunumber
      let activeElement = document.activeElement;
      if (activeElement.attributes['apptoitsunumber']) {
        // Στην αλλαγή τιμής μέσα από το input (ή άλλο input με το apptoitsunumber)
        // Τίποτα
      }
      else {
        // Σε άλλη εξωτερική αλλαγή
        if (value || value === 0) {
          // Κλήση των απαραίτητων μεθόδων για format και προβολή της τιμής
          this.onInput();
          this.onBlur();
        }
      }
    }
  }
  
  /**
   * Εμφάνιση ακέραιου αριθμού.
   * Οι μη επιτρεπτοί χαρακτήρες αφαιρούνται αυτόματα.
   */
  integerInputValue(val) {
    if (val || val === 0) {
      let digits = String(val).replace(/[^0-9]/g, '');
      
      // Κρατάμε το αρνητικό πρόσημο, αν υπάρχει
      if (String(val).indexOf('-') === 0) {
        digits = '-' + digits;
      }
      
      let modelValue = parseInt(digits, 10);
      
      if (Number.isNaN(modelValue)) {
        // Ροή για σκέτο αρνητικό πρόσημο
        this.model.control.setValue(0); // αυτό που είναι
        this.model.valueAccessor.writeValue('-'); // αυτό που φαίνεται
      }
      else {
        // Κανονική ροή
        if (modelValue !== this.model.value) {
          this.model.control.setValue(modelValue); // αυτό που είναι
        }
        
        if (digits !== val) {
          this.model.valueAccessor.writeValue(digits); // αυτό που φαίνεται
        }
      }
    }
    else {
      this.model.control.setValue(val); // αυτό που είναι
    }
  }
  
  /**
   * Εμφάνιση δεκαδικού αριθμού.
   * Οι μη επιτρεπτοί χαρακτήρες αφαιρούνται αυτόματα.
   * Αν ο χρήστης πληκτρολογήσει την τελεία, αυτή μετατρέπεται σε κόμμα.
   * Επίσης κόβονται τα επιπλέον δεκαδικά ψηφία.
   */
  floatInputValue(val) {
    if (val || val === 0) {
      let digits = String(val).replace(/[^0-9.,]/g, '');
      
      // Κρατάμε το αρνητικό πρόσημο, αν υπάρχει
      if (String(val).indexOf('-') === 0) {
        digits = '-' + digits;
      }
      
      digits = digits.replace(/,/g, '.');
      
      if (digits.split('.').length > 2) {
        digits = digits.substring(0, digits.lastIndexOf('.'));
      }
      digits = this.trimExtraDecimalDigits(digits, this.decimals);
      
      let viewValue = digits.replace('.', ',');
      let modelValue = parseFloat(digits);
      
      if (Number.isNaN(modelValue)) {
        // Ροή για σκέτο αρνητικό πρόσημο
        this.model.control.setValue(0); // αυτό που είναι
        this.model.valueAccessor.writeValue('-'); // αυτό που φαίνεται
      }
      else {
        // Κανονική ροή
        if (modelValue !== this.model.value) {
          this.model.control.setValue(modelValue); // αυτό που είναι
        }
        this.model.valueAccessor.writeValue(viewValue); // αυτό που φαίνεται
      }
    }
    else {
      this.model.control.setValue(val); // αυτό που είναι
    }
  }
  
  /**
   * Προσθήκη τελειών χιλιάδων στο δεδομένο αριθμητικό string.
   */
  addThousandsDots(numberString) {
    
    let splitArray = numberString.split(',');
    let integerPart = splitArray[0];
    let integerPartWithDots = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
    if (splitArray.length === 1) {
      return integerPartWithDots;
    } else if (splitArray.length === 2) {
      return integerPartWithDots + ',' + splitArray[1];
    } else {
      return numberString;
    }
  }
  
  /**
   * Προσθήκη επιπλέον μηδενικών (αν απαιτείται) στο τέλος του δεδομένου αριθμητικού string.
   */
  appendTrailingDecimalZeroes(numberString, decimals) {
    
    let myDecimals = decimals ? decimals : 2;
    
    let splitArray = numberString.split(',');
    let integerPart = splitArray[0];
    
    if (splitArray.length === 1 || splitArray.length === 2) {
      let decimalPart = (splitArray.length === 1) ? '' : splitArray[1];
      
      let extraZeroes = myDecimals - decimalPart.length;
      for (let i = 0; i < extraZeroes; i++) {
        decimalPart += '0';
      }
      
      return integerPart + ',' + decimalPart;
    } else {
      return numberString;
    }
  }
  
  /**
   * Αφαίρεση των τελευταίων δεκαδικών ψηφίων από το δεδομένο αριθμητικό string,
   * ώστε να υπάρχουν το πολύ decimals δεκαδικά.
   * Αν δεν έχει δοθεί το decimals, κρατάμε έως 2 δεκαδικά.
   */
  trimExtraDecimalDigits(numberString, decimals) {
    let myDecimals = decimals ? decimals : 2;
    
    let splitArray = numberString.split('.');
    let integerPart = splitArray[0];
    
    if (splitArray.length === 1) {
      return integerPart;
    } else if (splitArray.length === 2) {
      return integerPart + '.' + splitArray[1].substring(0, myDecimals);
    } else {
      return numberString;
    }
  }
}
