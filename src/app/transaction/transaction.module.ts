import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionRoutingModule } from './transaction-routing.module';
import { IndexComponent } from './index/index.component';
import { TransactionService } from './transaction.service';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule
  ],
  providers: [TransactionService]
})
export class TransactionModule { }
