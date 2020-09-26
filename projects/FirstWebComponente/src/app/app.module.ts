import { BrowserModule } from '@angular/platform-browser';
import { NgModule, DoBootstrap, Injector } from '@angular/core';
import { AppComponent } from './app.component';
import { UIButtonComponent } from './uibutton/uibutton.component';
import { createCustomElement } from '@angular/elements';
import { WindRosetaComponent } from './wind-roseta/wind-roseta.component';

@NgModule({
  declarations: [
    AppComponent,
    UIButtonComponent,
    WindRosetaComponent
  ],
  imports: [
    BrowserModule
  ],
  entryComponents: [UIButtonComponent, WindRosetaComponent],
  bootstrap: [AppComponent]
})

export class AppModule implements DoBootstrap{

  constructor(private injector: Injector) {
    const webComponent = createCustomElement(UIButtonComponent, {injector});
    customElements.define('ui-button', webComponent);

    const webComponentWind = createCustomElement(WindRosetaComponent, {injector});
    customElements.define('wind-rosete', webComponentWind);

  }

  ngDoBootstrap() {}


}
