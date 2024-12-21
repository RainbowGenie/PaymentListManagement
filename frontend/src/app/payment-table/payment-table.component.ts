import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../payment.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { Payment } from '../models/payment';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from 'app/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-payment-table',
  standalone: true,
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.css'],
  imports: [MatTableModule, CommonModule, MatButtonModule],
})
export class PaymentTableComponent implements OnInit {
  payments: Payment[] = [];
  displayedColumns: string[] = [
    'payee_name',
    'payee_payment_status',
    'payee_added_date_utc',
    'payee_due_date',
    'payee_due_amount',
    'payee_currency',
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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.paymentService.deletePayment(paymentId).subscribe(() => {
          this.ngOnInit();
        });
      }
    });
  }
}
