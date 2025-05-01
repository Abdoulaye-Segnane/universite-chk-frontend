import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CoursModel } from '../../shared/models/cours.model';
import { ApiResponseModel } from '../../shared/models/api-response.model'; 

@Injectable({
  providedIn: 'root'
})
export class CoursService {
  private apiUrl = 'http://localhost:8081/api/cours';

  constructor(private http: HttpClient) {}

  getAll(): Observable<CoursModel[]> {
    return this.http.get<CoursModel[]>(this.apiUrl);
  }

  getById(id: number): Observable<CoursModel> {
    return this.http.get<CoursModel>(`${this.apiUrl}/${id}`);
  }

  create(cours: CoursModel): Observable<ApiResponseModel> {
    return this.http.post<ApiResponseModel>(this.apiUrl, cours);
  }

  update(id: number, cours: CoursModel): Observable<ApiResponseModel> {
    return this.http.put<ApiResponseModel>(`${this.apiUrl}/${id}`, cours);
  }

  delete(id: number): Observable<ApiResponseModel> {
    return this.http.delete<ApiResponseModel>(`${this.apiUrl}/${id}`);
  }
}
