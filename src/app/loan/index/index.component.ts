import { Component, OnInit } from '@angular/core';
import { LoanService } from '../loan.service';
import { Loan } from '../loan';

@Component({
  selector: 'app-loan-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  loans: Loan[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private loanService: LoanService) { }

  ngOnInit(): void {
    this.loadLoans();
  }

  loadLoans(): void {
    this.isLoading = true;
    this.loanService.getAll().subscribe({
      next: (data) => {
        this.loans = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  getStatusBadgeClass(status: string): string {
    const statusMap: { [key: string]: string } = {
      'PENDING': 'warning',
      'APPROVED': 'info',
      'ACTIVE': 'success',
      'REJECTED': 'danger',
      'PAID_OFF': 'secondary',
      'DEFAULTED': 'danger'
    };
    return `badge-${statusMap[status] || 'secondary'}`;
  }
}
