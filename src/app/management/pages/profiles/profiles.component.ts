import { Component, OnInit } from '@angular/core';
import { Profile } from '../../model/Profile';
import { Observable, delay } from 'rxjs';
import { EntityAction } from '@ngrx/data';
import { Router } from '@angular/router';
import { ProfileEntityService } from '../../services/profile-entity.service';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit {

  profiles$!: Observable<Profile[]>;
  loading$!: Observable<boolean>;
  loaded$!: Observable<boolean>;
  error$!: Observable<EntityAction<any>>;

  routerNavigate: string = ''
  OPERATIONS_EDIT: string = '/management/profiles-edit';


  constructor(
    private router: Router,
    private profileEntityService: ProfileEntityService) { 
  
    }

  ngOnInit(): void {
    this.loading$ = this.profileEntityService.loading$.pipe(delay(0));
    this.loaded$ = this.profileEntityService.loaded$.pipe(delay(0));
    this.error$ = this.profileEntityService.errors$;
    this.profiles$ = this.profileEntityService.entities$;
  }

  create() {
    this.router.navigate([this.OPERATIONS_EDIT]);
  }

}