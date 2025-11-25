import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../transaction.service';
import { Transaction } from '../transaction';

@Component({
  selector: 'app-transaction-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  transactions: Transaction[] = [];
  isLoading = true;
  errorMessage = '';
  selectedAccountId: number | null = null;

  constructor(private transactionService: TransactionService) { }

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.isLoading = true;
    this.transactionService.getAll().subscribe({
      next: (data) => {
        this.transactions = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  filterByAccount(accountId: number): void {
    this.isLoading = true;
    this.selectedAccountId = accountId;
    this.transactionService.getByAccountId(accountId).subscribe({
      next: (data) => {
        this.transactions = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  clearFilter(): void {
    this.selectedAccountId = null;
    this.loadTransactions();
  }
}
