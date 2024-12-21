import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { Payment } from '../models/payment';
import { MatTableModule } from '@angular/material/table'; // Import MatTableModule
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-table',
  standalone: true,
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.css'],
  imports: [MatTableModule, CommonModule],
})
export class PaymentTableComponent implements OnInit {
  payments: Payment[] = [];
  displayedColumns: string[] = [
    'payee_name',
    'payee_payment_status',
    'payee_due_date',
    'payee_address',
    'payee_phone_number',
    'payee_email',
    'payee_currency',
    'payee_due_amount',
    'actions',
  ];

  constructor(
    private paymentService: PaymentService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.paymentService.getPayments().subscribe((data: any) => {
      this.payments = data;
    });
  }

  openEditModal(payment: any): void {
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      width: '500px',
      data: payment,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.paymentService.updatePayment(result._id, result).subscribe(() => {
          Object.assign(payment, result);
        });
      }
    });
  }

  deletePayment(paymentId: string): void {
    this.paymentService.deletePayment(paymentId).subscribe(() => {
      this.ngOnInit();
    });
  }
}
