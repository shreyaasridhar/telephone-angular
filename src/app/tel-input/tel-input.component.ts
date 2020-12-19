import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import * as intlTelInput from 'intl-tel-input';
import { CountryData, IntlTelInputOptions } from '../tel-input-options-model';
import { ControlContainer, NgForm } from '@angular/forms';

@Component({
  selector: 'app-tel-input',
  templateUrl: './tel-input.component.html',
  styleUrls: ['./tel-input.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }]
})
export class TelInputComponent implements AfterViewInit {

  @Input() public cssClass!: string;
  @Input() public E164PhoneNumber!: string | null;
  @Input() public label!: string;
  @Input() public labelCssClass!: string;
  @Input() public name = 'intl-tel-input-name';
  @Input() public onlyLocalized!: boolean;
  @Input() public options: IntlTelInputOptions = {};
  @Input() public required!: boolean;
  @Output() private E164PhoneNumberChange = new EventEmitter<string | null>();
  @ViewChild('intlTelInput') private _inputElement!: ElementRef;
  private _phoneNumber!: string;
  private _intlTelInput: any;

  private static modifyCountryData(): void {
      (window as any).intlTelInputGlobals.getCountryData().forEach((country: CountryData) =>
          country.name = country.name.replace(/.+\((.+)\)/, '$1'));
  }

  public ngAfterViewInit(): void {
      if (this.onlyLocalized) {
          TelInputComponent.modifyCountryData();
      }

      const intlTelInputInstance = intlTelInput;
      this._intlTelInput = intlTelInputInstance(this._inputElement.nativeElement, this.options);
  }

  get intlTelInput(): any {
      return this._intlTelInput;
  }

  get phoneNumber(): string {
      return this._phoneNumber;
  }

  set phoneNumber(value: string) {
      if (!!value) {
          this._intlTelInput.setNumber(value);
      }
      this._phoneNumber = value;
      this.i18nizePhoneNumber();
  }

  public i18nizePhoneNumber(): void {
      this.E164PhoneNumber = null;
      if (this._intlTelInput.isValidNumber()) {
          this.E164PhoneNumber = this._intlTelInput.getNumber();
      }
      this.E164PhoneNumberChange.emit(this.E164PhoneNumber);
  }

}
