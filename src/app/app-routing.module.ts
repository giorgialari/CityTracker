import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CityDetailComponent } from './home/city-detail/city-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'city/:city', component: CityDetailComponent},
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
