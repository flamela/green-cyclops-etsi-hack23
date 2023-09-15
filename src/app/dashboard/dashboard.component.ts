import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';

import { KeycloakProfile } from 'keycloak-js';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public loggedIn: boolean = false;
  public username: any;
  public userProfile: KeycloakProfile = {};

  loading = true;
  loaded = false;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );


  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router) { }

  async ngOnInit(): Promise<void> {

    
    this.loggedIn = await this.authService.isLoggedIn();
    if (this.loggedIn) {
      this.userProfile = await this.authService.loadUserProfile();
      this.username = this.userProfile.username;
    }


    this.router.events.subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.loaded = false;
          this.loading = true;
          break;
        }
        case event instanceof NavigationEnd:{
          this.loaded  = true;
          this.loading = false;
          break;
        }
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.loading = false;
          this.loading = false;
          break;
        }
        default: {
          break;
        }
      }
    });
    
  }
  
  public login(): void {
    this.authService.login();
  }

  public logout(): void {
    this.authService.logout();
    //localStorage.clear();
  }



}