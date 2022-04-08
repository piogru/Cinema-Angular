import { Directive } from '@angular/core';
import { NG_VALIDATORS, Validator, AbstractControl, FormGroup, FormControl } from '@angular/forms';

@Directive({
  selector: '[appFutureDateValidator]',
  providers: [{ provide: NG_VALIDATORS, useExisting:FutureDateValidatorDirective, multi: true }]
})
export class FutureDateValidatorDirective implements Validator {

  validate(control: AbstractControl): { [key: string]: any } | null {
    if (control && control instanceof FormControl) {
      // console.log(control.value);
      let currentDate = new Date().getTime();
      let formDate = new Date(control.value).getTime();

      let coeff = 1000 * 60 * 15;
      let roundedDate = new Date(Math.round(formDate / coeff) * coeff);
      roundedDate.setHours(roundedDate.getHours() - roundedDate.getTimezoneOffset() / 60);

      // console.log(currentDate, roundedDate.getTime(), currentDate <= roundedDate.getTime())
      // console.log(roundedDate);
      if (currentDate <= roundedDate.getTime()) {
        return null;
      }
    }
    return { appFutureDateValidator: true };
  }
}
