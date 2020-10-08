import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from './home/home-component/home-component.component';
import { ConsentformComponent } from './home/consentform/consentform.component';


const routes: Routes = [
  { path: '', component: ConsentformComponent },
  { path: 'questionnaire', component: HomeComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
