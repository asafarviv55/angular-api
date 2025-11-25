import { Component, OnInit } from '@angular/core';
import { CreditCardService } from '../credit-card.service';
import { CreditCard } from '../credit-card';

@Component({
  selector: 'app-credit-card-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  creditCards: CreditCard[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private creditCardService: CreditCardService) { }

  ngOnInit(): void {
    this.loadCards();
  }

  loadCards(): void {
    this.isLoading = true;
    this.creditCardService.getAll().subscribe({
      next: (data) => {
        this.creditCards = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  blockCard(id: number): void {
    if (confirm('Are you sure you want to block this card?')) {
      this.creditCardService.blockCard(id).subscribe({
        next: () => {
          this.loadCards();
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    }
  }

  activateCard(id: number): void {
    this.creditCardService.activateCard(id).subscribe({
      next: () => {
        this.loadCards();
      },
      error: (error) => {
        this.errorMessage = error.message;
      }
    });
  }

  maskCardNumber(cardNumber: string): string {
    return '**** **** **** ' + cardNumber.slice(-4);
  }
}
