import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from '../account.service';
import { AccountType } from '../account';

@Component({
  selector: 'app-account-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  accountForm!: FormGroup;
  accountTypes = Object.values(AccountType);
  submitted = false;
  errorMessage = '';

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.accountForm = this.formBuilder.group({
      userId: ['', [Validators.required, Validators.min(1)]],
      accountType: ['', Validators.required],
      initialDeposit: ['', [Validators.required, Validators.min(0)]],
      currency: ['USD', Validators.required]
    });
  }

  get f() {
    return this.accountForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.accountForm.invalid) {
      return;
    }

    this.accountService.create(this.accountForm.value).subscribe({
      next: () => {
        this.router.navigate(['/accounts']);
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.submitted = false;
      }
    });
  }
}
