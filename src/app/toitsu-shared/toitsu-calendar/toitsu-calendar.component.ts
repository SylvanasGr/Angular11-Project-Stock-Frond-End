import {Component, EventEmitter, Input, OnInit, Optional, Output, SkipSelf} from '@angular/core';
import {ControlContainer} from '@angular/forms';

@Component({
  selector: 'app-toitsu-calendar',
  templateUrl: './toitsu-calendar.component.html',
  viewProviders: [
    {
      provide: ControlContainer,
      useFactory: (container: ControlContainer) => container,
      deps: [[new Optional(), new SkipSelf(), ControlContainer]]
    }
  ]
})
export class ToitsuCalendarComponent implements OnInit {
  
  @Input() controlName: string;
  @Input() model: Date;
  @Output() modelChange = new EventEmitter<Date>();
  
  @Input() showTime = false;
  @Input() noIcon = false;
  @Input() inputId: string;
  @Input() disabled = false;
  
  localeEl: any;
  
  constructor() {}
  
  ngOnInit() {
    this.localeEl = {
      firstDayOfWeek: 1,
      dayNames: ['Κυριακή', 'Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο'],
      dayNamesShort: ['Κυρ', 'Δευ', 'Τρι', 'Τετ', 'Πεμ', 'Παρ', 'Σαβ'],
      dayNamesMin: ['Κυ', 'Δε', 'Τρ', 'Τε', 'Πε', 'Πα', 'Σα'],
      monthNames: ['Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος', 'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος',
        'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'],
      monthNamesShort: [ 'Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μάι', 'Ιουν', 'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ' ],
      today: 'Σήμερα',
      clear: 'Καθαρισμός',
      weekHeader: 'Εβδ.'
    };
  }
  
  emitModelChange() {
    this.modelChange.emit(this.model);
  }
}
