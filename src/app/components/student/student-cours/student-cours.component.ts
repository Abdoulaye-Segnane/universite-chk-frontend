import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CoursService } from '../../../core/services/cours.service';
import { CoursModel } from '../../../shared/models/cours.model';

@Component({
  selector: 'app-student-cours',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule],
  templateUrl: './student-cours.component.html',
  styleUrls: ['./student-cours.component.css']
})
export class StudentCoursComponent implements OnInit {
  private courseService = inject(CoursService);

  courses: CoursModel[] = [];
  displayedColumns: string[] = ['titre', 'formateur', 'date', 'actions'];

  ngOnInit(): void {
    this.courseService.getAll().subscribe({
      next: (data) => this.courses = data,
      error: () => console.error('Erreur chargement cours')
    });
  }

  consulterCours(c: CoursModel) {
    alert(`Cours : ${c.titre}\nDescription: ${c.description}`);
  }
}
