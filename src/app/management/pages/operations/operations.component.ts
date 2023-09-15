import { Component, OnInit } from '@angular/core';
import { Operation } from '../../model/Operation';
import { Observable, delay, map, tap } from 'rxjs';
import { EntityAction } from '@ngrx/data';
import { Router } from '@angular/router';
import { OperationEntityService } from '../../services/operation-entity.service';

@Component({
  selector: 'app-operations',
  templateUrl: './operations.component.html',
  styleUrls: ['./operations.component.css']
})
export class OperationsComponent implements OnInit {

  operations$!: Observable<Operation[]>;
  loading$!: Observable<boolean>;
  loaded$!: Observable<boolean>;
  error$!: Observable<EntityAction<any>>;

  routerNavigate: string = ''
  OPERATIONS_EDIT: string = '/management/operations-edit';


  constructor(
    private router: Router,
    private operationEntityService: OperationEntityService) { 
  
    }

  ngOnInit(): void {
    this.loading$ = this.operationEntityService.loading$.pipe(delay(0));
    this.loaded$ = this.operationEntityService.loaded$.pipe(delay(0));
    this.error$ = this.operationEntityService.errors$;
    this.operations$ = this.operationEntityService.entities$;
  }

  create() {
    this.router.navigate([this.OPERATIONS_EDIT]);
  }

}
