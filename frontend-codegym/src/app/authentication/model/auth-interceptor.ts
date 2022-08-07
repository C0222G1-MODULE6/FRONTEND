import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modifiedReq = req;
    if (sessionStorage.getItem('username') && sessionStorage.getItem('token')) {
      console.log('check header');
      modifiedReq = req.clone({
        setHeaders: {
          Authorization: sessionStorage.getItem('token'),
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        }
      });
    }
    console.log(modifiedReq);
    return next.handle(modifiedReq);
  }
}
