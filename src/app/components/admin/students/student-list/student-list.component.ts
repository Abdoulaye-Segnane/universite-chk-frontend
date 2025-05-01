import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { StudentService } from '../../../../core/services/student.service';
import { StudentModel } from '../../../../shared/models/student.model';

const SNACKBAR_DURATION = 4000;

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatSnackBarModule
  ],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  private studentService = inject(StudentService);
  private router = inject(Router);
  private snackBar = inject(MatSnackBar);

  students: StudentModel[] = [];
  displayedColumns: string[] = ['username', 'ine', 'email', 'motDePasseInitial', 'actions'];

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getAll().subscribe({
      next: (data) => this.students = data,
      error: () => {
        this.snackBar.open('Erreur lors du chargement des étudiants', 'Fermer', {
          duration: SNACKBAR_DURATION,
          verticalPosition: 'top'
        });
      }
    });
  }

  addStudent(): void {
    this.router.navigate(['/admin/students/new']);
  }

  editStudent(id: number): void {
    this.router.navigate(['/admin/students/edit', id]);
  }

  deleteStudent(id: number): void {
    const snack = this.snackBar.open('Voulez-vous supprimer cet étudiant ?', 'Oui, Supprimer', {
      duration: SNACKBAR_DURATION + 1000,
      verticalPosition: 'top'
    });

    snack.onAction().subscribe(() => {
      this.studentService.delete(id).subscribe({
        next: () => {
          this.snackBar.open('Étudiant supprimé avec succès !', 'Fermer', {
            duration: SNACKBAR_DURATION - 1000,
            verticalPosition: 'top'
          });
          this.loadStudents();
        },
        error: () => {
          this.snackBar.open('Erreur de suppression', 'Fermer', {
            duration: SNACKBAR_DURATION,
            verticalPosition: 'top'
          });
        }
      });
    });
  }
}
