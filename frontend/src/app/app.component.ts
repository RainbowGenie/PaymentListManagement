import { Component } from '@angular/core';
import { PaymentTableComponent } from './payment-table/payment-table.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PaymentTableComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Payments App';
}
