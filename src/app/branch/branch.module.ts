import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BranchRoutingModule } from './branch-routing.module';
import { IndexComponent } from './index/index.component';
import { BranchService } from './branch.service';

@NgModule({
  declarations: [
    IndexComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BranchRoutingModule
  ],
  providers: [BranchService]
})
export class BranchModule { }
