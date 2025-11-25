import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanRoutingModule } from './loan-routing.module';
import { IndexComponent } from './index/index.component';
import { LoanService } from './loan.service';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    LoanRoutingModule
  ],
  providers: [LoanService]
})
export class LoanModule { }
