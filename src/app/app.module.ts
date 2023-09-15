import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { DefaultDataServiceConfig, EntityDataModule } from '@ngrx/data';

import { LayoutModule } from '@angular/cdk/layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { AuthModule } from './auth/auth.module';
import { RequestInterceptor } from './services/interceptor.service';
import { ErrorhandlerComponent } from './errorhandler/errorhandler.component';
import { ResourcesModule } from './resources/resources.module';
import { ManagementModule } from './management/management.module';
import { MonitoringModule } from './monitoring/monitoring.module';
import { DroneComponent } from './drone/drone.component';
import { NetworkModule} from './network/network.module';
import { SettingsModule} from './settings/settings.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ErrorhandlerComponent,
    DroneComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
    AuthModule,
    ResourcesModule,
    ManagementModule,
    MonitoringModule,
    NetworkModule,
    SettingsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    EntityDataModule.forRoot({}),
  ],
  providers:  [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
