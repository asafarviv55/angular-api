import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreditCardRoutingModule } from './credit-card-routing.module';
import { IndexComponent } from './index/index.component';
import { CreditCardService } from './credit-card.service';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    CreditCardRoutingModule
  ],
  providers: [CreditCardService]
})
export class CreditCardModule { }
