import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormComponent } from './form.component';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should enable the number field when noNumber is false', () => {
    component.form.get('noNumber')?.setValue(false);
    expect(component.form.get('number')?.enabled).toBeTrue();
  });

  it('Should disable the number field when noNumber is true', () => {
    component.form.get('noNumber')?.setValue(true);
    expect(component.form.get('number')?.disabled).toBeTrue();
  });

  it('should invalidate postalCode when it is null', () => {
    let postalCode = component.form.controls['postalCode'];
    postalCode.setValue(null);
    expect(postalCode.valid).toBeFalse();
  });

  it('should validate postalCode when it is not null and only number', () => {
    let postalCode = component.form.controls['postalCode'];
    postalCode.setValue('05416264');
    expect(postalCode.valid).toBeTrue();
  });

  it('should call preventDefault when non-numeric key presses', () => {
    const event = new KeyboardEvent('keypress', { key: 'a' });
    spyOn(event, 'preventDefault');
    component.limitingInputOnlyNumber(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('should not call preventDefault when numeric key presses', () => {
    const event = new KeyboardEvent('keypress', { key: '5' });
    component.limitingInputOnlyNumber(event);
    spyOn(event, 'preventDefault');
    expect(event.preventDefault).not.toHaveBeenCalled();
  });

  it('should not call preventDefault when allowed keys are pressed', () => {
    let event = new KeyboardEvent('keypress', { key: 'Backspace' });
    spyOn(event, 'preventDefault');
    component.limitingInputOnlyNumber(event);
    expect(event.preventDefault)
      .withContext(`Key press ${event.key}`)
      .not.toHaveBeenCalled();

    event = new KeyboardEvent('keypress', { key: 'a', ctrlKey: true });
    spyOn(event, 'preventDefault');
    component.limitingInputOnlyNumber(event);
    expect(event.preventDefault)
      .withContext(`Key press ${event.key}`)
      .not.toHaveBeenCalled();

    event = new KeyboardEvent('keypress', { key: 'a', metaKey: true });
    spyOn(event, 'preventDefault');
    component.limitingInputOnlyNumber(event);
    expect(event.preventDefault)
      .withContext(`Key press ${event.key}`)
      .not.toHaveBeenCalled();
  });
});
