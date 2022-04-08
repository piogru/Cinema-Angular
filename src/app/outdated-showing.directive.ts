import { style } from '@angular/animations';
import { Directive, Input, ElementRef, AfterViewInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appOutdatedShowing]'
})
export class OutdatedShowingDirective {
  @Input() showingString: string = new Date().toUTCString();
  currentDate: Date = new Date();

  constructor(private element: ElementRef) { }

  ngAfterViewInit(): void {
    let showingDate = new Date(this.showingString);

    if(this.currentDate.getTime() > showingDate.getTime()){
      let doc = this.element.nativeElement;
      doc.style.color = 'grey';

      for (var i = 0; i < doc.childNodes.length; i++) {
        // console.log(doc.childNodes[i]);
        if (doc.childNodes[i].tagName == "MAT-CARD-ACTIONS") {
          // console.log(doc.childNodes[i]);
          doc.childNodes[i].style.display="none";
          break;
        }
    }
    }
  }
}
