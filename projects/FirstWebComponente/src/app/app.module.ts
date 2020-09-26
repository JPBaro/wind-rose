import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { AppComponent } from './app.component';
import { createCustomElement } from '@angular/elements';
import { WindRosetaComponent } from './wind-roseta/wind-roseta.component';

@NgModule({
  declarations: [
    AppComponent,
    WindRosetaComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [ WindRosetaComponent],
  bootstrap: [AppComponent]
})

export class AppModule implements DoBootstrap{

  constructor(private injector: Injector) {

    const webComponentWind = createCustomElement(WindRosetaComponent, {injector});
    customElements.define('wind-rosete', webComponentWind);

  }

  ngDoBootstrap() {}


}
