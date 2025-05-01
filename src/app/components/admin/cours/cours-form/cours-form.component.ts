// components/admin/cours/cours-form/cours-form.component.ts
import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { CoursService } from '../../../../core/services/cours.service';
import { CoursModel } from '../../../../shared/models/cours.model';
import { ApiResponseModel } from '../../../../shared/models/api-response.model';

@Component({
  selector: 'app-cours-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './cours-form.component.html',
  styleUrls: ['./cours-form.component.css']
})
export class CoursFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private coursService = inject(CoursService);
  private snackBar = inject(MatSnackBar);

  coursForm!: FormGroup;
  coursId?: number;
  editMode = false;

  ngOnInit(): void {
    this.coursForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      formateur: ['', Validators.required],
      date: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.coursId = +params['id'];
        this.editMode = true;

        this.coursService.getById(this.coursId).subscribe({
          next: cours => {
            const date = new Date(cours.date).toISOString().substring(0, 10);
            this.coursForm.patchValue({ ...cours, date });
          },
          error: err => {
            console.error('Erreur lors du chargement du cours :', err);
            this.snackBar.open('⚠️ Accès refusé : cours non accessible.', 'Fermer', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
            this.router.navigate(['/admin/cours']);
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.coursForm.invalid) return;

    const cours: CoursModel = this.coursForm.value;

    const request$ = this.editMode
      ? this.coursService.update(this.coursId!, cours)
      : this.coursService.create(cours);

    request$.subscribe({
      next: (res: ApiResponseModel) => {
        this.snackBar.open(res.message, 'Fermer', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
        this.router.navigate(['/admin/cours']);
      },
      error: () => {
        const action = this.editMode ? 'modification' : 'création';
        this.snackBar.open(`Erreur lors de la ${action} du cours`, 'Fermer', {
          duration: 4000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
        });
      }
    });
  }
}
