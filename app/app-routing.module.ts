import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplashPageComponent } from './components/splash-page/splash-page.component';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';

const routes: Routes = [
  { path: '', component: SplashPageComponent },
  { path: 'weather', component: WeatherWidgetComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
