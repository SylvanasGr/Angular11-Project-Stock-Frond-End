# Changelog

## 11.0.0
**Αρχική αναβάθμιση του project**
1) Top level αρχεία: Βλεπουμε από το ιστορικό του Git ποια αρχεία έχουν τροποποηθεί. Κάποια έχουν αλλάξει όνομα. Μεταφέρουμε τις αλλαγές στα αρχεία του project μας προσέχοντας παράλληλα να κρατήσουμε τυχόν αλλαγές του εκάστοτε project.
2) Περιεχόμενα φακέλου src/assets: Οι φάκελοι pages, sass και theme πρέπει να περιέχουν αποκλειστικά αρχεία του theme, επομένως τους διαγράφουμε και φέρνουμε στη θέση τους τις νέες εκδοχές τους. Το ίδιο ισχύει για τους φακέλους layout/css και layout/images/configurator.
3) Αλλαγές στο styles.css: Με την αναβάθμιση έγιναν πολλές τροποποιήσεις, οι οποίες πρέπει να μεταφερθούν. Το κάθε project μπορεί να έχει επιπλέον css rules που να χρειάζονται τροποποίηση.
4) Αλλαγές στα app.component.html, app.component.ts και στα περιεχόμενα των φακέλων toitsu-layout και toitsu-shared: Από το Git φαίνονται οι αλλαγές σ' όλα αυτά. Πάλι, αν ένα project έχει διαφοροποίηση σε κάτι από αυτά, θα πρέπει να ληφθεί υπόψη κατά τη μεταφορά των αλλαγών.
5) Αφού τελειώσουν όλα τα παραπάνω, τρέχουμε npm install για να κατεβούν τα νέα dependencies.   


**Απαιτούμενες αλλαγές σε επιμέρους ενότητες κι αρχεία**

1) Στα αρχεία .ts κάποια classes του primeng έχουν αλλάξει πακέτο. Από το Git φαίνονται κάποιες από αυτές τις αλλαγές. 
2) Αλλαγές σε css: Οι σημαντικότερες αλλαγές που πρέπει να γίνουν στα αρχεία .html αναφέρονται παρακάτω: 
    - ui-button-τάδε > p-button-τάδε
    - ui-g > p-grid
    - ui-fluid > p-fluid
    - ui-g-τάδε > p-col-τάδε
    - ui-xl-τάδε > p-xl-τάδε
    - ui-md-τάδε > p-sm-τάδε
    - Γενικά όπου έχει κλάση .ui-κάτι, ψάχνουμε την αντίστοιχη .p-κάτι
    - Αλλαγή στο σημείο με τα δύο calendars σε μια γραμμή (βλέπε αλλαγές στο Git, property-list.component.html)
    - Αλλαγή στα inputgroup (βλέπε αλλαγές στο Git, select-property.component.html)
3) Πριν την ανανέωση του activeIndex ενός p-accordion χρειάζεται η γραμμή this.changeDetectorRef.detectChanges(); για να μη σκάει expression changed error. (βλέπε αλλαγές στο Git, property-view.component.ts)
4) Στο dropdown πλέον υπάρχουν τα optionValue και optionLabel και μπορεί έτσι να αλλάξει η υλοποίηση με τα SelectItem και .pipe() στο service. (βλέπε αλλαγές στο Git, property-view.component.html)
5) Όποιος θέλει μπορεί να βάλει το pRipple directive στα buttons για το ripple effect.
