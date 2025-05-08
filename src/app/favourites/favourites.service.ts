import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavouritesService {
  private apiUrl = 'http://localhost:5050/api/favourites'; // Ensure this matches your backend URL

  constructor(private http: HttpClient) {}

  getFavourites(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addFavourite(entry: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, entry);
  }

  deleteFavourite(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}