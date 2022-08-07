import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../enviroment';
import {Ticket} from '../model/ticket';

const API_URL = `${environment.apiUrl}`;

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  constructor(private http: HttpClient) { }

  getAll(page: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(API_URL + `/tickets?page=${page}`);
  }

  save(ticket): Observable<Ticket> {
    return this.http.post<Ticket>(API_URL + '/tickets', ticket);
  }

  updateTicket(id: number, ticket: Ticket): Observable<Ticket> {
    console.log(id, ticket);
    return this.http.put<Ticket>(`${API_URL}/tickets/${id}`, ticket);
  }

  findById(id: number): Observable<Ticket> {
    return this.http.get<Ticket>(API_URL + `/tickets/${id}`);
  }

  delete(id: number): Observable<Ticket> {
    return this.http.delete<Ticket>(`${API_URL}/tickets/${id}`);
  }

  search(startPoint: string, endPoint: string, startDate: string, endDate: string): Observable<Ticket[]> {
    return this.http.get<Ticket[]>
    (`${API_URL}/tickets/search/${startPoint}&${endPoint}&${startDate}&${endDate}`);
  }
}
