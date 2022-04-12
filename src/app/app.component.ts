import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'reactive-form-dynamic';
  formGroup: FormGroup;

  get isAdult() {

    return this.formGroup.get("personIsAdult")?.value;
  }


  constructor(private readonly formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      personName: new FormControl('', [Validators.required]),
      personDL: new FormControl('', []),
      personStudentId: new FormControl('', [Validators.required]),
      personIsAdult: new FormControl('', [Validators.required]),
    });

    this.formGroup.get('personIsAdult')?.valueChanges.subscribe((x) => {

      if (x === 'adult') {
        this.formGroup.controls['personStudentId']?.clearValidators();
        this.formGroup.controls['personStudentId']?.patchValue('');
        this.formGroup.controls['personStudentId']?.setValidators([]);

        this.formGroup.controls['personDL']?.clearValidators();
        this.formGroup.controls['personDL']?.setValidators([Validators.required, Validators.minLength(4)]);
        this.formGroup.controls['personDL']?.updateValueAndValidity();

        const personDL = this.formGroup.get('personDL');

      } else {
        this.formGroup.controls['personDL']?.clearValidators();
        this.formGroup.controls['personDL']?.patchValue(null);
        this.formGroup.controls['personDL']?.setValidators([]);
        this.formGroup.controls['personDL']?.updateValueAndValidity();

        this.formGroup.controls['personStudentId']?.clearValidators();
        this.formGroup.controls['personStudentId']?.setValidators([Validators.required]);
        this.formGroup.controls['personStudentId']?.updateValueAndValidity();

      }
    });

    this.formGroup.get('personName')?.valueChanges.subscribe((_) => {

      this.formGroup.updateValueAndValidity();
    });
  }

  submit(form: FormGroup) {
    console.log(form);
  }

  show(form: FormGroup) {
    return JSON.stringify(form, null, 5);
  }

  updateForm() {
    console.log(this.formGroup);
    this.formGroup.updateValueAndValidity();
  }
}
