import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CoursService } from '../../../../core/services/cours.service';
import { CoursModel } from '../../../../shared/models/cours.model';
import { ApiResponseModel } from '../../../../shared/models/api-response.model';

@Component({
  selector: 'app-cours-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './cours-list.component.html',
  styleUrls: ['./cours-list.component.css']
})
export class CoursListComponent implements OnInit {
  private coursService = inject(CoursService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  coursList: CoursModel[] = [];
  displayedColumns: string[] = ['titre', 'formateur', 'date', 'actions'];

  ngOnInit(): void {
    this.loadCours();
  }

  loadCours(): void {
    this.coursService.getAll().subscribe({
      next: (data) => this.coursList = data,
      error: () => {
        this.snackBar.open('Erreur de chargement des cours', 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }

  addCours(): void {
    this.router.navigate(['/admin/cours/new']);
  }

  editCours(id: number): void {
    this.router.navigate(['/admin/cours/edit', id]);
  }

  deleteCours(id: number): void {
    const snack = this.snackBar.open('Confirmer la suppression ?', 'Supprimer', {
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });

    snack.onAction().subscribe(() => {
      this.coursService.delete(id).subscribe({
        next: (res: ApiResponseModel) => {
          this.snackBar.open(res.message, 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.loadCours();
        },
        error: () => {
          this.snackBar.open('Erreur lors de la suppression', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      });
    });
  }
}
