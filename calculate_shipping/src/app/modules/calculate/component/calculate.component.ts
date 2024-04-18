import { Component } from '@angular/core';
import { FormComponent } from '../components/form/form.component';

@Component({
  selector: 'app-calculate',
  standalone: true,
  templateUrl: './calculate.component.html',
  styleUrl: './calculate.component.scss',
  imports: [FormComponent],
})
export class CalculateComponent {}
