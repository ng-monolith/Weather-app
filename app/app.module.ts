import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SplashPageComponent } from './components/splash-page/splash-page.component';
import { WeatherWidgetComponent } from './components/weather-widget/weather-widget.component';

@NgModule({
  declarations: [AppComponent, SplashPageComponent, WeatherWidgetComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
