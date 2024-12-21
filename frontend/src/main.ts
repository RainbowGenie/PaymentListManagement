import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { AppComponent } from './app/app.component';
import { PaymentService } from './app/payment.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';

bootstrapApplication(AppComponent, {
  providers: [
    PaymentService,
    importProvidersFrom(
      HttpClientModule,
      BrowserAnimationsModule,
      MatNativeDateModule
    ),
  ],
});
