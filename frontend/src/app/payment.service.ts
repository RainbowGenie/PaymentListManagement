import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { Payment } from './models/payment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = environment.apiUrl; // Using the API URL from the environment file

  constructor(private http: HttpClient) {}

  getPayments(page: number = 1, size: number = 10): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}?page=${page}&size=${size}`);
  }

  updatePayment(id: string, payment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, payment);
  }

  deletePayment(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
