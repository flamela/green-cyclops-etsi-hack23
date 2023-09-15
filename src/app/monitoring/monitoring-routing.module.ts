import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlarmsComponent } from './pages/alarms/alarms.component';
import { ProblemMmgmtComponent } from './pages/problem-mmgmt/problem-mmgmt.component';
import { AlarmsSummaryComponent } from './pages/alarms-summary/alarms-summary.component';
import { IssuesComponent } from './pages/issues/issues.component';
import { IssuesSummaryComponent } from './pages/issues-summary/issues-summary.component';
import { ProblemMmgmtEditComponent } from './pages/problem-mmgmt-edit/problem-mmgmt-edit.component';
import { ProblemMmgmtSummaryComponent } from './pages/problem-mmgmt-summary/problem-mmgmt-summary.component';
import { IssuesEditComponent } from './pages/issues-edit/issues-edit.component';
import { SandboxComponent } from './pages/sandbox/sandbox.component';

const routes: Routes = [{
  path: '',
  children: [
    { path: 'sandbox', component: SandboxComponent},
    {
      path: 'alarms', component: AlarmsComponent},
    { path: 'alarms-summary/:id', component: AlarmsSummaryComponent },
    
    { path: 'problem-mmgmt', component: ProblemMmgmtComponent },
    { path: 'problem-mmgmt-edit', component: ProblemMmgmtEditComponent },
    { path: 'problem-mmgmt-edit/:id', component: ProblemMmgmtEditComponent },
    { path: 'problem-mmgmt-summary/:id', component: ProblemMmgmtSummaryComponent },
    
    { path: 'issues', component: IssuesComponent },
    { path: 'issues-edit', component: IssuesEditComponent },
    { path: 'issues-edit/:id', component: IssuesEditComponent },
    
    { path: 'issues-summary/:id', component: IssuesSummaryComponent },
    
    { path: '**', redirectTo: 'alarms' }
  ]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
