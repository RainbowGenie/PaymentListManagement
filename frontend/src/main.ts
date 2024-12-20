import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { PaymentService } from './app/payment.service';
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import BrowserAnimationsModule

bootstrapApplication(AppComponent, {
  providers: [
    PaymentService,
    importProvidersFrom(HttpClientModule, BrowserAnimationsModule), // Include BrowserAnimationsModule here
  ],
});
