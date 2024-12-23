import { Component, OnInit, ViewChild } from '@angular/core';
import { PaymentService } from '../payment.service';
import { MatDialog } from '@angular/material/dialog';
import { PaymentModalComponent } from '../payment-modal/payment-modal.component';
import { Payment } from '../models/payment';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from 'app/confirm-dialog/confirm-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-table',
  standalone: true,
  templateUrl: './payment-table.component.html',
  styleUrls: ['./payment-table.component.css'],
  imports: [
    MatTableModule,
    CommonModule,
    MatButtonModule,
    MatPaginator,
    MatPaginatorModule,
    MatIconModule,
  ],
})
export class PaymentTableComponent implements OnInit {
  displayedColumns: string[] = [
    'payee_name',
    'payee_payment_status',
    'payee_added_date_utc',
    'payee_due_date',
    'payee_due_amount',
    'payee_currency',
    'actions',
  ];
  dataSource = new MatTableDataSource<Payment>();
  totalPayments = 0;
  pageSize = 10;
  currentPage = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private paymentService: PaymentService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadPayments();
  }

  showNotification(message: string, action: string = 'Close'): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }

  loadPayments(): void {
    this.paymentService
      .getPayments(this.currentPage + 1, this.pageSize)
      .subscribe((response: any) => {
        this.dataSource.data = response.data;
        this.totalPayments = response.total;
      });
  }

  onPageChange(event: PageEvent): void {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPayments();
  }

  openEditModal(payment: any): void {
    const dialogRef = this.dialog.open(PaymentModalComponent, {
      width: '500px',
      data: payment,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        result.payee_added_date_utc = Math.floor(
          (result.payee_added_date_utc as any).getTime() / 1000
        ) as number;
        result.payee_due_date = this.formatDate(result.payee_due_date);
        this.paymentService.updatePayment(result._id, result).subscribe(() => {
          Object.assign(payment, result);
          this.showNotification('Payment updated successfully.');
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
          this.showNotification('Payment deleted successfully.');
          this.ngOnInit();
        });
      }
    });
  }

  formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  }
}
