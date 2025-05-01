import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { StudentService } from '../../../../core/services/student.service';
import { StudentModel } from '../../../../shared/models/student.model';
import { CreateStudentModel } from '../../../../shared/models/create-student.model';
import { ApiResponseModel } from '../../../../shared/models/api-response.model';

@Component({
  selector: 'app-student-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatSnackBarModule,
  ],
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private studentService = inject(StudentService);
  private snackBar = inject(MatSnackBar);

  form!: FormGroup;
  studentId?: number;
  editMode = false;

  ngOnInit(): void {
    this.form = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      anneeBac: ['', [Validators.required, Validators.pattern(/^[0-9]{4}$/)]]
    });

    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editMode = true;
        this.studentId = +params['id'];

        // ✅ Charger les données de l'étudiant existant
        this.studentService.getById(this.studentId).subscribe({
          next: (student: StudentModel) => {
            console.log("✅ Étudiant reçu : ", student);

            // Remplissage sécurisé : si vide, on met une valeur par défaut
            this.form.patchValue({
              nom: student.nom || '',
              prenom: student.prenom || '',
              anneeBac: student.anneeBac || new Date().getFullYear()
            });
          },
          error: (err) => {
            console.error('Erreur lors du chargement :', err);
            this.snackBar.open('⚠️ Accès refusé ou étudiant inexistant', 'Fermer', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center'
            });
            this.router.navigate(['/admin/students']);
          }
        });
      }
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const data: CreateStudentModel = {
      nom: this.form.value.nom,
      prenom: this.form.value.prenom,
      anneeBac: Number(this.form.value.anneeBac)
    };

    if (this.editMode) {
      this.studentService.update(this.studentId!, data).subscribe({
        next: (res: ApiResponseModel) => {
          this.snackBar.open(res.message|| 'Étudiant modifié avec succès !', 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.router.navigate(['/admin/students']);
        },
        error: () => {
          this.snackBar.open('Erreur lors de la modification', 'Fermer', {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      });
    } else {
      this.studentService.create(data).subscribe({
        next: (res: ApiResponseModel) => {
          this.snackBar.open(res.message, 'Fermer', {
            duration: 3000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
          this.router.navigate(['/admin/students']);
        },
        error: () => {
          this.snackBar.open('Erreur lors de la création', 'Fermer', {
            duration: 4000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
          });
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/admin/students']);
  }
}
