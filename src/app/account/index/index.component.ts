import { Component, OnInit } from '@angular/core';
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'app-account-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  accounts: Account[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.isLoading = true;
    this.accountService.getAll().subscribe({
      next: (data) => {
        this.accounts = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  deleteAccount(id: number): void {
    if (confirm('Are you sure you want to delete this account?')) {
      this.accountService.delete(id).subscribe({
        next: () => {
          this.accounts = this.accounts.filter(acc => acc.id !== id);
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    }
  }
}
