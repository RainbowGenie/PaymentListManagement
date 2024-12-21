import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Payment } from '../models/payment';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-payment-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
  ],
  templateUrl: './payment-modal.component.html',
  styleUrls: ['./payment-modal.component.css'],
})
export class PaymentModalComponent {
  fields: { key: keyof Payment; label: string }[];
  localData: Partial<Payment>;
  statusOptions: { value: string; label: string }[] = [
    { value: 'pending', label: 'Pending' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' },
  ];
  constructor(
    public dialogRef: MatDialogRef<PaymentModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Payment
  ) {
    this.localData = { ...data };
    this.fields = Object.keys(data)
      .filter((key) => key !== '_id')
      .map((key) => ({
        key: key as keyof Payment,
        label: this.formatLabel(key),
      }));

    if (this.localData.payee_added_date_utc) {
      this.localData.payee_added_date_utc = new Date(
        this.localData.payee_added_date_utc * 1000
      ) as any;
    }
    if (this.localData.payee_due_date) {
      this.localData.payee_due_date = new Date(
        this.localData.payee_due_date
      ) as any;
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
  formatLabel(key: string): string {
    return key
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .replace('Payee ', '');
  }

  onDateChange(field: keyof Payment): void {}
}
