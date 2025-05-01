import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { StudentService } from '../../../core/services/student.service';
import { CoursService } from '../../../core/services/cours.service';
import { AuthService } from '../../../core/services/auth.service';
import { StudentModel } from '../../../shared/models/student.model';
import { CoursModel } from '../../../shared/models/cours.model';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class StudentDashboardComponent implements OnInit {
  private studentService = inject(StudentService);
  private courseService = inject(CoursService);
  private authService = inject(AuthService);

  student?: StudentModel;
  totalCourses = 0;
  recentCourses: CoursModel[] = [];

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.loadStudent(user);  // ✅ On charge par ID maintenant
      this.loadCourses();
    }
  }

  private loadStudent(user: { username: string; role: string; id?: number }) {
    const studentId = user.id || 0;  // 🔥 Ton token doit renvoyer ID maintenant sinon on force id=0

    this.studentService.getById(studentId).subscribe({
      next: (data: StudentModel) => this.student = data,
      error: () => console.error('Erreur chargement étudiant')
    });
  }

  private loadCourses() {
    this.courseService.getAll().subscribe({
      next: (data: CoursModel[]) => {
        this.totalCourses = data.length;
        this.recentCourses = data.slice(0, 2); // Juste les 2 premiers
      },
      error: () => console.error('Erreur chargement cours')
    });
  }
}
