import { StudentCoursComponent } from './components/student/student-cours/student-cours.component';
import { HomeComponent } from './components/user/home/home.component';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: 'user',
    loadComponent: () =>
      import('./layout/user-layout/user-layout/user-layout.component').then(m => m.UserLayoutComponent),
    children: [
      {
        path: 'login',
        title: 'Connexion',
        loadComponent: () =>
          import('./components/user/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () =>
          import('./components/user/forgotpassword/forgotpassword.component').then(m => m.ForgotpasswordComponent)
      },
      {
        path: 'home',
        loadComponent: () =>
          import('./components/user/home/home.component').then(m => m.HomeComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./components/user/register/register.component').then(m => m.RegisterComponent)
      },      
    ]
  },

  // Layout Étudiant
  {
    path: 'student',
    canActivate: [authGuard],
    data: { roles: ['STUDENT'] },
    loadComponent: () =>
      import('./layout/student-layout/student-layout/student-layout.component').then(m => m.StudentLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/student/dashboard/dashboard.component').then(m => m.StudentDashboardComponent)
      },
      {
        path: 'logout',
        loadComponent: () =>
          import('./shared/components/logout/logout.component').then(m => m.LogoutComponent)
      },
      {
        path: 'cours/list',
        loadComponent: () =>
          import('./components/student/student-cours/student-cours.component').then(m => m.StudentCoursComponent)
      }
    ]
  }
,

  // Layout Admin
  {
    path: 'admin',
    canActivate: [authGuard],
    data: { roles: ['ADMIN'] },
    loadComponent: () =>
      import('./layout/admin-layout/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'logout',
        loadComponent: () =>
          import('./shared/components/logout/logout.component').then(m => m.LogoutComponent)
      },
      {
        path: 'students',
        loadComponent: () =>
          import('./components/admin/students/student-list/student-list.component').then(m => m.StudentListComponent)
      },
      {
        path: 'students/new',
        loadComponent: () =>
          import('./components/admin/students/student-form/student-form.component').then(m => m.StudentFormComponent)
      },
      {
        path: 'cours/new',
        loadComponent: () =>
          import('./components/admin/cours/cours-form/cours-form.component').then(m => m.CoursFormComponent)
      },
      {
        path: 'cours',
        loadComponent: () =>
          import('./components/admin/cours/cours-list/cours-list.component').then(m => m.CoursListComponent)
      },
      {
        path: 'students/edit/:id',
        loadComponent: () =>
          import('./components/admin/students/student-form/student-form.component').then(m => m.StudentFormComponent)  
      },
      {
        path: 'cours/edit/:id',
        loadComponent: () =>
          import('./components/admin/cours/cours-form/cours-form.component').then(m => m.CoursFormComponent)
      },  
      {
        path: 'profile',
        loadComponent: () =>
          import('./components/admin/profile/profile.component').then(m => m.ProfileComponent)
      },
      {
        path: 'messages',
        loadComponent: () =>
          import('./components/admin/message/message.component').then(m => m.MessageComponent)
      }
      
    ]
  },
  

  // Redirections
  { path: '', redirectTo: 'user/home', pathMatch: 'full' },
  { path: '**', redirectTo: 'user/home' }
];