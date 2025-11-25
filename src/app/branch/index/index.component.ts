import { Component, OnInit } from '@angular/core';
import { BranchService } from '../branch.service';
import { Branch } from '../branch';

@Component({
  selector: 'app-branch-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  branches: Branch[] = [];
  isLoading = true;
  errorMessage = '';
  searchCity = '';
  searchState = '';

  constructor(private branchService: BranchService) { }

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.isLoading = true;
    this.branchService.getAll().subscribe({
      next: (data) => {
        this.branches = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  searchBranches(): void {
    this.isLoading = true;
    this.branchService.searchBranches({
      city: this.searchCity,
      state: this.searchState
    }).subscribe({
      next: (data) => {
        this.branches = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = error.message;
        this.isLoading = false;
      }
    });
  }

  findNearby(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.isLoading = true;
          this.branchService.getNearby(
            position.coords.latitude,
            position.coords.longitude
          ).subscribe({
            next: (data) => {
              this.branches = data;
              this.isLoading = false;
            },
            error: (error) => {
              this.errorMessage = error.message;
              this.isLoading = false;
            }
          });
        },
        (error) => {
          this.errorMessage = 'Unable to get your location';
        }
      );
    } else {
      this.errorMessage = 'Geolocation is not supported by this browser';
    }
  }

  clearSearch(): void {
    this.searchCity = '';
    this.searchState = '';
    this.loadBranches();
  }
}
