import { Component, NgModule, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterModule } from '@angular/router';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';

import { StudentService } from '../../../core/services/student.service';
import { CoursService } from '../../../core/services/cours.service';
import { StudentModel } from '../../../shared/models/student.model';
import { CoursModel } from '../../../shared/models/cours.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    RouterLink,
    MatTooltipModule,
    MatMenuModule,
    MatFormFieldModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentsCount = 0;
  coursCount = 0;
  
  latestStudents: StudentModel[] = [];
  latestCours: CoursModel[] = [];

  private studentService = inject(StudentService);
  private coursService = inject(CoursService);
  private router = inject(Router);

  ngOnInit(): void {
    this.studentService.getAll().subscribe((students: StudentModel[]) => {
      this.studentsCount = students.length;
      this.latestStudents = students.slice(-3).reverse();
    });
    

    this.coursService.getAll().subscribe((cours: CoursModel[]) => {
      this.coursCount = cours.length;
      this.latestCours = cours.slice(-3).reverse();
    });
    
  }
  
  
}
