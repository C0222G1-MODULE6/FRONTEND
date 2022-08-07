import {EventEmitter, Injectable, Output} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {User} from '../model/user.model';

const headers = new HttpHeaders().set('Content-Type', 'application/json');

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/';
  token = '';
  @Output() getLoggedInName: EventEmitter<any> = new EventEmitter();
  @Output() getLoggedInRoles: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient, private router: Router) {
  }

  signup(user: User): Observable<any> {
    return this.http.post(this.baseUrl + 'signup', user, {headers, responseType: 'text'})
      .pipe(catchError(this.handleError));
  }

  login(user: string, pass: string) {
    return this.http.post<any>(this.baseUrl + 'authenticate',
      {username: user, password: pass}, {headers})
      .pipe(catchError(this.handleError),
        map(userData => {
          sessionStorage.setItem('username', user);
          const tokenStr = 'Bearer ' + userData.token;
          console.log('Token---  ' + tokenStr);
          console.log(userData);
          sessionStorage.setItem('token', tokenStr);
          sessionStorage.setItem('roles', JSON.stringify(userData.roles));
          const roles = sessionStorage.getItem('roles');
          this.getLoggedInName.emit(user);
          this.getLoggedInRoles.emit(roles);
          return userData;
        })
      );
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.baseUrl + 'users');
  }

  isLoggedIn(): boolean {
    return sessionStorage.getItem('username') !== null;
  }

  private handleError(httpError: HttpErrorResponse) {
    let message = 'abc';

    if (httpError.error instanceof ProgressEvent) {
      console.log('in progress event');
      message = 'Network error';
    } else {
      message = httpError.error.message;
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${httpError.status}, ` +
        `body was: ${httpError.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(message);
  }
}
