import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { DeviceDetectorModule } from 'ngx-device-detector';

import {
  MatAutocompleteModule, MatListModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatDatepickerModule, MatNativeDateModule,
  MatTableModule, MatCardModule, MatRadioModule, MatIconModule, MatPaginatorModule, MatToolbarModule,  MatDialogModule,
  MatMenuModule,   MatProgressSpinnerModule,
} from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HomeComponentComponent } from './home/home-component/home-component.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ConsentformComponent } from './home/consentform/consentform.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponentComponent,
    ConsentformComponent,
  ],
    imports: [
        DeviceDetectorModule,

        CommonModule,
        MatToolbarModule,
        MatDialogModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        BrowserModule,
        MatTableModule,
        FormsModule,
        HttpClientModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        AngularFontAwesomeModule,
        ChartsModule,

        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatDatepickerModule,
        MatTableModule,
        MatCardModule,
        MatRadioModule,
        MatIconModule,
        NgbModule,
        MatPaginatorModule,
        MatCheckboxModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: (http: HttpClient) => {
              return new TranslateHttpLoader(http);
            },
            deps: [ HttpClient ]
          }
        })
    ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
