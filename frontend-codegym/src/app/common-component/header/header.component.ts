import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../authentication/service/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userName: string;
  userRoles: string;

  constructor(private authService: AuthService) {
    authService.getLoggedInName.subscribe(name => this.changeName(name));
    authService.getLoggedInRoles.subscribe(roles => this.changeRole(roles));
  }

  ngOnInit(): void {
    this.userName = sessionStorage.getItem('username');
    this.userRoles = sessionStorage.getItem('roles');
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  private changeName(name: string): void {
    console.log('changed name ' + name);
    this.userName = name;
  }

  private changeRole(roles: any) {
    this.userRoles = roles;
    console.log(roles);
  }
}
