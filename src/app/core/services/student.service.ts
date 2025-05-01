import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentModel } from '../../shared/models/student.model';
import { CreateStudentModel } from '../../shared/models/create-student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:8081/api/students';

  constructor(private http: HttpClient) {}

  getAll(): Observable<StudentModel[]> {
    return this.http.get<StudentModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<StudentModel> {
    return this.http.get<StudentModel>(`${this.apiUrl}/${id}`);
  }

  create(student: CreateStudentModel): Observable<any> {
    return this.http.post<any>(this.apiUrl, student, { responseType: 'text' as 'json' });
  }

  // ✅ Correction ici : on update avec CreateStudentModel (même structure que pour create)
  update(id: number, student: CreateStudentModel): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, student, { responseType: 'text' as 'json' });
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  getByUsername(username: string): Observable<StudentModel> {
    return this.http.get<StudentModel>(`${this.apiUrl}/username/${username}`);
  }

}
